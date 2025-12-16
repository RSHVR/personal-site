import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export interface ChatMessage {
	sender: 'user' | 'bot';
	text: string;
}

export async function saveChat(sessionId: string, messages: ChatMessage[]): Promise<void> {
	const { error } = await supabase
		.from('chats')
		.upsert(
			{
				session_id: sessionId,
				messages: messages,
				updated_at: new Date().toISOString()
			},
			{ onConflict: 'session_id' }
		);

	if (error) {
		console.error('Error saving chat:', error);
		throw error;
	}
}

export async function loadChat(sessionId: string): Promise<ChatMessage[] | null> {
	const { data, error } = await supabase
		.from('chats')
		.select('messages')
		.eq('session_id', sessionId)
		.single();

	if (error) {
		if (error.code === 'PGRST116') {
			// No rows found - this is fine for new sessions
			return null;
		}
		console.error('Error loading chat:', error);
		return null;
	}
	return data?.messages || null;
}
