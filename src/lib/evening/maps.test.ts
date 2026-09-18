import { describe, expect, test } from 'vitest';
import { mapsUrl } from './maps';

const venue = { name: 'Menya Kyu', address: '154 James St S, Hamilton, ON' };

describe('mapsUrl', () => {
	test('opens Apple Maps on Apple devices', () => {
		const url = new URL(mapsUrl(venue, true));
		expect(url.origin).toBe('https://maps.apple.com');
		expect(url.searchParams.get('q')).toBe('Menya Kyu');
		expect(url.searchParams.get('address')).toBe('154 James St S, Hamilton, ON');
	});

	test('opens Google Maps everywhere else', () => {
		const url = new URL(mapsUrl(venue, false));
		expect(url.origin).toBe('https://www.google.com');
		expect(url.searchParams.get('query')).toBe('Menya Kyu, 154 James St S, Hamilton, ON');
	});
});
