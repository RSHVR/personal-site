<script lang="ts">
	import { onMount, tick } from 'svelte';
	import CardBack from './CardBack.svelte';
	import ChoiceFace from './ChoiceFace.svelte';
	import FlipCard from './FlipCard.svelte';
	import RevealFace from './RevealFace.svelte';
	import { areaQuestion, arrivalQuestion, foodQuestion, timingQuestion } from '../questions';
	import type { Answers, Plan, StopId } from '../schema';

	type QuestionId = 'area' | 'arrival' | 'food' | 'timing';
	type Step = { kind: 'reveal'; id: StopId } | { kind: 'question'; id: QuestionId };

	/** Three plan cards she turns over, then four question cards that turn themselves. */
	const STEPS: Step[] = [
		{ kind: 'reveal', id: 'dinner' },
		{ kind: 'reveal', id: 'film' },
		{ kind: 'reveal', id: 'dessert' },
		{ kind: 'question', id: 'area' },
		{ kind: 'question', id: 'arrival' },
		{ kind: 'question', id: 'food' },
		{ kind: 'question', id: 'timing' }
	];
	const REVEALS = STEPS.filter((s) => s.kind === 'reveal').length;
	const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
	const TILTS = [-2.4, 1.8, -1.3, 2.1, -1.7, 1.2, -1.5];
	const SWIPE_DISTANCE = 70;
	/** How long a card's title sits alone before it moves up and the card rises in. */
	const TITLE_MS = 2000;
	/** How long the answered card takes to slide out before the next title fades in. */
	const EXIT_MS = 700;
	/** Fade in or out for the lines that open a section. */
	const LINE_FADE_MS = 1080;
	/** Long enough to read a line: a base plus a little per character. */
	const holdFor = (text: string) => 1600 + text.length * 40;

	let {
		plan,
		day,
		guest,
		startAt = 0,
		initial,
		oncomplete
	}: {
		plan: Plan;
		/** Weekday of the date, e.g. "Thursday". */
		day: string;
		guest?: string;
		/** 3 skips the plan cards, for changing answers. */
		startAt?: number;
		initial?: Answers;
		oncomplete: (answers: Answers) => void;
	} = $props();

	const reduced =
		typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Seeded once from props; after that the deck owns its position.
	const start = () => startAt;
	let index = $state(start());
	let flipped = $state(STEPS.map((_, i) => i < start()));
	let exits = $state(STEPS.map(() => 0));
	let drag = $state(0);
	let dragging = $state(false);
	let pending = false;
	// False while the next card's title is on its own; the deck rises in when it turns true.
	let settled = $state(false);
	// True for the first frame after settling: the deck is shown fully transparent, then
	// fades in as one layer, so the stacked cards never show through each other.
	let arriving = $state(false);
	let flipTimer: ReturnType<typeof setTimeout> | undefined;
	let beatTimer: ReturnType<typeof setTimeout> | undefined;
	// The line on screen before a section's first card, and whether it is fading out.
	let line = $state<string | null>(null);
	// True while the last card slides out, so nothing new appears on top of it.
	let between = $state(false);
	let lineLeaving = $state(false);
	let lineQueue: string[] = [];

	const seedDraft = (): Partial<Answers> => ({ ...initial });
	const draft = seedDraft();
	/** Her initial on every card back. */
	const monogram = $derived(guest?.trim().charAt(0).toUpperCase() || 'V');
	const step = $derived(STEPS[index]);
	const questionKickers = {
		area: areaQuestion.kicker,
		arrival: arrivalQuestion.kicker,
		food: foodQuestion.kicker,
		timing: timingQuestion.kicker
	};
	const title = $derived(
		step.kind === 'reveal' ? plan.reveals[step.id].kicker : questionKickers[step.id]
	);
	const canSwipe = $derived(step.kind === 'reveal' && flipped[index]);
	const announcement = $derived.by(() => {
		if (step.kind !== 'reveal' || !flipped[index]) return '';
		const reveal = plan.reveals[step.id];
		return `${reveal.kicker}: ${reveal.title}. ${reveal.line}`;
	});

	let root: HTMLElement | undefined = $state();
	let nextButton: HTMLButtonElement | undefined = $state();

	/** Moves focus to whatever she can do next, for keyboards and screen readers. */
	async function focusNext() {
		await tick();
		const i = index;
		const slot = root?.querySelector<HTMLElement>(`[data-slot="${i}"]`);
		const target =
			STEPS[i].kind === 'reveal'
				? flipped[i]
					? nextButton
					: slot?.querySelector<HTMLElement>('.turn')
				: // An answered card focuses her answer; an unanswered one focuses the question, so no
					// option looks chosen for her.
					slot?.querySelector<HTMLElement>('[aria-checked="true"], .prompt');
		target?.focus({ preventScroll: true });
	}

	/** Question cards turn themselves over a beat after they reach the top. */
	function autoFlip() {
		const i = index;
		if (STEPS[i].kind !== 'question' || flipped[i]) return;
		clearTimeout(flipTimer);
		flipTimer = setTimeout(
			() => {
				flipped[i] = true;
				focusNext();
			},
			reduced ? 0 : 1000
		);
	}

	/** Lines that play on their own, one at a time, before a section's first card. */
	function linesBefore(i: number, opening: boolean): string[] {
		if (opening && i === 0) {
			return [guest ? `Hi ${guest}!` : 'Hi!', `I planned our ${day}. Turn each card over.`];
		}
		if (!opening && i === REVEALS) {
			return ["A few small things I didn't want to ask over text. No wrong answers."];
		}
		return [];
	}

	/** Plays the section's lines, then the card's title on its own, then lets the deck rise in. */
	function introduce(opening = false) {
		settled = false;
		clearTimeout(beatTimer);
		lineQueue = linesBefore(index, opening);
		if (opening || reduced) {
			nextLine();
			return;
		}
		between = true;
		beatTimer = setTimeout(() => {
			between = false;
			nextLine();
		}, EXIT_MS);
	}

	function nextLine() {
		const text = lineQueue.shift();
		lineLeaving = false;
		if (text === undefined) {
			line = null;
			beatTimer = setTimeout(settle, reduced ? 0 : TITLE_MS);
			return;
		}
		line = text;
		beatTimer = setTimeout(leaveLine, (reduced ? 0 : LINE_FADE_MS) + holdFor(text));
	}

	const nextFrame = (callback: () => void) =>
		typeof requestAnimationFrame === 'function'
			? requestAnimationFrame(callback)
			: setTimeout(callback, 16);

	/** The title moves up and the deck rises in under it, as one layer. */
	function settle() {
		arriving = true;
		settled = true;
		// Two frames, so the transparent deck is painted before its fade starts.
		nextFrame(() => nextFrame(() => (arriving = false)));
		autoFlip();
		focusNext();
	}

	function leaveLine() {
		clearTimeout(beatTimer);
		lineLeaving = true;
		beatTimer = setTimeout(nextLine, reduced ? 0 : LINE_FADE_MS);
	}

	/** A tap during a line moves straight on to what comes next. */
	function skipLine() {
		if (line && !lineLeaving) leaveLine();
	}

	onMount(() => {
		introduce(true);
		return () => {
			clearTimeout(flipTimer);
			clearTimeout(beatTimer);
		};
	});

	function turn(i: number) {
		if (i !== index || flipped[i]) return;
		flipped[i] = true;
		navigator.vibrate?.(8);
		focusNext();
	}

	function advance(exit = 0) {
		exits[index] = exit;
		drag = 0;
		pending = false;
		if (index === STEPS.length - 1) return;
		index += 1;
		introduce();
	}

	function answer<K extends QuestionId>(id: K, value: Answers[K]) {
		// Only the top card answers, so every earlier question has an answer when the deck finishes.
		if (pending || STEPS[index].id !== id) return;
		pending = true;
		draft[id] = value;
		// Long enough for her to see her choice land before the card leaves.
		setTimeout(
			() => {
				if (index === STEPS.length - 1) oncomplete(draft as Answers);
				else advance();
			},
			reduced ? 150 : 650
		);
	}

	function transformFor(i: number): string {
		const d = i - index;
		if (d < 0) {
			const exit = exits[i];
			return exit
				? `translate3d(${exit * 120}vw, -4vh, 0) rotate(${exit * 22}deg)`
				: 'translate3d(0, -80vh, 0) rotate(-9deg) scale(0.55)';
		}
		if (d === 0) return `translate3d(${drag}px, 0, 0) rotate(${drag * 0.05}deg)`;
		return `translate3d(0, ${d * 12}px, 0) scale(${1 - d * 0.045}) rotate(${TILTS[i]}deg)`;
	}

	let startX = 0;
	function pointerdown(event: PointerEvent) {
		if (!canSwipe) return;
		dragging = true;
		startX = event.clientX;
		(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
	}
	function pointermove(event: PointerEvent) {
		if (dragging) drag = event.clientX - startX;
	}
	function pointerup() {
		if (!dragging) return;
		dragging = false;
		if (Math.abs(drag) > SWIPE_DISTANCE) advance(Math.sign(drag));
		else drag = 0;
	}
</script>

<section class="deck" bind:this={root}>
	<header class="top">
		<h1 class="sr-only">{guest ? `For ${guest}` : 'For you'}</h1>
		<ol class="pips" aria-label="Card {index + 1} of {STEPS.length}">
			{#each { length: STEPS.length }, i (i)}
				<li class="pip" class:done={i < index} class:current={i === index} aria-hidden="true"></li>
			{/each}
		</ol>
	</header>

	<p class="sr-only" aria-live="polite">{announcement}</p>

	<div class="table">
	<div class="lines" aria-live="polite">
		{#if line}
			{#key line}
				<button
					type="button"
					class="line"
					class:short={line.length < 16}
					class:leaving={lineLeaving}
					onclick={skipLine}>{line}</button
				>
			{/key}
		{/if}
	</div>

	{#if !line && !between}
		{#key index}
			<h2 class="card-title" class:alone={!settled}>{title}</h2>
		{/key}
	{/if}

	<div
		class="stage"
		class:waiting={!settled}
		class:arriving
		aria-hidden={!settled}
		inert={!settled}
	>
		{#each STEPS as card, i (i)}
			{@const d = i - index}
			<div
				class="slot"
				class:gone={d < 0}
				class:dragging={d === 0 && dragging}
				data-slot={i}
				style:transform={transformFor(i)}
				style:opacity={d < 0 || d > 2 ? 0 : 1}
				style:z-index={d < 0 ? 25 : 20 - Math.abs(d)}
				aria-hidden={d !== 0}
				inert={d !== 0}
				onpointerdown={pointerdown}
				onpointermove={pointermove}
				onpointerup={pointerup}
				onpointercancel={pointerup}
			>
				<div class="lift">
				<FlipCard flipped={flipped[i]}>
					{#snippet back()}
						{#if card.kind === 'reveal' && d === 0}
							<button
								type="button"
								class="turn"
								aria-label="Turn over card {i + 1} of {REVEALS}"
								onclick={() => turn(i)}
							>
								<CardBack numeral={NUMERALS[i]} {monogram} />
							</button>
						{:else}
							<CardBack numeral={NUMERALS[i]} {monogram} />
						{/if}
					{/snippet}
					{#snippet front()}
						{#if card.kind === 'reveal'}
							<RevealFace
								reveal={plan.reveals[card.id]}
								kind={card.id}
								numeral={NUMERALS[i]}
								live={flipped[i] && d === 0}
							/>
						{:else if card.id === 'area'}
							<ChoiceFace
								prompt={areaQuestion.prompt}
								options={areaQuestion.options(plan)}
								initial={initial ? [initial.area] : []}
								onanswer={([id]) => answer('area', id)}
							/>
						{:else if card.id === 'arrival'}
							<ChoiceFace
								prompt={arrivalQuestion.prompt}
								options={arrivalQuestion.options}
								initial={initial ? [initial.arrival] : []}
								onanswer={([id]) => answer('arrival', id)}
							/>
						{:else if card.id === 'food'}
							<ChoiceFace
								prompt={foodQuestion.prompt}
								hint={foodQuestion.hint}
								options={foodQuestion.options}
								multiple
								exclusive="anything"
								done={foodQuestion.done}
								initial={initial?.food ?? []}
								onanswer={(ids) => answer('food', ids)}
							/>
						{:else}
							<ChoiceFace
								prompt={timingQuestion.prompt}
								options={timingQuestion.options}
								initial={initial ? [initial.timing] : []}
								onanswer={([id]) => answer('timing', id)}
							/>
						{/if}
					{/snippet}
				</FlipCard>
				</div>
			</div>
		{/each}
	</div>
	</div>

	<div class="controls">
		{#if settled && step.kind === 'reveal'}
			{#if flipped[index]}
				<button type="button" class="next" bind:this={nextButton} onclick={() => advance()}>
					{index < REVEALS - 1 ? 'Next card' : 'Next'}
				</button>
			{:else}
				<p class="hint">Tap the card</p>
			{/if}
		{/if}
	</div>
</section>

<style>
	.deck {
		--card-h: min(calc(min(84vw, 340px) * 1.4), calc(100svh - 156px));
		--card-w: calc(var(--card-h) / 1.4);
		height: 100svh;
		display: grid;
		grid-template-rows: auto 1fr auto;
		padding: max(14px, env(safe-area-inset-top)) 16px max(12px, env(safe-area-inset-bottom));
		overflow: hidden;
		touch-action: manipulation;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 28px;
		max-width: 420px;
		width: 100%;
		margin: 0 auto;
	}

	.pips {
		display: flex;
		gap: 5px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.pip {
		width: 10px;
		height: 14px;
		border-radius: 2px;
		border: 1px solid rgb(226 189 102 / 0.35);
		transition:
			background-color 0.4s ease,
			border-color 0.4s ease,
			transform 0.4s ease;
	}

	.pip.current {
		border-color: var(--gold);
		transform: translateY(-2px);
	}

	.pip.done {
		background: var(--paper);
		border-color: var(--paper);
	}

	/* The title's row sits on top of the stage, so the title can travel between them. */
	.table {
		position: relative;
		display: grid;
		grid-template-rows: 38px 1fr;
		min-height: 0;
		container-type: size;
	}

	/* The lines that open a section: one at a time, centered, tap to move on. */
	.lines {
		position: absolute;
		inset: 0;
		z-index: 40;
		pointer-events: none;
	}

	.line {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		padding: 0 8px;
		border: 0;
		background: none;
		color: var(--paper);
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 500;
		font-size: clamp(26px, 7.4vw, 32px);
		line-height: 1.2;
		text-align: center;
		text-wrap: balance;
		cursor: default;
		pointer-events: auto;
		-webkit-tap-highlight-color: transparent;
		animation: line-in 1.08s ease both;
	}

	.line.short {
		font-size: clamp(42px, 12vw, 58px);
	}

	.line.leaving {
		animation: line-out 1.08s ease both;
	}

	.line:focus-visible {
		outline: none;
	}

	@keyframes line-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}

	@keyframes line-out {
		to {
			opacity: 0;
			transform: translateY(-8px);
		}
	}

	/*
	 * At rest the title sits a quarter of the table's free space from the top, which puts it
	 * halfway between the top of the table and the card (the card is centred below it).
	 */
	.card-title {
		position: absolute;
		left: 0;
		right: 0;
		top: max(0px, calc((100cqh - 38px - var(--card-h)) / 4));
		z-index: 30;
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 10px;
		margin: 0;
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 500;
		font-size: 26px;
		line-height: 38px;
		color: var(--gold);
		pointer-events: none;
		animation: title-in 1.08s 0.2s ease both;
		transition:
			top 1.1s cubic-bezier(0.2, 0.8, 0.2, 1),
			transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	/* On its own, the title waits in the middle of the table, larger. */
	.card-title.alone {
		top: 50%;
		transform: translateY(-50%) scale(1.5);
	}

	@keyframes title-in {
		from {
			opacity: 0;
		}
	}

	/* The deck fades in and rises as one layer, so stacked cards never show through each other. */
	.stage {
		position: relative;
		grid-row: 2;
		min-height: 0;
		transition:
			opacity 0.9s ease,
			transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.stage.arriving {
		opacity: 0;
		transform: translateY(36px);
		transition: none;
	}

	.lift {
		width: 100%;
		height: 100%;
	}

	/*
	 * While a title plays, the rest of the deck is hidden at once, with no fade or movement,
	 * so only the card sliding out moves. The new top card settles into place unseen and then
	 * rises in with its deck.
	 */
	.stage.waiting .slot:not(.gone) {
		transition: none;
	}

	.stage.waiting .slot:not(.gone) .lift {
		opacity: 0;
	}

	.slot {
		position: absolute;
		left: 50%;
		top: 50%;
		width: var(--card-w);
		height: var(--card-h);
		margin-left: calc(var(--card-w) / -2);
		margin-top: calc(var(--card-h) / -2);
		--card-radius: calc(var(--card-w) * 0.06);
		transition:
			transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1),
			opacity 0.8s ease;
		will-change: transform;
		touch-action: pan-y;
	}

	.slot.gone {
		transition:
			transform 1.43s cubic-bezier(0.2, 0.8, 0.2, 1),
			opacity 1.04s ease;
	}

	.slot.dragging {
		transition: none;
	}

	.turn {
		display: block;
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.turn:focus-visible {
		outline: 2px solid var(--gold);
		outline-offset: 4px;
		border-radius: var(--card-radius);
	}

	.controls {
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hint {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: var(--muted);
		animation: breathe 2.6s ease-in-out infinite;
	}

	@keyframes breathe {
		50% {
			opacity: 0.45;
		}
	}

	.next {
		min-height: 48px;
		min-width: 160px;
		padding: 0 26px;
		border: 1px solid var(--gold);
		border-radius: 999px;
		background: rgb(226 189 102 / 0.08);
		color: var(--paper);
		font-family: var(--font-display);
		font-size: 21px;
		font-weight: 600;
		font-style: italic;
		cursor: pointer;
		animation: arrive 0.8s 0.6s ease both;
		-webkit-tap-highlight-color: transparent;
	}

	.next:focus-visible {
		outline: 2px solid var(--gold);
		outline-offset: 3px;
	}

	@keyframes arrive {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	@media (prefers-reduced-motion: reduce) {
		.slot {
			transition: opacity 0.3s ease;
		}
		.hint,
		.next,
		.line,
		.card-title {
			animation: none;
			transition: none;
		}
		.stage,
		.slot.gone {
			transition: none;
		}
	}
</style>
