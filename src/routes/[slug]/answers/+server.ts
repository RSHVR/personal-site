import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { plan } from '$lib/evening/plan';
import { emailSettings, readEveningEnv, submitAnswers, type Message } from '$lib/server/evening';
import type { RequestHandler } from './$types';

async function emailVeer(message: Message): Promise<boolean> {
	const settings = emailSettings(env);

	if (!settings) {
		if (dev) {
			console.log(`[evening] Resend is not configured; the email would say:\n${message.text}`);
			return true;
		}
		console.error(
			'[evening] RESEND_API_KEY or EVENING_NOTIFY_EMAIL is missing; answers not delivered'
		);
		return false;
	}

	try {
		const { error } = await new Resend(settings.apiKey).emails.send({
			from: settings.from,
			to: settings.to,
			subject: message.subject,
			text: message.text
		});
		if (error) console.error('[evening] Resend rejected the email:', error);
		return !error;
	} catch (error) {
		console.error('[evening] Resend request failed:', error);
		return false;
	}
}

export const POST: RequestHandler = async ({ params, request }) => {
	let body: unknown = null;
	try {
		body = await request.json();
	} catch {
		// Falls through to the schema check, which rejects it.
	}

	const result = await submitAnswers({
		plan,
		config: readEveningEnv(env),
		slug: params.slug,
		body,
		send: emailVeer
	});

	return json({ notified: result.notified }, { status: result.status });
};
