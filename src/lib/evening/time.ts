/** Offset of `timeZone` from UTC at `instant`, in milliseconds (Toronto in summer: -4h). */
function offsetMs(instant: Date, timeZone: string): number {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone,
		hourCycle: 'h23',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}).formatToParts(instant);
	const get = (type: Intl.DateTimeFormatPartTypes) =>
		Number(parts.find((p) => p.type === type)?.value);
	const asUtc = Date.UTC(
		get('year'),
		get('month') - 1,
		get('day'),
		get('hour'),
		get('minute'),
		get('second')
	);
	return asUtc - instant.getTime();
}

/** The UTC instant of a wall-clock `date` + `time` in `timeZone`. */
export function zonedToUtc(date: string, time: string, timeZone: string): Date {
	const [y, mo, d] = date.split('-').map(Number);
	const [h, mi] = time.split(':').map(Number);
	const wallAsUtc = Date.UTC(y, mo - 1, d, h, mi);
	const first = wallAsUtc - offsetMs(new Date(wallAsUtc), timeZone);
	// A second pass settles times that sit next to a daylight-saving change.
	return new Date(wallAsUtc - offsetMs(new Date(first), timeZone));
}

/** "18:30" → "6:30 pm", "19:00" → "7 pm". */
export function formatTime(time: string): string {
	const [h, m] = time.split(':').map(Number);
	const suffix = h >= 12 ? 'pm' : 'am';
	const hour = h % 12 === 0 ? 12 : h % 12;
	return m === 0 ? `${hour} ${suffix}` : `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** Calendar dates carry no time zone, so format them as UTC midnight. */
function calendarDate(date: string, options: Intl.DateTimeFormatOptions): string {
	const [y, m, d] = date.split('-').map(Number);
	return new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'UTC' }).format(
		new Date(Date.UTC(y, m - 1, d))
	);
}

/** "2026-09-24" → "Thursday, September 24". */
export function formatDateLong(date: string): string {
	return calendarDate(date, { weekday: 'long', month: 'long', day: 'numeric' });
}

/** "2026-09-24" → "Thursday". */
export function weekday(date: string): string {
	return calendarDate(date, { weekday: 'long' });
}
