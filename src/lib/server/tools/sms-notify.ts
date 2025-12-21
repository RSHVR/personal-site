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

/**
 * Extended tool type that supports programmatic calling
 */
export interface ProgrammaticTool {
	name: string;
	description: string;
	input_schema: {
		type: 'object';
		properties: Record<string, unknown>;
		required?: string[];
	};
	allowed_callers?: ('direct' | 'code_execution_20250825')[];
}

/**
 * Tool definition for Claude to notify Veer via SMS
 *
 * This tool is marked for programmatic calling - Claude writes Python code
 * that loops through SMS interactions without re-sampling each time.
 * Massive token savings as intermediate results don't enter context.
 */
export const smsNotifyOwnerTool: ProgrammaticTool = {
	name: 'notify_owner_sms',
	description: `Send an SMS to Veer for real-time input. Returns the owner's reply.

OUTPUT FORMAT: Returns a string with the owner's reply.
- If reply is exactly "SEND", the conversation is complete
- Otherwise, the reply contains private context for formulating response

USAGE IN CODE:
\`\`\`python
reply = await notify_owner_sms(message="Someone asking about availability")
if reply == "SEND":
    # Owner approved, formulate response
    print("Ready to respond to visitor")
else:
    # Owner provided context, may need follow-up
    reply2 = await notify_owner_sms(message="They want React consulting")
    if reply2 == "SEND":
        print("Ready to respond with context from first reply")
\`\`\`

WHEN TO USE:
✅ Visitor wants to discuss a project, freelance work, or consulting
✅ Specific questions only Veer can answer (rates, availability, custom work)
✅ Qualified lead genuinely interested in working together
✅ Visitor explicitly asks to speak with Veer or a human

WHEN NOT TO USE:
❌ General questions answerable from website content
❌ Technical questions about Veer's public work
❌ Simple greetings or small talk

PRIVACY RULES:
- All replies before "SEND" are PRIVATE context
- Never reveal private context to visitor
- Never say "Veer said", "he mentioned", "apparently"
- Respond AS IF you naturally know the answer`,
	input_schema: {
		type: 'object' as const,
		properties: {
			message: {
				type: 'string',
				description:
					'Message to Veer. Include visitor context and what response would help.'
			},
			context_summary: {
				type: 'string',
				description:
					'Brief summary (e.g., "Visitor asking about freelance React project")'
			}
		},
		required: ['message']
	}
	// NOTE: allowed_callers removed - SDK doesn't support it yet (wraps under 'custom')
	// Re-add when SDK supports PTC: allowed_callers: ['code_execution_20250825']
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
