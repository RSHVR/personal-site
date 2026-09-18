import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Spread from './Spread.svelte';
import { fixturePlan } from '../fixtures';
import type { Answers } from '../schema';
import type { Rsvp } from '../rsvp';

const base = {
	plan: fixturePlan,
	guest: 'Alex',
	date: '2026-09-24',
	slug: 'alex',
	phone: '555-010-0199',
	apple: true
};
const easy: Answers = {
	area: 'hamilton',
	arrival: 'meet-there',
	food: ['anything'],
	timing: 'no-rush'
};

function show(
	answers: Partial<Answers> = {},
	{ rsvp = 'ask' as Rsvp, onrsvp = vi.fn(), onchange = vi.fn() } = {}
) {
	return render(Spread, { ...base, answers: { ...easy, ...answers }, rsvp, onrsvp, onchange });
}

const click = (name: string | RegExp) => fireEvent.click(screen.getByRole('button', { name }));

describe('Spread: the plan', () => {
	test('names the day and the stops for the area she picked', () => {
		show({ area: 'oakville' });
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Thursday, September 24');
		expect(screen.getByText('Oakville')).toBeInTheDocument();
		expect(screen.getByText('Cineplex Winston Churchill')).toBeInTheDocument();
		expect(screen.queryByText('Landmark Cinemas')).not.toBeInTheDocument();
	});

	test("a pickup starts the evening at the area's pickup time", () => {
		show({ area: 'oakville', arrival: 'pickup' });
		const rows = screen.getAllByRole('listitem');
		expect(rows[0]).toHaveTextContent('4:40 pm');
		expect(rows[0]).toHaveTextContent("I'll pick you up");
	});

	test('a stop without a venue says we will find one together', () => {
		show();
		const dessert = screen.getAllByRole('listitem').at(-1)!;
		expect(dessert).toHaveTextContent('Ice cream');
		expect(dessert).toHaveTextContent("We'll find a spot together.");
		expect(dessert.querySelector('a')).toBeNull();
	});

	test('meeting there says where to meet', () => {
		show({ arrival: 'meet-there' });
		expect(screen.getByText(/Meet me here/)).toBeInTheDocument();
	});

	test('repeats her food answer and early start back to her', () => {
		show({ food: ['no-pork', 'mild'], timing: 'early-start' });
		expect(screen.getByText(/No pork, easy on the spice/)).toBeInTheDocument();
		expect(screen.getByText(/keep it early/)).toBeInTheDocument();
	});

	test('says nothing about food when she eats anything', () => {
		show();
		expect(screen.queryByText(/Noted/)).not.toBeInTheDocument();
	});

	test('ends without a sign-off', () => {
		show({}, { rsvp: 'yes' });
		expect(screen.queryByText(/See you/)).not.toBeInTheDocument();
		expect(screen.queryByText(/— Veer/)).not.toBeInTheDocument();
	});

	test('lets her change her answers', async () => {
		const onchange = vi.fn();
		show({}, { onchange });
		await click('Next');
		await click('Change my answers');
		expect(onchange).toHaveBeenCalled();
	});
});

describe('Spread: are you in?', () => {
	test('asks only after she taps Next under the plan', async () => {
		show();
		expect(screen.queryByRole('heading', { name: 'Are you in?' })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Change my answers' })).not.toBeInTheDocument();

		await click('Next');
		expect(screen.getByRole('heading', { name: 'Are you in?' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Change my answers' })).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
	});

	test('asks before showing the calendar or the number', async () => {
		show();
		await click('Next');
		expect(screen.getByRole('heading', { name: 'Are you in?' })).toBeInTheDocument();
		expect(screen.queryByRole('link', { name: /Calendar/ })).not.toBeInTheDocument();
		expect(screen.queryByText(/Text me/)).not.toBeInTheDocument();
	});

	test('a yes shows the happy cat, the number and the calendar links', async () => {
		const onrsvp = vi.fn();
		show({ area: 'oakville', arrival: 'pickup' }, { onrsvp });
		await click('Next');
		await click('Yes');

		expect(onrsvp).toHaveBeenLastCalledWith('yes');
		expect(screen.getByRole('img', { name: /cat grinning/ })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: "It's a date!" })).toBeInTheDocument();
		// The button carries the number; it is not printed above it.
		expect(screen.queryByText('555-010-0199')).not.toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Apple Calendar/ })).toHaveAttribute(
			'href',
			'/alex/calendar.ics?area=oakville&arrival=pickup'
		);
		expect(screen.getByRole('link', { name: /Google Calendar/ }).getAttribute('href')).toMatch(
			/^https:\/\/calendar\.google\.com\//
		);
	});

	test('after a yes with a pickup, the button asks her to text her address', () => {
		show({ arrival: 'pickup' }, { rsvp: 'yes' });
		expect(screen.getByRole('link', { name: 'Text me your address' })).toHaveAttribute(
			'href',
			'sms:5550100199'
		);
	});

	test('after a yes without a pickup, the button asks her to text that she is in', () => {
		show({ arrival: 'meet-there' }, { rsvp: 'yes' });
		expect(screen.getByRole('link', { name: "Text me so I know you're in" })).toHaveAttribute(
			'href',
			'sms:5550100199'
		);
	});

	test('the Google Calendar link invites Veer', () => {
		render(Spread, {
			...base,
			hostEmail: 'veer@example.com',
			answers: easy,
			rsvp: 'yes',
			onrsvp: vi.fn(),
			onchange: vi.fn()
		});
		const href = screen.getByRole('link', { name: /Google Calendar/ }).getAttribute('href')!;
		expect(new URL(href).searchParams.get('add')).toBe('veer@example.com');
	});

	test('the copy button copies the number', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		Object.assign(navigator, { clipboard: { writeText } });
		show({}, { rsvp: 'yes' });

		await click(/Copy number/);
		expect(writeText).toHaveBeenCalledWith('555-010-0199');
		expect(await screen.findByRole('button', { name: /Copied/ })).toBeInTheDocument();
	});

	test('a first no gets the sad cat and one more ask', async () => {
		show();
		await click('Next');
		await click('No');

		expect(screen.getByRole('img', { name: /sad cat/ })).toBeInTheDocument();
		expect(screen.getByText(/armrest/)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: "Fine, I'm in" })).toBeInTheDocument();
		expect(screen.queryByRole('link', { name: /Calendar/ })).not.toBeInTheDocument();
	});

	test('a second no is accepted with the okay cat', async () => {
		const onrsvp = vi.fn();
		show({}, { onrsvp });
		await click('Next');
		await click('No');
		await click('Still no');

		expect(onrsvp).toHaveBeenLastCalledWith('no');
		expect(screen.getByRole('img', { name: /nodding, okay/ })).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Still no' })).not.toBeInTheDocument();
	});

	test('a saved answer opens straight on it, without Next', () => {
		show({}, { rsvp: 'yes' });
		expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Apple Calendar/ })).toBeInTheDocument();
	});

	test('she can take back a no', async () => {
		show({}, { rsvp: 'no' });
		await click('Wait, I changed my mind');
		expect(screen.getByRole('link', { name: /Apple Calendar/ })).toBeInTheDocument();
	});

	test('leaves out the number when none is set', () => {
		render(Spread, {
			...base,
			phone: undefined,
			answers: easy,
			rsvp: 'yes',
			onrsvp: vi.fn(),
			onchange: vi.fn()
		});
		expect(screen.queryByText(/Text me/)).not.toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Apple Calendar/ })).toBeInTheDocument();
	});
});
