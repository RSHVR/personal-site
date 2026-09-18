import { describe, expect, test } from 'vitest';
import { formatAnswers } from './message';
import { fixturePlan } from './fixtures';
import type { Answers } from './schema';

describe('formatAnswers', () => {
	const base = {
		plan: fixturePlan,
		guest: 'Alex',
		date: '2026-09-24',
		answers: {
			area: 'oakville',
			arrival: 'pickup',
			food: ['no-pork', 'mild'],
			timing: 'early-start'
		} as Answers
	};

	test('the subject names the guest and the day', () => {
		expect(formatAnswers({ ...base, updated: false }).subject).toBe(
			'Alex turned the cards for Thursday'
		);
	});

	test('the body lists each answer in plain words', () => {
		const { text } = formatAnswers({ ...base, updated: false });
		expect(text).toContain('Where: Oakville');
		expect(text).toContain('Getting there: Pick me up');
		expect(text).toContain('Food: No pork, Easy on the spice');
		expect(text).toContain('Timing: Early start tomorrow');
	});

	test('says when she changed her answers', () => {
		expect(formatAnswers({ ...base, updated: true }).subject).toBe(
			'Alex changed her answers for Thursday'
		);
	});
});
