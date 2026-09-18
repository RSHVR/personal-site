import type { Arrival, Food, Plan, Timing } from './schema';

/**
 * The four things she answers. Every option is phrased so that none of them
 * reads as the cautious or the forward choice. The first option reads as the default,
 * so the least forward one goes first.
 */

export interface Option<T extends string> {
	id: T;
	label: string;
	detail?: string;
}

export const areaQuestion = {
	kicker: 'Where',
	prompt: 'Where should we go?',
	options: (plan: Plan): Option<string>[] =>
		Object.entries(plan.areas).map(([id, area]) => ({ id, label: area.label, detail: area.blurb }))
};

export const arrivalQuestion = {
	kicker: 'Getting there',
	prompt: 'How do you want to get there?',
	options: [
		{ id: 'meet-there', label: "We'll meet there", detail: "I'll get there first." },
		{ id: 'pickup', label: 'Pick me up', detail: "I'll text when I'm outside." }
	] satisfies Option<Arrival>[]
};

export const foodQuestion = {
	kicker: 'Food',
	prompt: 'Anything I should know about food?',
	hint: 'Tap all that fit.',
	done: "That's it",
	options: [
		{ id: 'anything', label: 'I eat anything' },
		{ id: 'no-pork', label: 'No pork' },
		{ id: 'no-beef', label: 'No beef' },
		{ id: 'vegetarian', label: 'Vegetarian' },
		{ id: 'mild', label: 'Easy on the spice' }
	] satisfies Option<Food>[]
};

export const timingQuestion = {
	kicker: 'After',
	prompt: "What's the next morning like?",
	options: [
		{ id: 'no-rush', label: 'No rush', detail: 'We can take our time.' },
		{ id: 'early-start', label: 'Early start tomorrow', detail: "I'll keep it early." }
	] satisfies Option<Timing>[]
};

export function labelOf<T extends string>(options: Option<T>[], id: T): string {
	return options.find((o) => o.id === id)?.label ?? id;
}
