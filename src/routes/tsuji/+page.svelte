<script lang="ts">
	import { Tsuji } from 'tsuji';
</script>

<svelte:head>
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
	/>
	<title>辻 - Tsuji</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&display=swap" rel="stylesheet">
</svelte:head>

<!-- SVG filter for washi paper texture -->
<svg class="svg-filters">
	<defs>
		<filter id="paper-texture">
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.04"
				numOctaves="5"
				stitchTiles="stitch"
				result="noise"
			/>
			<feDiffuseLighting
				in="noise"
				lighting-color="#f6f4ef"
				surfaceScale="2"
				result="lit"
			>
				<feDistantLight azimuth="45" elevation="60" />
			</feDiffuseLighting>
		</filter>
	</defs>
</svg>

<div class="page">
	<!-- Paper texture overlay -->
	<div class="paper-texture"></div>

	<!-- Hero / Logo -->
	<div class="hero">
		<img src="/tsuji-calligraphy.svg" alt="辻" class="calligraphy" />
		<p class="subtitle">a simple translation tool</p>
	</div>

	<!-- Translation Component -->
	<div class="tsuji-wrapper">
		<Tsuji
			apiEndpoint="/api/translate"
			height="100%"
			maxWidth="100%"
			defaultLanguage="Japanese"
			showClearButton={true}
		/>
	</div>

	<!-- Footer -->
	<footer class="footer">
		<div class="footer-links">
			<a href="https://github.com/RSHVR/tsuji" target="_blank" rel="noopener">GitHub</a>
			<span>•</span>
			<a href="/">Home</a>
		</div>
	</footer>

	<!-- Signature -->
	<img src="/tsuji-name.svg" alt="" class="signature" />
</div>

<style>
	:global(body) {
		--bg-washi: #f6f4ef;
		--ink-primary: #1c1c1c;
		--ink-secondary: #3a3a3a;
		--accent-vermilion: #8c1d18;
	}

	.svg-filters {
		position: absolute;
		width: 0;
		height: 0;
	}

	.paper-texture {
		position: fixed;
		inset: 0;
		filter: url(#paper-texture);
		opacity: 0.03;
		pointer-events: none;
		z-index: 0;
	}

	.page {
		position: relative;
		z-index: 1;
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background-color: var(--bg-washi);
		color: var(--ink-primary);
		font-family: 'Cormorant Garamond', serif;
		font-weight: 300;
		line-height: 1.7;
	}

	.hero {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 3rem 2rem 1.5rem;
	}

	.calligraphy {
		width: 120px;
		height: 120px;
		opacity: 0.9;
	}

	.subtitle {
		margin-top: 1.5rem;
		font-size: 1.0rem;
		letter-spacing: 0.1em;
		color: var(--ink-secondary);
		text-transform: lowercase;
	}

	.tsuji-wrapper {
		flex: 1;
		min-height: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		max-width: 640px;
		width: 100%;
		margin: 0 auto;
		padding: 0 2rem 2rem;
	}

	/* Make Tsuji component fill available space */
	.tsuji-wrapper > :global(*) {
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}

	/* Ensure internal wrapper also constrains */
	.tsuji-wrapper :global(.flex-1) {
		min-height: 0;
	}

	/* Override Tsuji component styles to match aesthetic */
	.tsuji-wrapper :global(.rounded-2xl) {
		border-radius: 3px;
	}

	.tsuji-wrapper :global(.border-stone-300) {
		border-color: rgba(0, 0, 0, 0.1);
	}

	.tsuji-wrapper :global(.bg-white\/50) {
		background-color: transparent;
	}

	.tsuji-wrapper :global(.border-stone-200) {
		border-color: rgba(0, 0, 0, 0.08);
	}

	.tsuji-wrapper :global(.bg-blue-500) {
		background-color: var(--ink-primary);
	}

	.tsuji-wrapper :global(.hover\:bg-blue-600:hover) {
		background-color: var(--ink-secondary);
	}

	.tsuji-wrapper :global(.from-blue-400) {
		--tw-gradient-from: var(--ink-secondary);
	}

	.tsuji-wrapper :global(.to-indigo-500) {
		--tw-gradient-to: var(--ink-primary);
	}

	.tsuji-wrapper :global(.rounded-xl) {
		border-radius: 3px;
	}

	.tsuji-wrapper :global(.rounded-lg) {
		border-radius: 2px;
	}

	.tsuji-wrapper :global(.shadow-sm) {
		box-shadow: none;
	}

	.tsuji-wrapper :global(select),
	.tsuji-wrapper :global(textarea) {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 400;
	}

	.tsuji-wrapper :global(.focus\:ring-2) {
		--tw-ring-opacity: 0;
	}

	.tsuji-wrapper :global(.focus\:border-blue-500) {
		border-color: rgba(0, 0, 0, 0.3);
	}

	/* Footer */
	.footer {
		flex-shrink: 0;
		padding: 1rem 2rem;
		text-align: center;
	}

	.footer-links {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		align-items: center;
	}

	.footer-links a {
		color: var(--ink-secondary);
		text-decoration: none;
		font-size: 0.85rem;
		letter-spacing: 0.05em;
		transition: color 0.3s ease;
	}

	.footer-links a:hover {
		color: var(--ink-primary);
	}

	.footer-links span {
		color: var(--ink-secondary);
		opacity: 0.5;
	}

	/* Signature */
	.signature {
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		width: 120px;
		height: auto;
		opacity: 0.65;
		pointer-events: none;
		z-index: 10;
	}

	@media (max-width: 865px) {
		.signature {
			width: 50px;
			bottom: 1rem;
			right: 0.5rem;
		}
	}
</style>
