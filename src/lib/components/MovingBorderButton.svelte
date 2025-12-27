<script lang="ts">
	import { onMount } from 'svelte';

	// Props
	let className: string = '';
	export { className as class };
	export let duration: number = 4; // seconds per full rotation
	export let type: 'button' | 'submit' = 'button';
	export let disabled: boolean = false;

	let rotation = 0;
	let animationFrame: number;

	onMount(() => {
		let startTime: number | null = null;

		function animate(timestamp: number) {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;

			// Calculate rotation (0-360 degrees)
			rotation = (elapsed / (duration * 1000)) * 360;

			animationFrame = requestAnimationFrame(animate);
		}

		animationFrame = requestAnimationFrame(animate);

		return () => {
			if (animationFrame) cancelAnimationFrame(animationFrame);
		};
	});
</script>

<button
	{type}
	{disabled}
	class="moving-border-button {className}"
	class:disabled
>
	<span class="button-content">
		<slot>Join Waitlist</slot>
	</span>
	<span
		class="moving-border"
		style="--rotation: {rotation}deg;"
	></span>
</button>

<style>
	.moving-border-button {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 3px;
		border-radius: 14px;
		background: #e8dcc8;
		border: none;
		cursor: pointer;
		overflow: hidden;
		isolation: isolate;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.moving-border-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}

	.button-content {
		position: relative;
		z-index: 10;
		padding: 16px 36px;
		border-radius: 11px;
		background: #e8dcc8;
		color: #3a3633;
		font-size: 16px;
		font-weight: 500;
		font-family: 'Inter', sans-serif;
		transition: background 0.3s ease;
	}

	.moving-border-button:hover .button-content {
		background: #efe3d1;
	}

	.moving-border {
		position: absolute;
		inset: 0;
		z-index: 0;
		border-radius: inherit;
		background: conic-gradient(
			from var(--rotation, 0deg) at 50% 50%,
			transparent 0deg,
			transparent 70deg,
			#9bb88f 85deg,
			#a8b89f 95deg,
			#9bb88f 105deg,
			transparent 120deg,
			transparent 360deg
		);
	}

	.moving-border-button:focus-visible {
		outline: 2px solid #a8b89f;
		outline-offset: 4px;
	}

	.moving-border-button.disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.moving-border-button.disabled:hover {
		transform: none;
		box-shadow: none;
	}
</style>
