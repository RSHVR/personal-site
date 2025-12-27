import type { RequestHandler } from './$types';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { waitlistSchema } from '$lib/schemas/waitlist';

const corsHeaders = {
	'Access-Control-Allow-Origin': 'https://ruh.rshvr.com',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
};

export const OPTIONS: RequestHandler = async () => {
	return new Response(null, { headers: corsHeaders });
};

export const POST: RequestHandler = async ({ request, platform }) => {
	const apiKey = env.RESEND_API_KEY || platform?.env?.RESEND_API_KEY;
	const segmentId = env.RESEND_SEGMENT_ID || platform?.env?.RESEND_SEGMENT_ID;

	if (!apiKey || !segmentId) {
		console.error('Resend API key or Segment ID not configured');
		return json({ error: 'Service not configured' }, { status: 500, headers: corsHeaders });
	}

	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid request body' }, { status: 400, headers: corsHeaders });
	}

	// Validate with Zod
	const result = waitlistSchema.safeParse(body);

	if (!result.success) {
		const firstError = result.error.issues[0];
		return json({ error: firstError?.message || 'invalid email' }, { status: 400, headers: corsHeaders });
	}

	const { email } = result.data;

	const resend = new Resend(apiKey);

	try {
		const { data, error } = await resend.contacts.create({
			email,
			unsubscribed: false
		});

		if (error) {
			console.error('Resend error:', error);
			return json({ error: error.message || 'Failed to join waitlist' }, { status: 400, headers: corsHeaders });
		}

		// Add contact to ruh waitlist segment
		if (data?.id) {
			await resend.contacts.segments.add({
				contactId: data.id,
				segmentId
			});
		}

		return json({ success: true, id: data?.id }, { headers: corsHeaders });
	} catch (err) {
		console.error('Waitlist signup error:', err);
		return json({ error: 'Something went wrong. Please try again.' }, { status: 500, headers: corsHeaders });
	}
};
