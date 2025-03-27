<!-- src/lib/components/BreakpointDebugger.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Default Tailwind breakpoints
	const breakpoints = {
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		'2xl': 1536
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
		currentBreakpoint = 'xs';
		if (width >= breakpoints['2xl']) currentBreakpoint = '2xl';
		else if (width >= breakpoints.xl) currentBreakpoint = 'xl';
		else if (width >= breakpoints.lg) currentBreakpoint = 'lg';
		else if (width >= breakpoints.md) currentBreakpoint = 'md';
		else if (width >= breakpoints.sm) currentBreakpoint = 'sm';
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
				{#each Object.entries(breakpoints) as [name, size]}
					<span class="breakpoint {currentBreakpoint === name ? 'active' : ''}">
						{name}
					</span>
				{/each}
			</div>
		</div>
		<button class="toggle-button" on:click={toggleVisibility}>×</button>
	</div>
{:else}
	<button class="show-button" on:click={toggleVisibility}>BP</button>
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
	}

	.breakpoint {
		opacity: 0.5;
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
