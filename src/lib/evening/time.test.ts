import { describe, expect, test } from 'vitest';
import { formatDateLong, formatTime, weekday, zonedToUtc } from './time';

describe('zonedToUtc', () => {
	test('converts Toronto summer time (EDT, UTC-4)', () => {
		expect(zonedToUtc('2026-09-24', '18:00', 'America/Toronto').toISOString()).toBe(
			'2026-09-24T22:00:00.000Z'
		);
	});

	test('converts Toronto winter time (EST, UTC-5)', () => {
		expect(zonedToUtc('2026-12-05', '18:00', 'America/Toronto').toISOString()).toBe(
			'2026-12-05T23:00:00.000Z'
		);
	});
});

describe('formatTime', () => {
	test('uses a 12-hour clock with lowercase am/pm', () => {
		expect(formatTime('18:30')).toBe('6:30 pm');
	});

	test('drops :00 on the hour', () => {
		expect(formatTime('19:00')).toBe('7 pm');
	});

	test('treats noon as pm', () => {
		expect(formatTime('12:15')).toBe('12:15 pm');
	});
});

describe('dates', () => {
	test('formatDateLong names the weekday and month', () => {
		expect(formatDateLong('2026-09-24')).toBe('Thursday, September 24');
	});

	test('weekday does not shift across time zones', () => {
		expect(weekday('2026-09-24')).toBe('Thursday');
	});
});
