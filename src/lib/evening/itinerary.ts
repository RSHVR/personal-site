import {
	PICKUP_MINUTES,
	STOP_IDS,
	type Answers,
	type Area,
	type Plan,
	type StopId,
	type Venue
} from './schema';
import { zonedToUtc } from './time';

export interface ItineraryItem {
	id: StopId | 'pickup';
	title: string;
	/** Local "HH:MM", for display. */
	start: string;
	venue?: Venue;
	startUtc: Date;
	endUtc: Date;
}

export interface Itinerary {
	area: Area;
	items: ItineraryItem[];
}

/** Her area answer picks the stops; a pickup adds Veer at her door before dinner. */
export function resolveItinerary(
	plan: Plan,
	{ area: areaId, arrival }: Pick<Answers, 'area' | 'arrival'>,
	date: string
): Itinerary {
	const area = plan.areas[areaId];
	const at = (start: string, minutes: number) => {
		const startUtc = zonedToUtc(date, start, plan.timeZone);
		return { start, startUtc, endUtc: new Date(startUtc.getTime() + minutes * 60_000) };
	};

	const items: ItineraryItem[] = STOP_IDS.map((id) => {
		const stop = area.stops[id];
		return { id, title: stop.title, venue: stop.venue, ...at(stop.start, stop.minutes) };
	});

	if (arrival === 'pickup') {
		items.unshift({
			id: 'pickup',
			title: `${plan.host} picks you up`,
			...at(area.pickupAt, PICKUP_MINUTES)
		});
	}

	return { area, items };
}
