import { describe, expect, test } from 'vitest';
import { formatAnswers, formatRsvp } from './message';
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

describe('formatRsvp', () => {
	const base = { guest: 'Alex', date: '2026-09-24' };
	const email = (notice: Parameters<typeof formatRsvp>[0]['notice']) =>
		formatRsvp({ ...base, notice });

	test('a yes', () => {
		expect(email('yes')).toEqual({
			subject: 'Alex said yes',
			text: 'Alex said yes to Thursday.'
		});
	});

	test('the first no says she was asked again', () => {
		expect(email('no')).toEqual({
			subject: 'Alex said no',
			text: 'Alex said no to Thursday. The page asked her once more.'
		});
	});

	test('a yes after one no', () => {
		expect(email('yes-after-no').subject).toBe('Alex said yes');
		expect(email('yes-after-no').text).toContain('then yes when asked again');
	});

	test('a second no', () => {
		expect(email('no-again').subject).toBe('Alex said no again');
	});

	test('a change of mind', () => {
		expect(email('changed-mind').subject).toBe('Alex changed her mind: yes');
		expect(email('changed-mind').text).toContain("She's in for Thursday.");
	});
});
