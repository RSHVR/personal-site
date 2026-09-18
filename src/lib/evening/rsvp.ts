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
