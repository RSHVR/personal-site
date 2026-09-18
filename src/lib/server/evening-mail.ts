import { Resend } from 'resend';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { emailSettings, type Message } from './evening';

/** Emails Veer through Resend. In local dev without a key, prints the email instead. */
export async function emailVeer(message: Message): Promise<boolean> {
	const settings = emailSettings(env);

	if (!settings) {
		if (dev) {
			console.log(`[evening] Resend is not configured; the email would say:\n${message.text}`);
			return true;
		}
		console.error('[evening] RESEND_API_KEY or EVENING_NOTIFY_EMAIL is missing; email not sent');
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
