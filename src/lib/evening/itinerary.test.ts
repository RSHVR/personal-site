import { describe, expect, test } from 'vitest';
import { resolveItinerary } from './itinerary';
import { fixturePlan } from './fixtures';

const DATE = '2026-09-24';

describe('resolveItinerary', () => {
	test('meeting in Hamilton uses the Hamilton stops with no pickup', () => {
		const { area, items } = resolveItinerary(
			fixturePlan,
			{ area: 'hamilton', arrival: 'meet-there' },
			DATE
		);
		expect(area.label).toBe('Hamilton');
		expect(items.map((i) => i.id)).toEqual(['dinner', 'film', 'dessert']);
		expect(items[0].venue?.address).toContain('King William');
	});

	test('choosing Oakville swaps in the Oakville stops', () => {
		const { area, items } = resolveItinerary(
			fixturePlan,
			{ area: 'oakville', arrival: 'meet-there' },
			DATE
		);
		expect(area.label).toBe('Oakville');
		expect(items[0].venue?.address).toContain('Hampshire Gate');
	});

	test("a pickup adds a 15 minute pickup item at the area's pickup time", () => {
		const { items } = resolveItinerary(fixturePlan, { area: 'oakville', arrival: 'pickup' }, DATE);
		expect(items[0]).toMatchObject({ id: 'pickup', start: '16:40' });
		expect(items[0].venue).toBeUndefined();
		expect(items[0].endUtc.getTime() - items[0].startUtc.getTime()).toBe(15 * 60_000);
		expect(items[1].id).toBe('dinner');
	});

	test('each stop ends its length after it starts, in UTC', () => {
		const { items } = resolveItinerary(
			fixturePlan,
			{ area: 'hamilton', arrival: 'meet-there' },
			DATE
		);
		expect(items[0].startUtc.toISOString()).toBe('2026-09-24T21:30:00.000Z');
		expect(items[0].endUtc.toISOString()).toBe('2026-09-24T22:45:00.000Z');
	});
});
