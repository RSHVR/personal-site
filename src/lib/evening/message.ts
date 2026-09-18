import { arrivalQuestion, foodQuestion, labelOf, timingQuestion } from './questions';
import type { RsvpNotice } from './rsvp';
import type { Answers, Plan } from './schema';
import { weekday } from './time';

interface MessageInput {
	plan: Plan;
	guest: string;
	date: string;
	answers: Answers;
	/** True when she has sent answers before and changed them. */
	updated: boolean;
}

/** The email Veer receives when she finishes the cards. */
export function formatAnswers({ plan, guest, date, answers, updated }: MessageInput) {
	const subject = updated
		? `${guest} changed her answers for ${weekday(date)}`
		: `${guest} turned the cards for ${weekday(date)}`;

	const text = [
		`${subject}.`,
		'',
		`Where: ${plan.areas[answers.area].label}`,
		`Getting there: ${labelOf(arrivalQuestion.options, answers.arrival)}`,
		`Food: ${answers.food.map((f) => labelOf(foodQuestion.options, f)).join(', ')}`,
		`Timing: ${labelOf(timingQuestion.options, answers.timing)}`
	].join('\n');

	return { subject, text };
}

/** The email Veer receives each time she answers "Are you in?". */
export function formatRsvp({
	guest,
	date,
	notice
}: {
	guest: string;
	date: string;
	notice: RsvpNotice;
}) {
	const day = weekday(date);
	const emails: Record<RsvpNotice, { subject: string; text: string }> = {
		yes: { subject: `${guest} said yes`, text: `${guest} said yes to ${day}.` },
		no: {
			subject: `${guest} said no`,
			text: `${guest} said no to ${day}. The page asked her once more.`
		},
		'yes-after-no': {
			subject: `${guest} said yes`,
			text: `${guest} said no, then yes when asked again. She's in for ${day}.`
		},
		'no-again': {
			subject: `${guest} said no again`,
			text: `${guest} said no twice. That's her answer for ${day}.`
		},
		'changed-mind': {
			subject: `${guest} changed her mind: yes`,
			text: `${guest} said no, then changed her mind. She's in for ${day}.`
		}
	};
	return emails[notice];
}
