import { describe, expect, test } from 'vitest';
import {
	calendarFile,
	emailSettings,
	readEveningEnv,
	slugMatches,
	submitAnswers,
	submitRsvp,
	type Message
} from './evening';
import { fixturePlan as plan } from '$lib/evening/fixtures';

const env = {
	EVENING_SLUG: 'alex',
	EVENING_GUEST: 'Alex',
	EVENING_DATE: '2026-09-24',
	EVENING_PHONE: '555-010-0199'
};

describe('readEveningEnv', () => {
	test('returns the slug, guest, date and phone when all are set', () => {
		expect(readEveningEnv(env)).toEqual({
			slug: 'alex',
			guest: 'Alex',
			date: '2026-09-24',
			phone: '555-010-0199'
		});
	});

	test('reads the email her calendar invite goes to', () => {
		expect(readEveningEnv({ ...env, EVENING_NOTIFY_EMAIL: 'veer@example.com' })?.hostEmail).toBe(
			'veer@example.com'
		);
	});

	test('treats the phone number as optional', () => {
		expect(readEveningEnv({ ...env, EVENING_PHONE: undefined })?.phone).toBeUndefined();
	});

	test('returns null when the slug, guest or date is missing', () => {
		expect(readEveningEnv({ ...env, EVENING_GUEST: undefined })).toBeNull();
		expect(readEveningEnv({ ...env, EVENING_SLUG: '' })).toBeNull();
	});

	test('returns null for a slug that is not a single lowercase path segment', () => {
		expect(readEveningEnv({ ...env, EVENING_SLUG: 'alex/evening' })).toBeNull();
		expect(readEveningEnv({ ...env, EVENING_SLUG: 'Alex' })).toBeNull();
	});
});

describe('slugMatches', () => {
	const config = readEveningEnv(env)!;

	test('accepts the slug in any letter case', () => {
		expect(slugMatches(config, 'alex')).toBe(true);
		expect(slugMatches(config, 'Alex')).toBe(true);
	});

	test('rejects any other path', () => {
		expect(slugMatches(config, 'projects')).toBe(false);
		expect(slugMatches(null, 'alex')).toBe(false);
	});
});

describe('submitAnswers', () => {
	const config = readEveningEnv(env)!;
	const body = {
		answers: { area: 'hamilton', arrival: 'pickup', food: ['anything'], timing: 'no-rush' },
		updated: false
	};
	const recorder = () => {
		const sent: Message[] = [];
		return { sent, send: async (message: Message) => (sent.push(message), true) };
	};

	test('rejects another path without sending anything', async () => {
		const { sent, send } = recorder();
		const result = await submitAnswers({ plan, config, slug: 'someone-else', body, send });
		expect(result.status).toBe(404);
		expect(sent).toHaveLength(0);
	});

	test('rejects answers that fail the schema', async () => {
		const { send } = recorder();
		const bad = { answers: { ...body.answers, area: 'toronto' }, updated: false };
		const result = await submitAnswers({ plan, config, slug: env.EVENING_SLUG, body: bad, send });
		expect(result.status).toBe(400);
	});

	test('sends Veer the formatted answers', async () => {
		const { sent, send } = recorder();
		const result = await submitAnswers({ plan, config, slug: env.EVENING_SLUG, body, send });
		expect(result).toEqual({ status: 200, notified: true });
		expect(sent[0].subject).toBe('Alex turned the cards for Thursday');
		expect(sent[0].text).toContain('Getting there: Pick me up');
	});

	test('reports a failed send as a 502 so it shows up in the logs', async () => {
		const result = await submitAnswers({
			plan,
			config,
			slug: env.EVENING_SLUG,
			body,
			send: async () => false
		});
		expect(result).toEqual({ status: 502, notified: false });
	});
});

describe('calendarFile', () => {
	const config = readEveningEnv(env)!;
	const now = new Date('2026-09-17T12:00:00Z');
	const slug = env.EVENING_SLUG;

	test('rejects another path', () => {
		const file = calendarFile({
			plan,
			config,
			slug: 'someone-else',
			area: 'hamilton',
			arrival: 'pickup',
			now
		});
		expect(file.status).toBe(404);
	});

	test('rejects an unknown area or arrival', () => {
		const ask = (area: string, arrival: string) =>
			calendarFile({ plan, config, slug, area, arrival, now }).status;
		expect(ask('toronto', 'pickup')).toBe(400);
		expect(ask('hamilton', 'teleport')).toBe(400);
	});

	test('returns the evening for her area as a calendar file', () => {
		const file = calendarFile({
			plan,
			config,
			slug,
			area: 'oakville',
			arrival: 'meet-there',
			now
		});
		expect(file.status).toBe(200);
		expect(file.body).toContain('BEGIN:VCALENDAR');
		expect(file.body).toContain('Cineplex Winston Churchill');
	});
});

describe('emailSettings', () => {
	const env = { RESEND_API_KEY: 're_test', EVENING_NOTIFY_EMAIL: 'veer@example.com' };

	test("uses Resend's shared sender unless one is set", () => {
		expect(emailSettings(env)).toEqual({
			apiKey: 're_test',
			to: 'veer@example.com',
			from: 'Evening <onboarding@resend.dev>'
		});
	});

	test('uses EVENING_EMAIL_FROM when set', () => {
		expect(emailSettings({ ...env, EVENING_EMAIL_FROM: 'Veer <evening@rshvr.com>' })?.from).toBe(
			'Veer <evening@rshvr.com>'
		);
	});

	test('returns null without a key or a recipient', () => {
		expect(emailSettings({ ...env, RESEND_API_KEY: undefined })).toBeNull();
		expect(emailSettings({ ...env, EVENING_NOTIFY_EMAIL: '' })).toBeNull();
	});
});

describe('submitRsvp', () => {
	const config = readEveningEnv(env)!;
	const recorder = () => {
		const sent: Message[] = [];
		return { sent, send: async (message: Message) => (sent.push(message), true) };
	};

	test('rejects another path without sending anything', async () => {
		const { sent, send } = recorder();
		const result = await submitRsvp({
			config,
			slug: 'someone-else',
			body: { notice: 'yes' },
			send
		});
		expect(result.status).toBe(404);
		expect(sent).toHaveLength(0);
	});

	test('rejects an unknown notice', async () => {
		const { send } = recorder();
		const result = await submitRsvp({ config, slug: 'alex', body: { notice: 'maybe' }, send });
		expect(result.status).toBe(400);
	});

	test('emails Veer her answer', async () => {
		const { sent, send } = recorder();
		const result = await submitRsvp({ config, slug: 'alex', body: { notice: 'yes' }, send });
		expect(result).toEqual({ status: 200, notified: true });
		expect(sent[0].subject).toBe('Alex said yes');
	});

	test('reports a failed send as a 502', async () => {
		const result = await submitRsvp({
			config,
			slug: 'alex',
			body: { notice: 'no' },
			send: async () => false
		});
		expect(result).toEqual({ status: 502, notified: false });
	});
});
