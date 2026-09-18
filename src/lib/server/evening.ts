import { buildIcs } from '$lib/evening/calendar';
import { resolveItinerary } from '$lib/evening/itinerary';
import { answersSchemaFor, ARRIVALS, type Arrival, type Plan } from '$lib/evening/schema';
import { formatAnswers, formatRsvp } from '$lib/evening/message';
import { RSVP_NOTICES, type RsvpNotice } from '$lib/evening/rsvp';

/**
 * The private half of the evening page. Her name, the date, the URL and Veer's number
 * live in environment variables, not in this public repo.
 *
 *   EVENING_SLUG   the page's path, e.g. "alex" for /alex; lowercase, one segment
 *   EVENING_GUEST  her first name
 *   EVENING_DATE   YYYY-MM-DD
 *   EVENING_PHONE  optional; the "text me" button on the last page
 *
 * Her answers reach Veer by email through Resend:
 *
 *   RESEND_API_KEY        already set in production for the waitlist
 *   EVENING_NOTIFY_EMAIL  where the email goes; also the guest on her Google Calendar event
 *   EVENING_EMAIL_FROM    optional sender on a domain verified in Resend; without it,
 *                         Resend's shared sender only delivers to the Resend account's owner
 */

export interface EveningConfig {
	slug: string;
	guest: string;
	date: string;
	phone?: string;
	/** Veer's email, invited to the Google Calendar event she saves. */
	hostEmail?: string;
}

export function readEveningEnv(env: Record<string, string | undefined>): EveningConfig | null {
	const slug = env.EVENING_SLUG?.trim();
	const guest = env.EVENING_GUEST?.trim();
	const date = env.EVENING_DATE?.trim();
	const phone = env.EVENING_PHONE?.trim() || undefined;
	const hostEmail = env.EVENING_NOTIFY_EMAIL?.trim() || undefined;
	if (!slug || !guest || !date) return null;
	if (!/^[a-z0-9-]+$/.test(slug)) return null;
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
	return { slug, guest, date, phone, hostEmail };
}

/** The route is /[slug], so every unknown top-level path lands here first; only one matches. */
export function slugMatches(config: EveningConfig | null, slug: string): boolean {
	return config !== null && config.slug === slug.toLowerCase();
}

export interface Message {
	subject: string;
	text: string;
}

export interface EmailSettings {
	apiKey: string;
	to: string;
	from: string;
}

export function emailSettings(env: Record<string, string | undefined>): EmailSettings | null {
	const apiKey = env.RESEND_API_KEY?.trim();
	const to = env.EVENING_NOTIFY_EMAIL?.trim();
	if (!apiKey || !to) return null;
	return { apiKey, to, from: env.EVENING_EMAIL_FROM?.trim() || 'Evening <onboarding@resend.dev>' };
}

interface SubmitInput {
	plan: Plan;
	config: EveningConfig | null;
	slug: string;
	body: unknown;
	/** Sends one message to Veer; resolves false when it fails. */
	send: (message: Message) => Promise<boolean>;
}

export async function submitAnswers({ plan, config, slug, body, send }: SubmitInput) {
	if (!config || !slugMatches(config, slug)) return { status: 404, notified: false };

	const payload = body as { answers?: unknown; updated?: unknown } | null;
	const parsed = answersSchemaFor(plan).safeParse(payload?.answers);
	if (!parsed.success) return { status: 400, notified: false };

	const message = formatAnswers({
		plan,
		guest: config.guest,
		date: config.date,
		answers: parsed.data,
		updated: payload?.updated === true
	});
	const notified = await send(message);
	return { status: notified ? 200 : 502, notified };
}

interface RsvpInput {
	config: EveningConfig | null;
	slug: string;
	body: unknown;
	send: (message: Message) => Promise<boolean>;
}

export async function submitRsvp({ config, slug, body, send }: RsvpInput) {
	if (!config || !slugMatches(config, slug)) return { status: 404, notified: false };

	const notice = (body as { notice?: unknown } | null)?.notice;
	if (!RSVP_NOTICES.includes(notice as RsvpNotice)) return { status: 400, notified: false };

	const notified = await send(
		formatRsvp({ guest: config.guest, date: config.date, notice: notice as RsvpNotice })
	);
	return { status: notified ? 200 : 502, notified };
}

interface CalendarFileInput {
	plan: Plan;
	config: EveningConfig | null;
	slug: string;
	area: string | null;
	arrival: string | null;
	now: Date;
}

export function calendarFile({ plan, config, slug, area, arrival, now }: CalendarFileInput) {
	if (!config || !slugMatches(config, slug)) return { status: 404, body: '' };
	if (!area || !(area in plan.areas)) return { status: 400, body: '' };
	if (!ARRIVALS.includes(arrival as Arrival)) return { status: 400, body: '' };

	const itinerary = resolveItinerary(plan, { area, arrival: arrival as Arrival }, config.date);
	return {
		status: 200,
		body: buildIcs({ itinerary, date: config.date, now })
	};
}
