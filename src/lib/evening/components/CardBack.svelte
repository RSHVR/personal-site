<script lang="ts">
	/** Art deco back with a monogram (her initial, from the deck). Every card shares it. */
	let { numeral, monogram = 'V' }: { numeral: string; monogram?: string } = $props();

	const uid = $props.id();
	const gold = `${uid}-gold`;
	const inner = `${uid}-inner`;
	const rays = Array.from({ length: 36 }, (_, i) => (i * Math.PI * 2) / 36);
	const corners = [
		[16, 16, 0],
		[234, 16, 90],
		[234, 334, 180],
		[16, 334, 270]
	] as const;
</script>

<div class="back">
	<svg viewBox="0 0 250 350" aria-hidden="true" focusable="false">
		<defs>
			<linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
				<stop offset="0" stop-color="#8c6a26" />
				<stop offset="0.45" stop-color="#e2bd66" />
				<stop offset="0.6" stop-color="#f6e2a4" />
				<stop offset="1" stop-color="#9a7428" />
			</linearGradient>
			<clipPath id={inner}><rect x="16" y="16" width="218" height="318" rx="9" /></clipPath>
		</defs>

		<g fill="none" stroke="url(#{gold})">
			<g clip-path="url(#{inner})" stroke-width="0.8" opacity="0.28">
				{#each rays as angle (angle)}
					<line
						x1={125 + Math.cos(angle) * 40}
						y1={175 + Math.sin(angle) * 40}
						x2={125 + Math.cos(angle) * 230}
						y2={175 + Math.sin(angle) * 230}
					/>
				{/each}
			</g>

			<rect x="10" y="10" width="230" height="330" rx="13" stroke-width="1.2" />
			<rect x="16" y="16" width="218" height="318" rx="9" stroke-width="0.7" opacity="0.6" />

			{#each corners as [x, y, turn] (turn)}
				<g transform="translate({x} {y}) rotate({turn})" stroke-width="0.9">
					<path d="M0 26A26 26 0 0 0 26 0" />
					<path d="M0 36A36 36 0 0 0 36 0" opacity="0.6" />
					<path d="M0 46A46 46 0 0 0 46 0" opacity="0.3" />
				</g>
			{/each}

			<circle cx="125" cy="175" r="62" stroke-width="0.9" opacity="0.7" />
			<circle cx="125" cy="175" r="70" stroke-width="1.6" stroke-dasharray="0.1 6" stroke-linecap="round" />

			<path d="M125 129 171 175 125 221 79 175z" fill="#1c1124" stroke-width="1.4" />
			<path d="M125 138 162 175 125 212 88 175z" stroke-width="0.7" opacity="0.7" />

			<path d="M92 40h66M104 48h42M92 310h66M104 302h42" stroke-width="0.9" opacity="0.7" />
		</g>

		<text x="125" y="190" text-anchor="middle" class="monogram" fill="url(#{gold})">{monogram}</text>
		<text x="125" y="286" text-anchor="middle" class="numeral" fill="url(#{gold})">{numeral}</text>
	</svg>
</div>

<style>
	.back {
		width: 100%;
		height: 100%;
		background:
			radial-gradient(120% 80% at 50% 45%, #33203f 0%, #1f1328 55%, #150c1b 100%),
			#1a1022;
	}

	svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	.monogram {
		font-family: 'Cormorant Garamond', Georgia, serif;
		font-style: italic;
		font-size: 54px;
		font-weight: 600;
	}

	.numeral {
		font-family: 'DM Mono', ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 0.3em;
	}
</style>
