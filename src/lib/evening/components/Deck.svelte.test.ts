import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Deck from './Deck.svelte';
import { fixturePlan } from '../fixtures';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

async function wait(ms = 4500) {
	await vi.advanceTimersByTimeAsync(ms);
}

/** Long enough for the opening lines and the first title to finish. */
const OPENING = 13000;

describe('Deck', () => {
	test('opens with a hello, then the plan line, then the first title', async () => {
		render(Deck, { plan: fixturePlan, day: 'Thursday', guest: 'Alex', oncomplete: vi.fn() });

		expect(screen.getByText('Hi Alex!')).toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: 'Dinner' })).not.toBeInTheDocument();

		await wait(4500);
		expect(screen.queryByText('Hi Alex!')).not.toBeInTheDocument();
		expect(screen.getByText('I planned our Thursday. Turn each card over.')).toBeInTheDocument();

		await wait(5400);
		expect(screen.getByRole('heading', { name: 'Dinner' })).toHaveTextContent(/^Dinner$/);
		expect(screen.queryByRole('button', { name: /Turn over/ })).not.toBeInTheDocument();

		await wait();
		expect(screen.getByRole('button', { name: 'Turn over card 1 of 3' })).toBeInTheDocument();
	});

	test('a tap skips the line on screen', async () => {
		render(Deck, { plan: fixturePlan, day: 'Thursday', guest: 'Alex', oncomplete: vi.fn() });
		await fireEvent.click(screen.getByText('Hi Alex!'));
		await wait(1300);
		expect(screen.getByText('I planned our Thursday. Turn each card over.')).toBeInTheDocument();
	});

	test('the question cards open with their own line', async () => {
		render(Deck, { plan: fixturePlan, day: 'Thursday', startAt: 2, oncomplete: vi.fn() });
		await wait();
		await fireEvent.click(screen.getByRole('button', { name: 'Turn over card 3 of 3' }));
		await wait();
		await fireEvent.click(screen.getByRole('button', { name: 'Next' }));
		await wait(900);
		const line = "A few small things I didn't want to ask over text. No wrong answers.";
		expect(screen.getByText(line)).toBeInTheDocument();

		await wait(7000);
		expect(screen.queryByText(line)).not.toBeInTheDocument();
		expect(screen.getByRole('heading', { name: 'Where' })).toBeInTheDocument();
	});

	test('the next title shows before the next card', async () => {
		render(Deck, { plan: fixturePlan, day: 'Thursday', oncomplete: vi.fn() });
		await wait(OPENING);
		await fireEvent.click(screen.getByRole('button', { name: 'Turn over card 1 of 3' }));
		await wait();
		await fireEvent.click(screen.getByRole('button', { name: 'Next card' }));

		// The old card finishes sliding out before the next title fades in.
		expect(screen.queryByRole('heading', { name: 'The feature' })).not.toBeInTheDocument();
		await wait(900);
		expect(screen.getByRole('heading', { name: 'The feature' })).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: /Turn over/ })).not.toBeInTheDocument();
		await wait();
		expect(screen.getByRole('button', { name: 'Turn over card 2 of 3' })).toBeInTheDocument();
	});

	test('question cards are titled too', async () => {
		render(Deck, { plan: fixturePlan, day: 'Thursday', startAt: 3, oncomplete: vi.fn() });
		expect(screen.getByRole('heading', { name: 'Where' })).toBeInTheDocument();
	});

	test('she turns three cards, answers four questions, and the deck hands back her answers', async () => {
		const oncomplete = vi.fn();
		render(Deck, { plan: fixturePlan, day: 'Thursday', oncomplete });
		await wait(OPENING);

		for (const n of [1, 2, 3]) {
			await fireEvent.click(screen.getByRole('button', { name: `Turn over card ${n} of 3` }));
			await wait();
			await fireEvent.click(screen.getByRole('button', { name: n < 3 ? 'Next card' : 'Next' }));
			await wait(n < 3 ? undefined : OPENING);
		}

		await fireEvent.click(screen.getByRole('radio', { name: /Oakville/ }));
		await wait();
		await fireEvent.click(screen.getByRole('radio', { name: /Pick me up/ }));
		await wait();
		await fireEvent.click(screen.getByRole('checkbox', { name: 'No pork' }));
		await fireEvent.click(screen.getByRole('button', { name: "That's it" }));
		await wait();
		await fireEvent.click(screen.getByRole('radio', { name: /No rush/ }));
		await wait();

		expect(oncomplete).toHaveBeenCalledWith({
			area: 'oakville',
			arrival: 'pickup',
			food: ['no-pork'],
			timing: 'no-rush'
		});
	});

	test('a card still waiting in the deck cannot answer for the top card', async () => {
		const oncomplete = vi.fn();
		render(Deck, { plan: fixturePlan, day: 'Thursday', startAt: 3, oncomplete });
		await wait();

		// The timing card sits under the area card; fireEvent reaches it despite `inert`.
		await fireEvent.click(screen.getByRole('radio', { name: /No rush/, hidden: true }));
		await wait();

		expect(screen.getByRole('list', { name: 'Card 4 of 7' })).toBeInTheDocument();
		expect(oncomplete).not.toHaveBeenCalled();
	});

	test('the card backs carry her initial, and her name is not shown as a header', async () => {
		const { container } = render(Deck, {
			plan: fixturePlan,
			day: 'Thursday',
			guest: 'Alex',
			oncomplete: vi.fn()
		});
		await wait(OPENING);
		const monograms = [...container.querySelectorAll('text.monogram')].map((t) => t.textContent);
		expect(monograms.length).toBe(7);
		expect(new Set(monograms)).toEqual(new Set(['A']));
		expect(screen.getByRole('heading', { level: 1, name: 'For Alex' })).toHaveClass('sr-only');
	});

	test('only the top card can be turned', async () => {
		render(Deck, { plan: fixturePlan, day: 'Thursday', oncomplete: vi.fn() });
		await wait(OPENING);
		expect(screen.getAllByRole('button', { name: /Turn over/ })).toHaveLength(1);
	});

	test('changing answers starts at the questions with her earlier choices', async () => {
		render(Deck, {
			plan: fixturePlan,
			day: 'Thursday',
			startAt: 3,
			initial: { area: 'hamilton', arrival: 'pickup', food: ['anything'], timing: 'no-rush' },
			oncomplete: vi.fn()
		});
		await wait();
		expect(screen.getByRole('radio', { name: /Hamilton/ })).toHaveAttribute('aria-checked', 'true');
	});

	test('offers each area with its note, first question first', async () => {
		render(Deck, { plan: fixturePlan, day: 'Thursday', startAt: 3, oncomplete: vi.fn() });
		await wait();
		expect(
			screen.getByRole('radio', { name: /Oakville.*Somewhere in between/ })
		).toBeInTheDocument();
		expect(screen.queryByRole('radio', { name: /Meet in the middle/ })).not.toBeInTheDocument();
	});
});
