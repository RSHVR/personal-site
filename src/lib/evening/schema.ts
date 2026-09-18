import { z } from 'zod';

/** "HH:MM", 24-hour, local to the plan's time zone. */
const clock = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'use HH:MM, 24-hour');

export function minutesOfDay(time: string): number {
	const [h, m] = time.split(':').map(Number);
	return h * 60 + m;
}

export const STOP_IDS = ['dinner', 'film', 'dessert'] as const;
export type StopId = (typeof STOP_IDS)[number];

/** The least forward option comes first, because the first option reads as the default. */
export const ARRIVALS = ['meet-there', 'pickup'] as const;
export type Arrival = (typeof ARRIVALS)[number];

export const FOODS = ['anything', 'no-pork', 'no-beef', 'vegetarian', 'mild'] as const;
export type Food = (typeof FOODS)[number];

export const TIMINGS = ['no-rush', 'early-start'] as const;
export type Timing = (typeof TIMINGS)[number];

/** Minutes the pickup item takes on the calendar. */
export const PICKUP_MINUTES = 15;

const venueSchema = z.object({
	name: z.string().min(1),
	address: z.string().min(1)
});

const stopSchema = z.object({
	/** What she reads on the itinerary: "Ramen", a film title, "Ice cream". */
	title: z.string().min(1),
	/** Left out when the place is picked together on the night. */
	venue: venueSchema.optional(),
	start: clock,
	minutes: z.number().int().positive()
});

/** One version of the evening, in one city. She picks the area on the first question card. */
const areaSchema = z.object({
	label: z.string().min(1),
	/** The line under the area's name on the question card. */
	blurb: z.string().min(1),
	/** When Veer arrives at her door if she picks "Pick me up". */
	pickupAt: clock,
	stops: z.object({ dinner: stopSchema, film: stopSchema, dessert: stopSchema })
});

/** A face-down card. Shown before she answers, so it must not depend on the area. */
const revealSchema = z.object({
	kicker: z.string().min(1),
	title: z.string().min(1),
	line: z.string().min(1)
});

export const planSchema = z
	.object({
		host: z.string().min(1),
		timeZone: z.string().min(1),
		reveals: z.object({ dinner: revealSchema, film: revealSchema, dessert: revealSchema }),
		areas: z
			.record(z.string(), areaSchema)
			.refine((areas) => Object.keys(areas).length > 0, 'the plan needs at least one area')
	})
	.superRefine((plan, ctx) => {
		for (const [areaId, area] of Object.entries(plan.areas)) {
			let previousEnd = 0;
			for (const id of STOP_IDS) {
				const stop = area.stops[id];
				const start = minutesOfDay(stop.start);
				if (start < previousEnd) {
					ctx.addIssue({
						code: 'custom',
						path: ['areas', areaId, 'stops', id, 'start'],
						message: `${id} starts before the previous stop ends`
					});
				}
				previousEnd = start + stop.minutes;
			}

			if (minutesOfDay(area.pickupAt) + PICKUP_MINUTES > minutesOfDay(area.stops.dinner.start)) {
				ctx.addIssue({
					code: 'custom',
					path: ['areas', areaId, 'pickupAt'],
					message: `pickup needs ${PICKUP_MINUTES} minutes before dinner starts`
				});
			}
		}
	});

export type Plan = z.infer<typeof planSchema>;
export type Area = Plan['areas'][string];
export type Stop = Area['stops'][StopId];
export type Venue = NonNullable<Stop['venue']>;
export type Reveal = Plan['reveals'][StopId];

const baseAnswersSchema = z.object({
	area: z.string().min(1),
	arrival: z.enum(ARRIVALS),
	food: z
		.array(z.enum(FOODS))
		.min(1)
		.refine((food) => new Set(food).size === food.length, 'duplicate food answer')
		.refine(
			(food) => !food.includes('anything') || food.length === 1,
			'"anything" cannot be combined with a restriction'
		),
	timing: z.enum(TIMINGS)
});

export type Answers = z.infer<typeof baseAnswersSchema>;

/** Her answers, checked against the areas this plan actually has. */
export function answersSchemaFor(plan: Plan) {
	return baseAnswersSchema.refine((answers) => answers.area in plan.areas, {
		path: ['area'],
		message: 'no such area in the plan'
	});
}
