<script lang="ts">
	import type { StopId } from '../schema';

	let { kind, live = false }: { kind: StopId; live?: boolean } = $props();

	const uid = $props.id();
	const gold = `${uid}-gold`;
	const beam = `${uid}-beam`;
	const cone = `${uid}-cone`;
</script>

<svg viewBox="0 0 200 200" class="art" class:live aria-hidden="true" focusable="false">
	<defs>
		<linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" stop-color="#7a5a1e" />
			<stop offset="0.42" stop-color="#d6ac52" />
			<stop offset="0.58" stop-color="#f0d488" />
			<stop offset="1" stop-color="#8c6a26" />
		</linearGradient>
		<linearGradient id={beam} x1="0" y1="0" x2="1" y2="0">
			<stop offset="0" stop-color="#e9c46a" stop-opacity="0.75" />
			<stop offset="1" stop-color="#e9c46a" stop-opacity="0" />
		</linearGradient>
		<clipPath id={cone}><path d="M70 104 100 182 130 104z" /></clipPath>
	</defs>

	<g fill="none" stroke="url(#{gold})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
		{#if kind === 'dinner'}
			<g class="steam">
				<path d="M78 60c-7-9 7-15 0-24s7-15 0-24" />
				<path d="M100 54c-7-9 7-15 0-24s7-15 0-24" />
				<path d="M122 60c-7-9 7-15 0-24s7-15 0-24" />
			</g>
			<path d="M58 97 62 70l22 3-2 24" />
			<path d="M112 95 176 44M120 98l64-46" />
			<path d="M26 98c0 40 32 70 74 70s74-30 74-70z" fill="var(--paper-fill)" stroke="none" />
			<path d="M26 98c0 40 32 70 74 70s74-30 74-70" />
			<path d="M36 120c20 10 42 15 64 15s44-5 64-15" stroke-dasharray="0.5 7" />
			<ellipse cx="100" cy="98" rx="74" ry="13" />
			<ellipse cx="126" cy="98" rx="14" ry="6" />
			<ellipse cx="126" cy="98" rx="5.5" ry="2.6" fill="url(#{gold})" stroke="none" />
			<path d="M80 101c6-4 11 3 17 0s11 3 17 0" stroke-width="2" />
			<path d="M76 163l4 13h40l4-13" />
		{:else if kind === 'film'}
			<path class="beam" d="M160 116 198 90v62l-38-18z" fill="url(#{beam})" stroke="none" />
			<path d="M72 38 130 50" stroke-width="2" />
			<circle cx="72" cy="66" r="28" />
			<circle cx="72" cy="66" r="4" />
			<circle cx="72" cy="50" r="6" /><circle cx="86" cy="74" r="6" /><circle cx="58" cy="74" r="6" />
			<g class="reel">
				<circle cx="130" cy="72" r="22" />
				<circle cx="130" cy="72" r="3.5" />
				<circle cx="130" cy="59" r="5" /><circle cx="141" cy="78" r="5" /><circle cx="119" cy="78" r="5" />
			</g>
			<rect x="44" y="102" width="106" height="46" rx="9" fill="var(--paper-fill)" />
			<rect x="150" y="114" width="12" height="22" rx="3" fill="var(--paper-fill)" />
			<circle cx="70" cy="125" r="9" />
			<path d="M94 118h38M94 126h38M94 134h24" stroke-width="2" />
			<path d="M66 148 56 178M128 148l10 30M97 148v30" />
		{:else}
			<g clip-path="url(#{cone})" stroke-width="1.6">
				{#each [0, 1, 2, 3, 4, 5, 6, 7] as k (k)}
					<path d="M{46 + k * 12} 100l44 90" />
					<path d="M{154 - k * 12} 100l-44 90" />
				{/each}
			</g>
			<path d="M70 104 100 182 130 104" />
			<circle cx="100" cy="52" r="22" fill="var(--paper-fill)" />
			<path d="M104 30c0-9 5-14 12-16" stroke-width="2" />
			<circle cx="104" cy="28" r="6" fill="url(#{gold})" stroke="none" />
			<path
				d="M64 106C58 84 76 66 100 66s42 18 36 40q-6 6-12 0-6 6-12 0-6 6-12 0-6 6-12 0-6 6-12 0-6 6-12 0z"
				fill="var(--paper-fill)"
			/>
			<path class="drip" d="M118 108v9a3 3 0 0 0 6 0v-9" stroke-width="2.4" />
			<g fill="url(#{gold})" stroke="none">
				<path class="spark" d="M154 48l2.2 6 6 2.2-6 2.2-2.2 6-2.2-6-6-2.2 6-2.2z" />
				<path class="spark late" d="M44 82l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6z" />
			</g>
		{/if}
	</g>
</svg>

<style>
	.art {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.live .steam path {
		animation: steam 3.2s ease-in-out infinite;
	}
	.live .steam path:nth-child(2) {
		animation-delay: 0.6s;
	}
	.live .steam path:nth-child(3) {
		animation-delay: 1.2s;
	}
	@keyframes steam {
		0% {
			opacity: 0;
			transform: translateY(8px);
		}
		35% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translateY(-10px);
		}
	}

	.live .beam {
		animation: flicker 2.4s steps(1) infinite;
	}
	@keyframes flicker {
		0%,
		100% {
			opacity: 1;
		}
		12% {
			opacity: 0.7;
		}
		16% {
			opacity: 1;
		}
		58% {
			opacity: 0.82;
		}
		62% {
			opacity: 1;
		}
	}

	.reel {
		transform-origin: 130px 72px;
	}
	.live .reel {
		animation: spin 6s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.drip {
		transform-origin: 121px 108px;
	}
	.live .drip {
		animation: drip 4s ease-in-out infinite;
	}
	@keyframes drip {
		0%,
		30% {
			transform: scaleY(0.2);
		}
		70%,
		100% {
			transform: scaleY(1);
		}
	}

	.spark {
		transform-box: fill-box;
		transform-origin: center;
	}
	.live .spark {
		animation: twinkle 2.8s ease-in-out infinite;
	}
	.live .spark.late {
		animation-delay: 1.4s;
	}
	@keyframes twinkle {
		0%,
		100% {
			opacity: 0.2;
			transform: scale(0.6);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.art * {
			animation: none !important;
		}
	}
</style>
