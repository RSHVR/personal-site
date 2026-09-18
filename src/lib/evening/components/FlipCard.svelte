<script lang="ts">
	import type { Snippet } from 'svelte';

	/** A card with two faces. `back` shows until `flipped`, then `front` turns into view. */
	let { flipped, back, front }: { flipped: boolean; back: Snippet; front: Snippet } = $props();
</script>

<div class="flip" class:flipped>
	<div class="inner">
		<div class="face back" aria-hidden={flipped} inert={flipped}>{@render back()}</div>
		<div class="face front" aria-hidden={!flipped} inert={!flipped}>{@render front()}</div>
	</div>
</div>

<style>
	.flip {
		width: 100%;
		height: 100%;
		perspective: 1400px;
	}

	.flipped {
		animation: lift 1.3s cubic-bezier(0.3, 0.7, 0.2, 1);
	}

	.inner {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		/* The 1.1 end point overshoots a little past 180°, so the card settles instead of stopping. */
		transition: transform 1.3s cubic-bezier(0.3, 0.8, 0.25, 1.1);
	}

	.flipped .inner {
		transform: rotateY(180deg);
	}

	.face {
		position: absolute;
		inset: 0;
		border-radius: var(--card-radius, 18px);
		overflow: hidden;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		box-shadow:
			0 1px 0 rgb(255 255 255 / 0.06) inset,
			0 18px 40px -12px rgb(0 0 0 / 0.65),
			0 4px 10px rgb(0 0 0 / 0.35);
	}

	/* Safari shows the back through the front unless the back is explicitly un-rotated. */
	.back {
		transform: rotateY(0deg);
	}

	.front {
		transform: rotateY(180deg);
	}

	@keyframes lift {
		45% {
			transform: translateY(-10px) scale(1.04);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.flipped {
			animation: none;
		}
		.inner,
		.flipped .inner {
			transition: none;
			transform: none;
		}
		.face {
			transition: opacity 0.35s ease;
		}
		.front {
			transform: none;
			opacity: 0;
		}
		.flipped .front {
			opacity: 1;
		}
		.flipped .back {
			opacity: 0;
		}
	}
</style>
