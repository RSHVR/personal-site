import { json } from '@sveltejs/kit';
import { loadChat } from '$lib/server/supabase';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { sessionId } = await request.json();

		if (!sessionId || typeof sessionId !== 'string') {
			return json({ error: 'Session ID is required' }, { status: 400 });
		}

		const messages = await loadChat(sessionId);
		return json({ messages });
	} catch (error) {
		console.error('Error loading chat:', error);
		return json({ error: 'Failed to load chat' }, { status: 500 });
	}
};
