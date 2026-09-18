<script lang="ts" generics="T extends string">
	import type { Option } from '../questions';

	/**
	 * The face of a question card. One-choice cards answer on the first tap;
	 * multiple-choice cards answer when she taps `done`. `exclusive` names the option
	 * that cannot be combined with the others.
	 */
	let {
		prompt,
		hint,
		options,
		multiple = false,
		exclusive,
		done = 'Done',
		initial = [],
		onanswer
	}: {
		prompt: string;
		hint?: string;
		options: Option<T>[];
		multiple?: boolean;
		exclusive?: T;
		done?: string;
		initial?: T[];
		onanswer: (ids: T[]) => void;
	} = $props();

	// Seeded once from earlier answers; after that the card owns the selection.
	const seed = () => [...initial];
	let picked = $state<T[]>(seed());

	function choose(id: T) {
		if (!multiple) {
			picked = [id];
			onanswer([id]);
			return;
		}
		if (picked.includes(id)) {
			picked = picked.filter((p) => p !== id);
		} else if (id === exclusive) {
			picked = [id];
		} else {
			picked = [...picked.filter((p) => p !== exclusive), id];
		}
	}
</script>

<div class="paper">
	<div class="content">
		<h2 class="prompt" tabindex="-1">{prompt}</h2>
		{#if hint}<p class="hint">{hint}</p>{/if}

		{#if !multiple}
			<svg class="ornament" viewBox="0 0 120 12" aria-hidden="true" focusable="false">
				<path d="M0 6h48M72 6h48" />
				<path d="M60 0l6 6-6 6-6-6z" />
				<circle cx="42" cy="6" r="1.2" /><circle cx="78" cy="6" r="1.2" />
			</svg>
		{/if}

		<div
			class="options"
			class:grid={multiple}
			role={multiple ? 'group' : 'radiogroup'}
			aria-label={prompt}
		>
			{#each options as option (option.id)}
				<button
					type="button"
					class="option"
					class:wide={option.id === exclusive}
					role={multiple ? 'checkbox' : 'radio'}
					aria-checked={picked.includes(option.id)}
					onclick={() => choose(option.id)}
				>
					<span class="label">{option.label}</span>
					{#if option.detail}<span class="detail">{option.detail}</span>{/if}
				</button>
			{/each}
		</div>

		{#if multiple}
			<button
				type="button"
				class="done"
				disabled={picked.length === 0}
				onclick={() => onanswer(picked)}>{done}</button
			>
		{/if}
	</div>
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
		padding: 6cqw 5.5cqw 5cqw;
		border: 1px solid rgb(176 138 62 / 0.45);
		border-radius: 3.6cqw;
		overflow-y: auto;
	}

	.prompt:focus {
		outline: none;
	}

	.prompt {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(24px, 9.6cqw, 32px);
		line-height: 1.05;
		letter-spacing: -0.01em;
		text-wrap: balance;
	}

	.hint {
		margin: 1.6cqw 0 0;
		font-family: var(--font-display);
		font-style: italic;
		font-size: clamp(16px, 5.2cqw, 18px);
		color: var(--ink-on-paper-soft);
	}

	/* Sits in the middle of the space a short card leaves between question and answers. */
	.ornament {
		width: 44%;
		margin: auto;
		fill: none;
		stroke: var(--gold-deep);
		stroke-width: 1;
		opacity: 0.55;
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 2.2cqw;
		margin-top: auto;
		padding-top: 4cqw;
	}

	.ornament + .options {
		margin-top: 0;
	}

	.options.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding-top: 3cqw;
	}

	.option {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2px;
		min-height: 44px;
		padding: 2.4cqw 4cqw;
		border: 1px solid rgb(150 116 52 / 0.45);
		border-radius: 3.4cqw;
		background: rgb(255 252 244 / 0.55);
		color: inherit;
		text-align: left;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease,
			color 0.2s ease,
			transform 0.15s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.grid .option {
		justify-content: center;
	}

	.option.wide {
		grid-column: 1 / -1;
	}

	.option:active {
		transform: scale(0.98);
	}

	.option:focus-visible,
	.done:focus-visible {
		outline: 2px solid var(--gold-deep);
		outline-offset: 2px;
	}

	.option[aria-checked='true'] {
		background: var(--night);
		border-color: var(--gold);
		color: var(--paper);
	}

	.label {
		font-family: var(--font-display);
		font-size: clamp(18px, 6.4cqw, 21px);
		font-weight: 600;
		line-height: 1.2;
	}

	.detail {
		font-family: var(--font-mono);
		font-size: clamp(11px, 3.5cqw, 12px);
		letter-spacing: 0.02em;
		opacity: 0.72;
	}

	.done {
		margin-top: 3cqw;
		min-height: 46px;
		border: 0;
		border-radius: 999px;
		background: var(--night);
		color: var(--paper);
		font-family: var(--font-display);
		font-size: clamp(18px, 6.4cqw, 21px);
		font-weight: 600;
		font-style: italic;
		cursor: pointer;
		transition: opacity 0.2s ease;
	}

	.done:disabled {
		opacity: 0.3;
		cursor: default;
	}
</style>
