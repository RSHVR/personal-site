/**
 * "Are you in?" at the end of the evening page. A first no gets one cheeky second ask;
 * a second no is accepted. A small link lets her take back a no she didn't mean.
 */

export const RSVP_STATES = ['ask', 'yes', 'no-once', 'no'] as const;
export type Rsvp = (typeof RSVP_STATES)[number];

export function nextRsvp(current: Rsvp, choice: 'yes' | 'no'): Rsvp {
	if (choice === 'yes' || current === 'yes') return 'yes';
	return current === 'ask' ? 'no-once' : 'no';
}

/** The email each change of answer sends Veer; every tap sends one. */
export const RSVP_NOTICES = ['yes', 'no', 'yes-after-no', 'no-again', 'changed-mind'] as const;
export type RsvpNotice = (typeof RSVP_NOTICES)[number];

export function rsvpNotice(previous: Rsvp, next: Rsvp): RsvpNotice | null {
	if (next === 'yes') {
		if (previous === 'no') return 'changed-mind';
		return previous === 'no-once' ? 'yes-after-no' : 'yes';
	}
	if (next === 'no-once') return 'no';
	if (next === 'no') return 'no-again';
	return null;
}

/** Keeps only notices this page knows, from a saved queue of unsent ones. */
export function parseNotices(value: unknown): RsvpNotice[] {
	return Array.isArray(value)
		? value.filter((n): n is RsvpNotice => RSVP_NOTICES.includes(n as RsvpNotice))
		: [];
}

/** Reads a saved state; anything unknown starts from the question. */
export function parseRsvp(value: unknown): Rsvp {
	return RSVP_STATES.includes(value as Rsvp) ? (value as Rsvp) : 'ask';
}

export interface Gif {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export const rsvpCopy = {
	ask: {
		title: 'Are you in?',
		yes: 'Yes',
		no: 'No'
	},
	yes: {
		title: "It's a date!",
		gif: {
			src: 'https://media.giphy.com/media/A0Zt7yuDULiy4ofmVD/giphy.gif',
			alt: 'A cat grinning into the camera',
			width: 288,
			height: 308
		} satisfies Gif
	},
	'no-once': {
		title: 'Wait, really?',
		line: 'I already promised you the armrest.',
		yes: "Fine, I'm in",
		no: 'Still no',
		gif: {
			src: 'https://media1.tenor.com/m/tuzl1hVGlIQAAAAC/sad-cat-sad-cat-meme.gif',
			alt: 'A very sad cat',
			width: 480,
			height: 480
		} satisfies Gif
	},
	no: {
		title: 'Okay.',
		line: 'Thanks for turning the cards anyway.',
		again: 'Wait, I changed my mind',
		gif: {
			src: 'https://media1.tenor.com/m/yXNxw5d5g-4AAAAd/ok-cat-okay-cat.gif',
			alt: 'A cat nodding, okay',
			width: 360,
			height: 360
		} satisfies Gif
	}
};
