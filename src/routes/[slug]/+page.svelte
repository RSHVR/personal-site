<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Deck from '$lib/evening/components/Deck.svelte';
	import Spread from '$lib/evening/components/Spread.svelte';
	import {
		parseNotices,
		parseRsvp,
		rsvpNotice,
		type Rsvp,
		type RsvpNotice
	} from '$lib/evening/rsvp';
	import { answersSchemaFor, type Answers } from '$lib/evening/schema';
	import { weekday } from '$lib/evening/time';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	/** What her phone remembers, so a second visit opens on the finished evening. */
	interface Saved {
		answers: Answers;
		/** These answers reached Veer. */
		sent: boolean;
		/** Some answers reached Veer before, so the next text says she changed them. */
		everSent: boolean;
		/** Her answer to "Are you in?". */
		rsvp: Rsvp;
		/** Emails about her answer that have not reached Veer yet, oldest first. */
		notices: RsvpNotice[];
	}

	const QUESTIONS_START = 3;

	let saved = $state<Saved | null>(null);
	let phase = $state<'deck' | 'spread'>('deck');
	let startAt = $state(0);
	let run = $state(0);
	let apple = $state(false);
	let ready = $state(false);
	let version = 0;

	const storageKey = $derived(`evening:${data.slug}`);

	function read(): Saved | null {
		try {
			const raw = localStorage.getItem(storageKey);
			if (!raw) return null;
			const stored = JSON.parse(raw);
			// Checked against today's plan, so a renamed area sends her back through the cards.
			const answers = answersSchemaFor(data.plan).safeParse(stored?.answers);
			if (!answers.success) return null;
			return {
				answers: answers.data,
				sent: stored.sent === true,
				everSent: stored.everSent === true,
				rsvp: parseRsvp(stored.rsvp),
				notices: parseNotices(stored.notices)
			};
		} catch {
			return null;
		}
	}

	function write(value: Saved) {
		try {
			localStorage.setItem(storageKey, JSON.stringify(value));
		} catch {
			// Private mode or blocked storage: the page still works, it just won't remember.
		}
	}

	/** Texts her answers to Veer. A failure stays unsent and retries on her next visit. */
	async function send(value: Saved) {
		const mine = ++version;
		try {
			const response = await fetch(resolve('/[slug]/answers', { slug: data.slug }), {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ answers: value.answers, updated: value.everSent })
			});
			if (!response.ok || mine !== version || !saved) return;
			// Spread the current state, not `value`: she may have answered "Are you in?" meanwhile.
			saved = { ...saved, sent: true, everSent: true };
			write(saved);
		} catch {
			// Offline: retried on her next visit.
		}
	}

	onMount(() => {
		apple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
		const stored = read();
		if (stored) {
			saved = stored;
			phase = 'spread';
			if (!stored.sent) send(stored);
			if (stored.notices.length) sendNotices();
		}
		ready = true;
	});

	function complete(answers: Answers) {
		const next: Saved = {
			answers,
			sent: false,
			everSent: saved?.everSent ?? false,
			rsvp: saved?.rsvp ?? 'ask',
			notices: saved?.notices ?? []
		};
		saved = next;
		write(next);
		phase = 'spread';
		window.scrollTo(0, 0);
		send(next);
	}

	/** Every answer to "Are you in?" emails Veer. */
	function reply(rsvp: Rsvp) {
		if (!saved) return;
		const notice = rsvpNotice(saved.rsvp, rsvp);
		saved = { ...saved, rsvp, notices: notice ? [...saved.notices, notice] : saved.notices };
		write(saved);
		sendNotices();
	}

	let sendingNotices = false;

	/** Sends waiting emails in order; whatever fails waits for her next visit. */
	async function sendNotices() {
		if (sendingNotices) return;
		sendingNotices = true;
		try {
			while (saved && saved.notices.length) {
				const response = await fetch(resolve('/[slug]/rsvp', { slug: data.slug }), {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({ notice: saved.notices[0] })
				});
				if (!response.ok) break;
				saved = { ...saved, notices: saved.notices.slice(1) };
				write(saved);
			}
		} catch {
			// Offline: the queue stays saved and goes out on her next visit.
		} finally {
			sendingNotices = false;
		}
	}

	function change() {
		startAt = QUESTIONS_START;
		run += 1;
		phase = 'deck';
		window.scrollTo(0, 0);
	}
</script>

<svelte:head>
	<title>For {data.guest}</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="referrer" content="no-referrer" />
	<meta name="theme-color" content="#140f1c" />
	<meta name="description" content="{data.plan.host} planned the evening." />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="For {data.guest}" />
	<meta property="og:description" content="{data.plan.host} planned the evening. Turn the cards over." />
	<!-- Public and nameless on purpose: files in static/ are served to anyone. -->
	<meta property="og:image" content="{page.url.origin}/evening-og.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=DM+Mono:wght@400;500&display=swap"
	/>
</svelte:head>

<div class="evening">
	<div class="glow" aria-hidden="true"></div>
	{#if ready}
		{#if phase === 'deck'}
			<div class="phase" out:fade={{ duration: 600 }}>
				{#key run}
					<Deck
						plan={data.plan}
						day={weekday(data.date)}
						guest={data.guest}
						{startAt}
						initial={saved?.answers}
						oncomplete={complete}
					/>
				{/key}
			</div>
		{:else if saved}
			<div class="phase" in:fade={{ duration: 900, delay: 500 }}>
				<Spread
					plan={data.plan}
					guest={data.guest}
					date={data.date}
					answers={saved.answers}
					slug={data.slug}
					phone={data.phone}
					hostEmail={data.hostEmail}
					{apple}
					rsvp={saved.rsvp}
					onrsvp={reply}
					onchange={change}
				/>
			</div>
		{/if}
	{/if}
</div>

<style>
	:global(html:has(.evening)),
	:global(body:has(.evening)) {
		background: #0f0b15;
		color-scheme: dark;
	}

	.evening {
		--night: #140f1c;
		--paper: #f5ecdc;
		--paper-fill: #f5ebd9;
		--paper-dim: rgb(245 236 220 / 0.8);
		--paper-surface: radial-gradient(130% 95% at 50% 25%, #f9f2e5 0%, #f4e9d6 55%, #eadcc2 100%);
		--ink-on-paper: #2a1f1a;
		--ink-on-paper-soft: #5b4938;
		--gold: #e2bd66;
		--gold-deep: #86611f;
		--muted: #ab9c8c;
		--font-display: 'Cormorant Garamond', Georgia, serif;
		--font-mono: 'DM Mono', ui-monospace, monospace;

		position: relative;
		display: grid;
		min-height: 100svh;
		overflow-x: clip;
		background:
			radial-gradient(120% 70% at 50% -10%, #2a1c36 0%, transparent 60%),
			radial-gradient(90% 60% at 50% 110%, #1d1422 0%, transparent 70%),
			var(--night);
		color: var(--paper);
		-webkit-font-smoothing: antialiased;
	}

	/* Film grain over everything, so the flat colours read as paper and night rather than screen. */
	.evening::after {
		content: '';
		position: fixed;
		inset: 0;
		pointer-events: none;
		opacity: 0.22;
		mix-blend-mode: overlay;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
	}

	/* Warm light behind the cards, like a lamp over a table. */
	.glow {
		position: fixed;
		left: 50%;
		top: 52%;
		width: 150vmin;
		height: 150vmin;
		transform: translate(-50%, -50%);
		pointer-events: none;
		background: radial-gradient(closest-side, rgb(233 178 96 / 0.2), rgb(233 178 96 / 0.06) 55%, transparent);
		animation: breathe 7s ease-in-out infinite;
	}

	@keyframes breathe {
		50% {
			opacity: 0.7;
			transform: translate(-50%, -50%) scale(0.96);
		}
	}

	.phase {
		grid-area: 1 / 1;
		position: relative;
		z-index: 1;
		min-width: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.glow {
			animation: none;
		}
	}
</style>
