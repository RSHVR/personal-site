import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
	const apiKey = env.GROQ_API_KEY || platform?.env?.GROQ_API_KEY;

	if (!apiKey) {
		return new Response('Groq API key not configured', { status: 500 });
	}

	try {
		const formData = await request.formData();
		const audioFile = formData.get('audio') as File;

		if (!audioFile) {
			return new Response('No audio file provided', { status: 400 });
		}

		// Forward to Groq Whisper API
		const groqFormData = new FormData();
		groqFormData.append('file', audioFile, 'audio.webm');
		groqFormData.append('model', 'whisper-large-v3');

		const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`
			},
			body: groqFormData
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Groq API error:', response.status, errorText);
			return new Response(`Transcription failed: ${response.status}`, { status: 500 });
		}

		const result = await response.json();

		return new Response(JSON.stringify({ text: result.text }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Transcription error:', error);
		return new Response('Internal server error', { status: 500 });
	}
};
