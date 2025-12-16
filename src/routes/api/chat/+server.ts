import { env } from '$env/dynamic/private';
import { createChatHandler } from 'embeddable-chatbot/server';
import { saveChat } from '$lib/server/supabase';
import type { RequestHandler } from './$types';

const SYSTEM_PROMPT = `You are Veer's AI assistant on his personal website. Be friendly, helpful, and conversational.

About Veer:
- Full-stack developer and AI/ML enthusiast
- Works on interesting projects involving AI, web development, and creative technology
- Open to collaborations, freelance work, and interesting opportunities

Guidelines:
- Keep responses brief (1-3 sentences when possible)
- Be conversational and approachable
- If asked about specific projects or work, mention you can help connect them with Veer
- For booking meetings or detailed inquiries, suggest they reach out directly`;

export const POST: RequestHandler = async ({ request }) => {
	const handler = createChatHandler({
		apiKey: env.ANTHROPIC_API_KEY!,
		systemPrompt: SYSTEM_PROMPT,
		onSave: saveChat
	});
	return handler(request);
};
