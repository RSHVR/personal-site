<script lang="ts">
	import Illustration from './Illustration.svelte';
	import type { Reveal, StopId } from '../schema';

	/** The face of a plan card. Sizes itself from the card's width, so it works at any size. */
	let {
		reveal,
		kind,
		numeral,
		live = false
	}: { reveal: Reveal; kind: StopId; numeral: string; live?: boolean } = $props();
</script>

<div class="paper" class:live>
	<div class="content">
		<div class="art"><Illustration {kind} {live} /></div>
		<h2 class="title">{reveal.title}</h2>
		<p class="line">{reveal.line}</p>
		<p class="numeral">{numeral}</p>
	</div>
	<span class="sheen" aria-hidden="true"></span>
</div>

<style>
	.paper {
		position: relative;
		width: 100%;
		height: 100%;
		container-type: inline-size;
		background: var(--paper-surface);
		color: var(--ink-on-paper);
	}

	.content {
		position: absolute;
		inset: 3.4cqw;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 6cqw 7cqw 5cqw;
		border: 1px solid rgb(176 138 62 / 0.45);
		border-radius: 3.6cqw;
	}

	.numeral {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 3.6cqw;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: var(--gold-deep);
	}

	.art {
		width: 66cqw;
		aspect-ratio: 1;
		margin: 2cqw 0 1cqw;
	}

	.title {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 500;
		font-style: italic;
		font-size: 15cqw;
		line-height: 1;
	}

	.line {
		margin: 3.4cqw 0 0;
		font-family: var(--font-display);
		font-size: 5.9cqw;
		font-weight: 500;
		line-height: 1.3;
		color: var(--ink-on-paper-soft);
		text-wrap: balance;
	}

	.numeral {
		margin-top: auto;
		font-size: 3.2cqw;
	}

	/* One pass of light across the card as it lands face up. */
	.sheen {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: linear-gradient(
			112deg,
			transparent 35%,
			rgb(255 246 214 / 0.55) 48%,
			rgb(255 255 255 / 0.2) 52%,
			transparent 64%
		);
		background-size: 260% 100%;
		background-position: 120% 0;
		mix-blend-mode: soft-light;
	}
	.live .sheen {
		animation: sheen 2.2s 0.7s cubic-bezier(0.3, 0.6, 0.3, 1) both;
	}
	@keyframes sheen {
		to {
			background-position: -40% 0;
		}
	}

	/* In the final fan the cards are too small for text; the stops below carry the words. */
	@container (max-width: 170px) {
		.title,
		.line,
		.numeral {
			display: none;
		}
		.content {
			justify-content: center;
		}
		.art {
			width: 80cqw;
			margin: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.live .sheen {
			animation: none;
		}
	}
</style>
