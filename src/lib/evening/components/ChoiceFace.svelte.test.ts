import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import ChoiceFace from './ChoiceFace.svelte';
import { foodQuestion, timingQuestion } from '../questions';

describe('ChoiceFace', () => {
	test('a single-choice card answers on the first tap', async () => {
		const onanswer = vi.fn();
		render(ChoiceFace, {
			prompt: timingQuestion.prompt,
			options: timingQuestion.options,
			onanswer
		});
		await fireEvent.click(screen.getByRole('radio', { name: /No rush/ }));
		expect(onanswer).toHaveBeenCalledWith(['no-rush']);
	});

	test('a multiple-choice card waits for "That\'s it"', async () => {
		const onanswer = vi.fn();
		render(ChoiceFace, {
			prompt: foodQuestion.prompt,
			options: foodQuestion.options,
			multiple: true,
			exclusive: 'anything',
			done: foodQuestion.done,
			onanswer
		});
		const done = screen.getByRole('button', { name: foodQuestion.done });
		expect(done).toBeDisabled();

		await fireEvent.click(screen.getByRole('checkbox', { name: 'No pork' }));
		await fireEvent.click(screen.getByRole('checkbox', { name: 'Easy on the spice' }));
		expect(onanswer).not.toHaveBeenCalled();

		await fireEvent.click(done);
		expect(onanswer).toHaveBeenCalledWith(['no-pork', 'mild']);
	});

	test('"I eat anything" clears the restrictions, and a restriction clears it', async () => {
		render(ChoiceFace, {
			prompt: foodQuestion.prompt,
			options: foodQuestion.options,
			multiple: true,
			exclusive: 'anything',
			done: foodQuestion.done,
			onanswer: vi.fn()
		});
		const anything = screen.getByRole('checkbox', { name: 'I eat anything' });
		const noPork = screen.getByRole('checkbox', { name: 'No pork' });

		await fireEvent.click(noPork);
		await fireEvent.click(anything);
		expect(anything).toHaveAttribute('aria-checked', 'true');
		expect(noPork).toHaveAttribute('aria-checked', 'false');

		await fireEvent.click(noPork);
		expect(anything).toHaveAttribute('aria-checked', 'false');
		expect(noPork).toHaveAttribute('aria-checked', 'true');
	});

	test('starts from earlier answers when she changes them', () => {
		render(ChoiceFace, {
			prompt: timingQuestion.prompt,
			options: timingQuestion.options,
			initial: ['early-start'],
			onanswer: vi.fn()
		});
		expect(screen.getByRole('radio', { name: /Early start/ })).toHaveAttribute(
			'aria-checked',
			'true'
		);
	});
});
