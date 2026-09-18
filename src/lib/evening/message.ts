import { arrivalQuestion, foodQuestion, labelOf, timingQuestion } from './questions';
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
