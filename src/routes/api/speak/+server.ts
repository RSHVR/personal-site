import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

// Default multilingual voice (Rachel)
const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM';

export const POST: RequestHandler = async ({ request, platform }) => {
	const apiKey = env.ELEVENLABS_API_KEY || platform?.env?.ELEVENLABS_API_KEY;

	if (!apiKey) {
		return new Response('ElevenLabs API key not configured', { status: 500 });
	}

	try {
		const { text } = await request.json();

		if (!text) {
			return new Response('No text provided', { status: 400 });
		}

		const response = await fetch(
			`https://api.elevenlabs.io/v1/text-to-speech/${DEFAULT_VOICE_ID}`,
			{
				method: 'POST',
				headers: {
					'xi-api-key': apiKey,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					text,
					model_id: 'eleven_multilingual_v2',
					voice_settings: {
						stability: 0.75,
						similarity_boost: 0.75,
						speed: 0.7
					}
				})
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('ElevenLabs API error:', response.status, errorText);
			return new Response(`TTS failed: ${response.status}`, { status: 500 });
		}

		// Stream the audio back
		return new Response(response.body, {
			headers: {
				'Content-Type': 'audio/mpeg'
			}
		});
	} catch (error) {
		console.error('TTS error:', error);
		return new Response('Internal server error', { status: 500 });
	}
};
