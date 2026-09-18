import { describe, expect, test } from 'vitest';
import { answersSchemaFor, planSchema } from './schema';
import { plan } from './plan';
import { fixturePlan } from './fixtures';

const hamilton = fixturePlan.areas.hamilton;

function withHamilton(changes: Partial<typeof hamilton>) {
	return { ...fixturePlan, areas: { ...fixturePlan.areas, hamilton: { ...hamilton, ...changes } } };
}

describe('planSchema', () => {
	test('accepts the real plan', () => {
		const result = planSchema.safeParse(plan);
		expect(result.success, JSON.stringify(result.error?.issues)).toBe(true);
	});

	test('accepts a stop without a venue', () => {
		expect(fixturePlan.areas.hamilton.stops.dessert.venue).toBeUndefined();
		expect(planSchema.safeParse(fixturePlan).success).toBe(true);
	});

	test('rejects stops that overlap', () => {
		const broken = withHamilton({
			stops: { ...hamilton.stops, film: { ...hamilton.stops.film, start: '18:00' } }
		});
		expect(planSchema.safeParse(broken).success).toBe(false);
	});

	test('rejects a pickup that is not before dinner', () => {
		expect(planSchema.safeParse(withHamilton({ pickupAt: '17:45' })).success).toBe(false);
	});

	test('rejects a plan with no areas', () => {
		expect(planSchema.safeParse({ ...fixturePlan, areas: {} }).success).toBe(false);
	});
});

describe('answersSchemaFor', () => {
	const schema = answersSchemaFor(fixturePlan);
	const valid = { area: 'oakville', arrival: 'meet-there', food: ['no-pork'], timing: 'no-rush' };

	test('accepts a complete set of answers', () => {
		expect(schema.safeParse(valid).success).toBe(true);
	});

	test('rejects an area the plan does not have', () => {
		expect(schema.safeParse({ ...valid, area: 'toronto' }).success).toBe(false);
	});

	test('rejects an empty food answer', () => {
		expect(schema.safeParse({ ...valid, food: [] }).success).toBe(false);
	});

	test('rejects "I eat anything" combined with a restriction', () => {
		expect(schema.safeParse({ ...valid, food: ['anything', 'no-pork'] }).success).toBe(false);
	});

	test('rejects the old meet-in-the-middle arrival', () => {
		expect(schema.safeParse({ ...valid, arrival: 'meet-halfway' }).success).toBe(false);
	});
});
