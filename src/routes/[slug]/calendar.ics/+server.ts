import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { plan } from '$lib/evening/plan';
import { calendarFile, readEveningEnv } from '$lib/server/evening';
import type { RequestHandler } from './$types';

// iOS Safari hands the file to Calendar only when it arrives as text/calendar.
export const GET: RequestHandler = ({ params, url }) => {
	const file = calendarFile({
		plan,
		config: readEveningEnv(env),
		slug: params.slug,
		area: url.searchParams.get('area'),
		arrival: url.searchParams.get('arrival'),
		now: new Date()
	});
	if (file.status !== 200) error(file.status, 'Not found');

	return new Response(file.body, {
		headers: {
			'content-type': 'text/calendar; charset=utf-8',
			'content-disposition': 'inline; filename="our-evening.ics"',
			'cache-control': 'private, no-store',
			'x-robots-tag': 'noindex, nofollow'
		}
	});
};
