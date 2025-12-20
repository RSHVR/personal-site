import type { RequestHandler } from './$types';
import { createTranslationHandler } from 'tsuji/server';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request, platform }) => {
	const apiKey = env.COHERE_API_KEY || platform?.env?.COHERE_API_KEY;

	if (!apiKey) {
		return new Response('API key not configured', { status: 500 });
	}

	const handler = createTranslationHandler({
		apiKey
	});

	return handler(request);
};
