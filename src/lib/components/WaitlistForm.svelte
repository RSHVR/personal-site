<script lang="ts">
	import { scale, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import type { Snippet } from 'svelte';
	import { waitlistSchema } from '$lib/schemas/waitlist';

	let { children }: { children?: Snippet<[{ status: 'idle' | 'loading' | 'success' | 'error' }]> } = $props();

	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let email = $state('');
	let errorMessage = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		errorMessage = '';

		// Client-side validation with Zod
		const result = waitlistSchema.safeParse({ email });

		if (!result.success) {
			errorMessage = result.error.issues[0]?.message || 'invalid email';
			status = 'error';
			return;
		}

		status = 'loading';

		try {
			const response = await fetch('/api/waitlist', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: email.trim() })
			});

			const data = await response.json();

			if (!response.ok) {
				errorMessage = data.error || 'Something went wrong';
				status = 'error';
				return;
			}

			status = 'success';
		} catch (err) {
			errorMessage = 'Something went wrong. Please try again.';
			status = 'error';
		}
	}
</script>

<div class="waitlist-container">
	{#if status === 'success'}
		<div class="success-message" in:scale={{ start: 0.95, duration: 400, easing: cubicOut }}>
			<span class="success-icon">✓</span>
			<p class="success-title">You're on the list!</p>
			<p class="success-subtitle">We'll be in touch soon.</p>
		</div>
	{:else}
		<form class="waitlist-form" onsubmit={handleSubmit} in:fade={{ duration: 200 }}>
			<input
				type="text"
				name="email"
				placeholder="Enter your email"
				bind:value={email}
				aria-invalid={errorMessage ? 'true' : undefined}
				class="waitlist-input"
				class:error={errorMessage}
				disabled={status === 'loading'}
			/>

			{#if errorMessage}
				<p class="error-message" in:fade={{ duration: 200 }}>{errorMessage}</p>
			{/if}

			{#if children}
				{@render children({ status })}
			{/if}
		</form>
	{/if}
</div>

<style>
	.waitlist-container {
		width: 100%;
		max-width: 400px;
		margin: 0 auto;
	}

	.waitlist-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}

	.waitlist-input {
		width: 100%;
		background: #fafafa;
		border: none;
		border-bottom: 1px solid rgba(168, 184, 159, 0.5);
		border-radius: 8px;
		padding: 12px 8px;
		font-family: 'Inter', sans-serif;
		font-size: 15px;
		color: #3a3633;
		text-align: center;
		transition: border-color 0.3s ease;
	}

	.waitlist-input::placeholder {
		color: #9a9590;
		font-weight: 400;
	}

	.waitlist-input:focus {
		outline: none;
		border-bottom-color: #a8b89f;
		border-bottom-width: 2px;
	}

	.waitlist-input:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.waitlist-input.error {
		border-bottom-color: #c9a8a8;
		animation: subtle-shake 0.4s ease;
	}

	.error-message {
		color: #a89090;
		font-size: 12px;
		font-family: 'Inter', sans-serif;
		margin: 0;
		text-align: center;
	}

	/* Success state */
	.success-message {
		text-align: center;
		padding: 20px 0;
	}

	.success-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: #a8b89f;
		color: white;
		border-radius: 50%;
		font-size: 20px;
		margin-bottom: 12px;
	}

	.success-title {
		font-family: 'Cormorant Infant', serif;
		font-size: 24px;
		font-style: italic;
		color: #3a3633;
		margin: 0 0 4px 0;
	}

	.success-subtitle {
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		color: #6b6560;
		margin: 0;
	}

	@keyframes subtle-shake {
		0%, 100% { transform: translateX(0); }
		20% { transform: translateX(-4px); }
		40% { transform: translateX(4px); }
		60% { transform: translateX(-4px); }
		80% { transform: translateX(4px); }
	}

	/* Mobile responsive */
	@media (max-width: 480px) {
		.success-title {
			font-size: 22px;
		}
	}
</style>
