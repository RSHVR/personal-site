/**
 * SMS Notify Tool for Twilio Integration
 *
 * Allows the chatbot agent to send SMS messages to Veer
 * and receive responses for two-way communication.
 *
 * Required environment variables:
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_PHONE_NUMBER
 * - OWNER_PHONE_NUMBER
 */

import type { Tool } from '@anthropic-ai/sdk/resources/messages';

/**
 * Tool definition for Claude to notify Veer via SMS
 */
export const smsNotifyOwnerTool: Tool = {
	name: 'notify_owner_sms',
	description: `Send an SMS message to Veer for real-time input during the conversation. Use this tool when:
- A visitor wants to discuss a project, freelance work, or consulting opportunity
- Someone has a specific question only Veer can answer (rates, availability, custom work)
- A lead seems qualified and interested in working together
- The visitor explicitly asks to speak with Veer or a human

The conversation will pause until Veer replies via SMS. Include all relevant context in your message so Veer can respond effectively. Keep messages concise but informative.`,
	input_schema: {
		type: 'object' as const,
		properties: {
			message: {
				type: 'string',
				description:
					'The message to send to Veer. Include context about the visitor, their question or need, and what kind of response would be helpful.'
			},
			context_summary: {
				type: 'string',
				description:
					'Brief summary of the conversation context for reference (e.g., "Visitor asking about freelance rates for React project")'
			}
		},
		required: ['message']
	}
};

export interface SMSToolInput {
	message: string;
	context_summary?: string;
}

export interface TwilioConfig {
	accountSid: string;
	authToken: string;
	fromNumber: string;
	toNumber: string;
}

/**
 * Send an SMS via Twilio REST API (no SDK dependency)
 */
export async function sendSMS(
	config: TwilioConfig,
	message: string
): Promise<{ success: boolean; sid?: string; error?: string }> {
	const { accountSid, authToken, fromNumber, toNumber } = config;

	const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

	const params = new URLSearchParams({
		To: toNumber,
		From: fromNumber,
		Body: message
	});

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + btoa(`${accountSid}:${authToken}`)
			},
			body: params.toString()
		});

		const data = await response.json();

		if (!response.ok) {
			console.error('Twilio API error:', data);
			return {
				success: false,
				error: data.message || 'Failed to send SMS'
			};
		}

		return {
			success: true,
			sid: data.sid
		};
	} catch (error) {
		console.error('Error sending SMS:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error'
		};
	}
}

/**
 * Execute the SMS notify tool
 */
export async function executeSMSTool(input: SMSToolInput, config: TwilioConfig): Promise<string> {
	const { message, context_summary } = input;

	// Format message with context if provided
	let fullMessage = message;
	if (context_summary) {
		fullMessage = `[${context_summary}]\n\n${message}`;
	}

	// Truncate if too long (SMS limit is 1600 chars for concatenated messages)
	if (fullMessage.length > 1500) {
		fullMessage = fullMessage.substring(0, 1497) + '...';
	}

	const result = await sendSMS(config, fullMessage);

	if (result.success) {
		return `SMS sent successfully. Waiting for Veer's reply...`;
	} else {
		return `Failed to send SMS: ${result.error}`;
	}
}

/**
 * Validate Twilio webhook signature
 * https://www.twilio.com/docs/usage/security#validating-requests
 */
export async function validateTwilioSignature(
	authToken: string,
	signature: string,
	url: string,
	params: Record<string, string>
): Promise<boolean> {
	// Sort params alphabetically and concatenate
	const sortedParams = Object.keys(params)
		.sort()
		.map((key) => key + params[key])
		.join('');

	const data = url + sortedParams;

	// Create HMAC-SHA1 signature
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(authToken),
		{ name: 'HMAC', hash: 'SHA-1' },
		false,
		['sign']
	);

	const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(data));

	// Convert to base64
	const computedSignature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));

	return computedSignature === signature;
}

/**
 * Parse Twilio webhook body (application/x-www-form-urlencoded)
 */
export function parseTwilioWebhook(body: string): Record<string, string> {
	const params: Record<string, string> = {};
	const pairs = body.split('&');

	for (const pair of pairs) {
		const [key, value] = pair.split('=');
		if (key && value !== undefined) {
			params[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
		}
	}

	return params;
}
