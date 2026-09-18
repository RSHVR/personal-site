import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { readEveningEnv, submitRsvp } from '$lib/server/evening';
import { emailVeer } from '$lib/server/evening-mail';
import type { RequestHandler } from './$types';

/** Emails Veer each time she answers "Are you in?". */
export const POST: RequestHandler = async ({ params, request }) => {
	let body: unknown = null;
	try {
		body = await request.json();
	} catch {
		// Falls through to the notice check, which rejects it.
	}

	const result = await submitRsvp({
		config: readEveningEnv(env),
		slug: params.slug,
		body,
		send: emailVeer
	});

	return json({ notified: result.notified }, { status: result.status });
};
