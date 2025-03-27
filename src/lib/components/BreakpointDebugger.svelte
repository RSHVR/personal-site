<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Define breakpoints according to the comprehensive list provided
	const breakpoints = {
		'xs-mobile': { min: 0, max: 480 }, // Extra Small Mobile (320px - 480px)
		'sm-mobile': { min: 481, max: 600 }, // Small Mobile landscape (481px - 600px)
		'sm-tablet': { min: 601, max: 768 }, // Small Tablets portrait (601px - 768px)
		'lg-tablet': { min: 769, max: 1024 }, // Large Tablets landscape (769px - 1024px)
		'sm-desktop': { min: 1025, max: 1280 }, // Small Desktops/Laptops (1025px - 1280px)
		'lg-desktop': { min: 1281, max: 1440 }, // Large Desktops (1281px - 1440px)
		'xl-desktop': { min: 1441, max: 9999 } // Extra Large Desktops (1441px and up)
	};

	let width = 0;
	let height = 0;
	let currentBreakpoint = '';
	let visible = true;

	// Update dimensions and current breakpoint
	function updateDimensions() {
		if (!browser) return;

		width = window.innerWidth;
		height = window.innerHeight;

		// Determine current breakpoint
		currentBreakpoint =
			Object.entries(breakpoints).find(([_, { min, max }]) => width >= min && width <= max)?.[0] ||
			'';
	}

	function toggleVisibility() {
		visible = !visible;
	}

	onMount(() => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);

		return () => {
			window.removeEventListener('resize', updateDimensions);
		};
	});
</script>

{#if visible}
	<div class="breakpoint-debugger">
		<div class="debugger-content">
			<div class="dimensions">
				<span>{width}px × {height}px</span>
			</div>
			<div class="breakpoints">
				{#each Object.entries(breakpoints) as [name, _]}
					<span class="breakpoint {currentBreakpoint === name ? 'active' : ''}">
						{name}
					</span>
				{/each}
			</div>
		</div>
		<button class="toggle-button" on:click={toggleVisibility} aria-label="Hide debugger">×</button>
	</div>
{:else}
	<button class="show-button" on:click={toggleVisibility} aria-label="Show breakpoint debugger"
		>BP</button
	>
{/if}

<style>
	.breakpoint-debugger {
		position: fixed;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.75);
		color: white;
		font-family: monospace;
		font-size: 12px;
		padding: 8px 12px;
		border-top-left-radius: 4px;
		z-index: 9999;
		display: flex;
		align-items: center;
	}

	.debugger-content {
		display: flex;
		flex-direction: column;
	}

	.dimensions {
		margin-bottom: 4px;
	}

	.breakpoints {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
		max-width: 300px;
	}

	.breakpoint {
		opacity: 0.5;
		margin-right: 4px;
	}

	.breakpoint.active {
		opacity: 1;
		font-weight: bold;
		color: #38bdf8; /* Tailwind sky-400 color */
	}

	.toggle-button {
		background: none;
		border: none;
		color: white;
		font-size: 16px;
		cursor: pointer;
		padding: 0 0 0 8px;
		margin-left: 8px;
	}

	.show-button {
		position: fixed;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.75);
		color: white;
		border: none;
		border-top-left-radius: 4px;
		padding: 4px 8px;
		font-family: monospace;
		font-size: 12px;
		cursor: pointer;
		z-index: 9999;
	}
</style>
