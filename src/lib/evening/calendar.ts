import type { Itinerary, ItineraryItem } from './itinerary';
import { formatTime } from './time';

interface CalendarInput {
	itinerary: Itinerary;
	/** "YYYY-MM-DD"; keeps event ids stable for one evening. */
	date: string;
}

export function escapeIcsText(text: string): string {
	return text
		.replace(/\\/g, '\\\\')
		.replace(/;/g, '\\;')
		.replace(/,/g, '\\,')
		.replace(/\r?\n/g, '\\n');
}

/** RFC 5545: lines longer than 75 octets continue on the next line after one space. */
function fold(line: string): string {
	const encoder = new TextEncoder();
	const out: string[] = [];
	let current = '';
	let octets = 0;
	for (const char of line) {
		const size = encoder.encode(char).length;
		const limit = out.length === 0 ? 75 : 74;
		if (octets + size > limit) {
			out.push(current);
			current = '';
			octets = 0;
		}
		current += char;
		octets += size;
	}
	out.push(current);
	return out.join('\r\n ');
}

/** 2026-09-24T21:30:00.000Z → 20260924T213000Z */
function icsStamp(instant: Date): string {
	return instant
		.toISOString()
		.replace(/[-:]/g, '')
		.replace(/\.\d{3}/, '');
}

/** What the event is called in her calendar. */
export const EVENT_TITLE = 'Date night!';

/** Reminders on the event: 24 hours, 4 hours and 30 minutes before it starts. */
const REMINDERS = ['-PT24H', '-PT4H', '-PT30M'];

function place(item: ItineraryItem): string | undefined {
	return item.venue && `${item.venue.name}, ${item.venue.address}`;
}

/** Every stop with its time and, where there is one, its address. */
function eveningNotes(items: ItineraryItem[]): string {
	return items
		.map((i) => [`${formatTime(i.start)}: ${i.title}`, place(i)].filter(Boolean).join('\n'))
		.join('\n\n');
}

/** The evening as one event, from the first stop to the end of the last. */
function span(itinerary: Itinerary) {
	const { items } = itinerary;
	const firstPlace = items.find((i) => i.venue);
	return {
		start: items[0].startUtc,
		end: items[items.length - 1].endUtc,
		location: (firstPlace && place(firstPlace)) ?? '',
		notes: eveningNotes(items)
	};
}

export function buildIcs({ itinerary, date, now }: CalendarInput & { now: Date }): string {
	const evening = span(itinerary);
	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//rshvr.com//evening//EN',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		`UID:evening-${date}@rshvr.com`,
		`DTSTAMP:${icsStamp(now)}`,
		`DTSTART:${icsStamp(evening.start)}`,
		`DTEND:${icsStamp(evening.end)}`,
		`SUMMARY:${escapeIcsText(EVENT_TITLE)}`
	];
	if (evening.location) lines.push(`LOCATION:${escapeIcsText(evening.location)}`);
	lines.push(`DESCRIPTION:${escapeIcsText(evening.notes)}`);
	for (const trigger of REMINDERS) {
		lines.push(
			'BEGIN:VALARM',
			`TRIGGER:${trigger}`,
			'ACTION:DISPLAY',
			`DESCRIPTION:${escapeIcsText(EVENT_TITLE)}`,
			'END:VALARM'
		);
	}
	lines.push('END:VEVENT', 'END:VCALENDAR');
	return lines.map(fold).join('\r\n') + '\r\n';
}

/**
 * Google's link holds one event, like the calendar file. It cannot carry reminders, so
 * Google uses her default notifications.
 * `invite` pre-fills a guest; Google asks her whether to send the invitation when she saves.
 */
export function googleCalendarUrl({
	itinerary,
	invite
}: CalendarInput & { invite?: string }): string {
	const evening = span(itinerary);
	const params = new URLSearchParams({
		action: 'TEMPLATE',
		text: EVENT_TITLE,
		dates: `${icsStamp(evening.start)}/${icsStamp(evening.end)}`,
		details: evening.notes,
		location: evening.location
	});
	if (invite) params.set('add', invite);
	return `https://calendar.google.com/calendar/render?${params}`;
}
