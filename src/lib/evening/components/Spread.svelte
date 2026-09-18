<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { resolve } from '$app/paths';
	import RevealFace from './RevealFace.svelte';
	import { googleCalendarUrl } from '../calendar';
	import { resolveItinerary } from '../itinerary';
	import { mapsUrl } from '../maps';
	import { nextRsvp, rsvpCopy, type Gif, type Rsvp } from '../rsvp';
	import { foodQuestion, labelOf } from '../questions';
	import { STOP_IDS, type Answers, type Plan } from '../schema';
	import { formatDateLong, formatTime } from '../time';

	/** The finished evening: her answers resolved into times and places, then "Are you in?". */
	let {
		plan,
		guest,
		date,
		answers,
		slug,
		phone,
		hostEmail,
		apple,
		rsvp,
		onrsvp,
		onchange
	}: {
		plan: Plan;
		guest: string;
		date: string;
		answers: Answers;
		slug: string;
		/** Veer's number for the "text me" line after a yes; the line is left out without it. */
		phone?: string;
		/** Invited as a guest on the Google Calendar event. */
		hostEmail?: string;
		/** Apple devices get Apple Maps and the Apple Calendar button first. */
		apple: boolean;
		/** Where "Are you in?" stood when the page loaded. */
		rsvp: Rsvp;
		onrsvp: (rsvp: Rsvp) => void;
		onchange: () => void;
	} = $props();

	const NUMERALS = ['I', 'II', 'III'];

	const itinerary = $derived(resolveItinerary(plan, answers, date));
	const meeting = $derived(answers.arrival !== 'pickup');
	const icsHref = $derived(
		`${resolve('/[slug]/calendar.ics', { slug })}?${new URLSearchParams({ area: answers.area, arrival: answers.arrival })}`
	);
	const googleHref = $derived(
		googleCalendarUrl({ itinerary, date, invite: hostEmail })
	);
	const food = $derived(
		answers.food.includes('anything')
			? ''
			: answers.food
					.map((id, i) => {
						const label = labelOf(foodQuestion.options, id);
						return i === 0 ? label : label.toLowerCase();
					})
					.join(', ')
	);
	const early = $derived(answers.timing === 'early-start');
	/** Opens Messages addressed to Veer on her phone. */
	const smsHref = $derived(phone ? `sms:${phone.replace(/[^\d+]/g, '')}` : '');

	// Seeded once from the saved answer; after that the page owns it.
	const seedRsvp = () => rsvp;
	let reply = $state<Rsvp>(seedRsvp());
	let replySection: HTMLElement | undefined = $state();
	let replyHeading: HTMLElement | undefined = $state();

	const titles: Record<Rsvp, string> = {
		ask: rsvpCopy.ask.title,
		yes: rsvpCopy.yes.title,
		'no-once': rsvpCopy['no-once'].title,
		no: rsvpCopy.no.title
	};
	const gif = $derived(reply === 'ask' ? undefined : rsvpCopy[reply].gif);

	/** Loads the GIFs her next tap could show, so they appear without a wait. */
	function preloadAhead(current: Rsvp) {
		const ahead: Record<Rsvp, Gif[]> = {
			ask: [rsvpCopy.yes.gif, rsvpCopy['no-once'].gif],
			'no-once': [rsvpCopy.yes.gif, rsvpCopy.no.gif],
			no: [rsvpCopy.yes.gif],
			yes: []
		};
		for (const next of ahead[current]) new Image().src = next.src;
	}

	onMount(() => preloadAhead(reply));

	// "Are you in?" waits behind Next until she has read the plan; a saved answer skips it.
	const seedOpen = () => rsvp !== 'ask';
	let replyOpen = $state(seedOpen());

	/** Shows "Are you in?" on its own screen and brings it into view. */
	async function openReply() {
		replyOpen = true;
		await tick();
		replySection?.scrollIntoView?.({ block: 'start', behavior: 'smooth' });
		replyHeading?.focus({ preventScroll: true });
	}

	async function choose(choice: 'yes' | 'no') {
		const next = nextRsvp(reply, choice);
		if (next === reply) return;
		reply = next;
		onrsvp(next);
		preloadAhead(next);
		await tick();
		replySection?.scrollIntoView?.({ block: 'start', behavior: 'smooth' });
		replyHeading?.focus({ preventScroll: true });
	}

	let copied = $state(false);
	let copiedTimer: ReturnType<typeof setTimeout> | undefined;

	async function copyNumber() {
		if (!phone) return;
		try {
			await navigator.clipboard.writeText(phone);
		} catch {
			// Older iOS without the async clipboard: copy through a hidden, selected field.
			const field = document.createElement('textarea');
			field.value = phone;
			field.setAttribute('readonly', '');
			field.style.position = 'fixed';
			field.style.opacity = '0';
			document.body.append(field);
			field.select();
			document.execCommand('copy');
			field.remove();
		}
		copied = true;
		clearTimeout(copiedTimer);
		copiedTimer = setTimeout(() => (copied = false), 2400);
	}
</script>

<article class="spread">
	<div class="fan" aria-hidden="true">
		{#each STOP_IDS as id, i (id)}
			<div class="fan-card" style:--i={i - 1}>
				<RevealFace reveal={plan.reveals[id]} kind={id} numeral={NUMERALS[i]} live />
			</div>
		{/each}
	</div>

	<header class="head rise" style:--n={1}>
		<p class="for">For {guest}</p>
		<h1>{formatDateLong(date)}</h1>
		<p class="area">{itinerary.area.label}</p>
	</header>

	<ol class="timeline">
		{#each itinerary.items as item, i (item.id)}
			<li class="row rise" style:--n={i + 2}>
				<p class="when">{formatTime(item.start)}</p>
				<div class="what">
					{#if item.id === 'pickup'}
						<h2>I'll pick you up</h2>
						<p class="note">I'll text when I'm outside.</p>
					{:else}
						<h2>{item.title}</h2>
						{#if item.venue}
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external maps link -->
							<a class="where" href={mapsUrl(item.venue, apple)} target="_blank" rel="noopener noreferrer">
								<span class="venue">{item.venue.name}</span>
								<span class="address">{item.venue.address}</span>
							</a>
						{:else}
							<p class="note">We'll find a spot together.</p>
						{/if}
						{#if meeting && item.id === 'dinner'}
							<p class="note">Meet me here. I'll get there first.</p>
						{/if}
					{/if}
				</div>
			</li>
		{/each}
	</ol>

	{#if food || early}
		<section class="noted rise" style:--n={itinerary.items.length + 2}>
			<h2>Noted</h2>
			{#if food}<p>{food}. I'll handle it.</p>{/if}
			{#if early}<p>Early start tomorrow. I'll keep it early.</p>{/if}
		</section>
	{/if}

	{#if !replyOpen}
		<div class="to-reply rise" style:--n={itinerary.items.length + 3}>
			<button type="button" class="button next" onclick={openReply}>Next</button>
		</div>
	{:else}
	<section class="reply" class:rise={rsvp !== 'ask'} bind:this={replySection} style:--n={itinerary.items.length + 3}>
		{#key reply}
			{#if gif}
				<img class="gif" src={gif.src} alt={gif.alt} width={gif.width} height={gif.height} />
			{/if}
		{/key}
		<h2 class="question" tabindex="-1" bind:this={replyHeading}>{titles[reply]}</h2>

		{#if reply === 'ask'}
			<div class="choices">
				<button type="button" class="button gold" onclick={() => choose('yes')}
					>{rsvpCopy.ask.yes}</button
				>
				<button type="button" class="button" onclick={() => choose('no')}>{rsvpCopy.ask.no}</button>
			</div>
		{:else if reply === 'no-once'}
			<p class="line">{rsvpCopy['no-once'].line}</p>
			<div class="choices">
				<button type="button" class="button gold" onclick={() => choose('yes')}
					>{rsvpCopy['no-once'].yes}</button
				>
				<button type="button" class="button" onclick={() => choose('no')}
					>{rsvpCopy['no-once'].no}</button
				>
			</div>
		{:else if reply === 'no'}
			<p class="line">{rsvpCopy.no.line}</p>
			<button type="button" class="quiet" onclick={() => choose('yes')}>{rsvpCopy.no.again}</button>
		{:else}
			{#if phone}
				<div class="accept">
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- sms: opens her texting app -->
					<a class="button gold text-me" href={smsHref}
						>{meeting ? "Text me so I know you're in" : 'Text me your address'}</a
					>
					<button type="button" class="quiet copy" onclick={copyNumber}>
						{copied ? 'Copied' : 'Copy number'}
					</button>
					<span class="sr-only" aria-live="polite">{copied ? 'Number copied' : ''}</span>
				</div>
			{/if}

			<div class="add" class:google-first={!apple}>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolve() plus a query string -->
				<a class="button apple" href={icsHref}>Add to Apple Calendar</a>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external Google Calendar link -->
				<a class="button google" href={googleHref} target="_blank" rel="noopener noreferrer"
					>Add to Google Calendar</a
				>
			</div>
		{/if}

		<button type="button" class="quiet change" onclick={onchange}>Change my answers</button>
	</section>
	{/if}
</article>

<style>
	.spread {
		max-width: 440px;
		margin: 0 auto;
		padding: max(28px, env(safe-area-inset-top)) 16px max(40px, env(safe-area-inset-bottom));
		color: var(--paper);
	}

	/* Three face-up cards, dealt into a fan. */
	.fan {
		position: relative;
		height: calc(min(30vw, 124px) * 1.4 + 26px);
		margin-bottom: 12px;
	}

	.fan-card {
		position: absolute;
		left: 50%;
		top: 14px;
		width: min(30vw, 124px);
		aspect-ratio: 5 / 7;
		margin-left: calc(min(30vw, 124px) / -2);
		border-radius: 10px;
		overflow: hidden;
		transform-origin: 50% 120%;
		transform: translateX(calc(var(--i) * 58%)) rotate(calc(var(--i) * 9deg));
		box-shadow:
			0 14px 30px -10px rgb(0 0 0 / 0.7),
			0 3px 8px rgb(0 0 0 / 0.35);
		animation: deal 1.3s cubic-bezier(0.2, 0.8, 0.2, 1) both;
		animation-delay: calc((var(--i) + 1) * 160ms);
	}

	@keyframes deal {
		from {
			transform: translateY(24px) rotate(0deg);
			opacity: 0;
		}
	}

	.head {
		text-align: center;
	}

	.for,
	.area,
	.when,
	.noted h2 {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: var(--gold);
	}

	h1 {
		margin: 10px 0 8px;
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(34px, 10.5vw, 46px);
		line-height: 1.02;
		text-wrap: balance;
	}

	.area {
		color: var(--muted);
	}

	.timeline {
		position: relative;
		margin: 34px 0 0;
		padding: 0;
		list-style: none;
	}

	/* The dotted thread that joins the stops. */
	.timeline::before {
		content: '';
		position: absolute;
		left: 84px;
		top: 10px;
		bottom: 26px;
		border-left: 1px dashed rgb(226 189 102 / 0.35);
	}

	.row {
		position: relative;
		display: grid;
		grid-template-columns: 72px 1fr;
		gap: 24px;
		padding-bottom: 26px;
	}

	.row::before {
		content: '';
		position: absolute;
		left: 80px;
		top: 5px;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--night);
		border: 1px solid var(--gold);
	}

	.when {
		padding-top: 2px;
		white-space: nowrap;
		text-align: right;
		letter-spacing: 0.08em;
		text-transform: none;
		font-size: 12px;
	}

	.what h2 {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 26px;
		line-height: 1.08;
	}

	.where {
		display: inline-flex;
		flex-direction: column;
		gap: 3px;
		margin-top: 8px;
		padding: 2px 0;
		color: inherit;
		text-decoration: none;
	}

	.venue {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 20px;
		font-weight: 500;
		text-decoration: underline;
		text-decoration-color: rgb(226 189 102 / 0.5);
		text-underline-offset: 4px;
	}

	.address {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--muted);
	}

	.where:focus-visible,
	.button:focus-visible,
	.quiet:focus-visible {
		outline: 2px solid var(--gold);
		outline-offset: 3px;
		border-radius: 6px;
	}

	.note {
		margin: 8px 0 0;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 19px;
		font-weight: 500;
		color: var(--paper-dim);
	}

	.noted {
		margin: 6px 0 0;
		padding: 16px 18px;
		border: 1px solid rgb(226 189 102 / 0.28);
		border-radius: 14px;
		background: rgb(255 245 220 / 0.03);
	}

	.noted p {
		margin: 8px 0 0;
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 500;
		line-height: 1.35;
	}

	/*
	 * "Are you in?" and each answer fill exactly one screen, so the GIF and its buttons
	 * sit alone in view once she answers.
	 */
	.reply {
		animation: reply-in 0.9s ease both;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100svh;
		padding: 16px 0;
		box-sizing: border-box;
		text-align: center;
	}

	.gif {
		display: block;
		width: auto;
		height: min(220px, 26svh);
		max-width: 100%;
		margin: 0 auto 18px;
		border-radius: 16px;
		border: 1px solid rgb(226 189 102 / 0.35);
		box-shadow: 0 18px 40px -16px rgb(0 0 0 / 0.8);
		animation: pop 0.8s cubic-bezier(0.2, 0.9, 0.3, 1.25) both;
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: scale(0.85) rotate(-3deg);
		}
	}

	.question {
		margin: 0;
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 500;
		font-size: clamp(32px, 9.5vw, 40px);
		line-height: 1.1;
	}

	.question:focus {
		outline: none;
	}

	.line {
		margin: 10px 0 0;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 21px;
		font-weight: 500;
		line-height: 1.3;
		color: var(--paper-dim);
		text-wrap: balance;
	}

	.choices {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-top: 20px;
	}

	.choices .button {
		font-style: italic;
		cursor: pointer;
		background: rgb(226 189 102 / 0.08);
	}

	.accept {
		margin-top: 8px;
	}

	.text-me {
		margin-top: 20px;
		font-style: italic;
	}

	.accept .copy {
		margin-top: 8px;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.add {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 16px;
	}

	.add.google-first {
		flex-direction: column-reverse;
	}

	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 52px;
		border-radius: 999px;
		border: 1px solid var(--gold);
		color: var(--paper);
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 600;
		text-decoration: none;
		-webkit-tap-highlight-color: transparent;
	}

	/* The main action: "Yes", and whichever calendar suits her phone. */
	.button.gold {
		background: linear-gradient(135deg, #f3dc9b, #d3a64f 55%, #b8893b);
		border-color: transparent;
		color: var(--night);
		font-weight: 500;
	}

	.to-reply {
		display: flex;
		justify-content: center;
		margin-top: 36px;
	}

	.next {
		min-width: 180px;
		padding: 0 28px;
		background: rgb(226 189 102 / 0.08);
		font-style: italic;
		cursor: pointer;
	}

	.reply .change {
		align-self: center;
		margin-top: 8px;
	}

	.quiet {
		margin-top: 30px;
		min-height: 44px;
		padding: 0 12px;
		border: 0;
		background: none;
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		text-decoration: underline;
		text-underline-offset: 5px;
		cursor: pointer;
	}

	.rise {
		animation: rise 1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
		animation-delay: calc(0.6s + var(--n) * 140ms);
	}

	@keyframes reply-in {
		from {
			opacity: 0;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.fan-card,
		.rise,
		.reply,
		.gif {
			animation: none;
		}
	}
</style>
