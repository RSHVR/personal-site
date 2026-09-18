import { describe, expect, test } from 'vitest';
import { nextRsvp, parseRsvp, rsvpNotice } from './rsvp';

describe('nextRsvp', () => {
	test('yes at the first ask is a yes', () => {
		expect(nextRsvp('ask', 'yes')).toBe('yes');
	});

	test('no at the first ask asks once more', () => {
		expect(nextRsvp('ask', 'no')).toBe('no-once');
	});

	test('yes on the second ask is a yes', () => {
		expect(nextRsvp('no-once', 'yes')).toBe('yes');
	});

	test('no on the second ask is final', () => {
		expect(nextRsvp('no-once', 'no')).toBe('no');
	});

	test('she can still change her mind after a final no', () => {
		expect(nextRsvp('no', 'yes')).toBe('yes');
	});

	test('a yes stays a yes', () => {
		expect(nextRsvp('yes', 'no')).toBe('yes');
	});
});

describe('parseRsvp', () => {
	test('keeps a known state', () => {
		expect(parseRsvp('no-once')).toBe('no-once');
	});

	test('falls back to asking for anything else', () => {
		expect(parseRsvp(undefined)).toBe('ask');
		expect(parseRsvp('maybe')).toBe('ask');
	});
});

describe('rsvpNotice', () => {
	test('a yes at the first ask', () => {
		expect(rsvpNotice('ask', 'yes')).toBe('yes');
	});

	test('the first no', () => {
		expect(rsvpNotice('ask', 'no-once')).toBe('no');
	});

	test('a yes after one no', () => {
		expect(rsvpNotice('no-once', 'yes')).toBe('yes-after-no');
	});

	test('a second no', () => {
		expect(rsvpNotice('no-once', 'no')).toBe('no-again');
	});

	test('a yes after a final no', () => {
		expect(rsvpNotice('no', 'yes')).toBe('changed-mind');
	});
});
