import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { plan } from '$lib/evening/plan';
import { readEveningEnv, slugMatches } from '$lib/server/evening';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params, setHeaders }) => {
	const config = readEveningEnv(env);
	if (!config || !slugMatches(config, params.slug)) error(404, 'Not found');

	setHeaders({
		'x-robots-tag': 'noindex, nofollow',
		'cache-control': 'private, no-store',
		'referrer-policy': 'no-referrer'
	});

	return {
		slug: config.slug,
		guest: config.guest,
		date: config.date,
		phone: config.phone,
		hostEmail: config.hostEmail,
		plan
	};
};
