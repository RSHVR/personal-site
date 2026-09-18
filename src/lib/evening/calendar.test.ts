import { describe, expect, test } from 'vitest';
import { buildIcs, escapeIcsText, googleCalendarUrl } from './calendar';
import { resolveItinerary } from './itinerary';
import { fixturePlan } from './fixtures';
import type { Arrival } from './schema';

const DATE = '2026-09-24';

/** Joins folded ICS lines back together. */
const unfold = (ics: string) => ics.replace(/\r\n /g, '');
const NOW = new Date('2026-09-17T12:00:00Z');

function icsFor(area: string, arrival: Arrival) {
	const itinerary = resolveItinerary(fixturePlan, { area, arrival }, DATE);
	return buildIcs({ itinerary, date: DATE, now: NOW });
}

describe('escapeIcsText', () => {
	test('escapes commas, semicolons, backslashes and newlines', () => {
		expect(escapeIcsText('a,b;c\\d\ne')).toBe('a\\,b\\;c\\\\d\\ne');
	});
});

describe('buildIcs', () => {
	test('wraps events in a calendar with CRLF line endings', () => {
		const ics = icsFor('hamilton', 'meet-there');
		expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
		expect(ics.trimEnd().endsWith('END:VCALENDAR')).toBe(true);
		expect(ics.replace(/\r\n/g, '')).not.toMatch(/\n/);
	});

	test('writes one event for the whole evening', () => {
		expect(icsFor('hamilton', 'meet-there').match(/BEGIN:VEVENT/g)).toHaveLength(1);
		expect(icsFor('hamilton', 'pickup').match(/BEGIN:VEVENT/g)).toHaveLength(1);
	});

	test('runs from the first stop to the end of the last, in UTC', () => {
		const ics = icsFor('hamilton', 'meet-there');
		expect(ics).toContain('DTSTART:20260924T213000Z');
		expect(ics).toContain('DTEND:20260925T024000Z');
	});

	test('starts at the pickup when there is one', () => {
		expect(icsFor('hamilton', 'pickup')).toContain('DTSTART:20260924T210500Z');
	});

	test('is called "Date night!" and is located at the first venue', () => {
		const ics = icsFor('hamilton', 'meet-there');
		expect(ics).toContain('SUMMARY:Date night!');
		expect(ics).toContain('LOCATION:Kinton Ramen\\, 50 King William St\\, Hamilton\\, ON');
	});

	test('lists every stop in the notes', () => {
		const notes = unfold(icsFor('hamilton', 'meet-there')).match(/DESCRIPTION:(.*)/)?.[1] ?? '';
		expect(notes).toContain('5:30 pm: Ramen');
		expect(notes).toContain('Landmark Cinemas');
		expect(notes).toContain('10:05 pm: Ice cream');
	});

	test('keeps event ids stable when the area changes, so a re-add updates', () => {
		const uid = (ics: string) => ics.match(/UID:(.*)\r\n/)?.[1];
		expect(uid(icsFor('hamilton', 'meet-there'))).toBe(uid(icsFor('oakville', 'meet-there')));
	});

	test('folds every line to 75 octets or fewer', () => {
		const encoder = new TextEncoder();
		for (const line of icsFor('oakville', 'pickup').split('\r\n')) {
			expect(encoder.encode(line).length).toBeLessThanOrEqual(75);
		}
	});

	test('reminds her 24 hours, 4 hours and 30 minutes before', () => {
		const ics = icsFor('hamilton', 'pickup');
		expect(ics.match(/BEGIN:VALARM/g)).toHaveLength(3);
		expect(ics).toContain('TRIGGER:-PT24H');
		expect(ics).toContain('TRIGGER:-PT4H');
		expect(ics).toContain('TRIGGER:-PT30M');
	});
});

describe('googleCalendarUrl', () => {
	const itinerary = () =>
		resolveItinerary(fixturePlan, { area: 'hamilton', arrival: 'meet-there' }, DATE);

	test('invites the host when an email is given', () => {
		const url = new URL(
			googleCalendarUrl({
				itinerary: itinerary(),
				date: DATE,
				invite: 'veer@example.com'
			})
		);
		expect(url.searchParams.get('add')).toBe('veer@example.com');
	});

	test('invites no one without an email', () => {
		const url = new URL(googleCalendarUrl({ itinerary: itinerary(), date: DATE }));
		expect(url.searchParams.has('add')).toBe(false);
	});

	test('creates one event spanning the whole evening', () => {
		const itinerary = resolveItinerary(
			fixturePlan,
			{ area: 'hamilton', arrival: 'meet-there' },
			DATE
		);
		const url = new URL(googleCalendarUrl({ itinerary, date: DATE }));
		expect(url.origin).toBe('https://calendar.google.com');
		expect(url.searchParams.get('action')).toBe('TEMPLATE');
		expect(url.searchParams.get('text')).toBe('Date night!');
		expect(url.searchParams.get('dates')).toBe('20260924T213000Z/20260925T024000Z');
		expect(url.searchParams.get('location')).toBe('Kinton Ramen, 50 King William St, Hamilton, ON');
		expect(url.searchParams.get('details')).toContain('Landmark Cinemas');
	});
});
