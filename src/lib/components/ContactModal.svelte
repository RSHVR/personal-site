<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	let { showModal = $bindable(false) } = $props();

	// Form data
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let submitting = $state(false);
	let submitted = $state(false);
	let error = $state<string | null>(null);

	// Close modal function
	function closeModal() {
		showModal = false;
		// Reset form after a delay when closing
		setTimeout(() => {
			if (!showModal) {
				name = '';
				email = '';
				message = '';
				submitted = false;
				error = null;
			}
		}, 300);
	}

	// Handle form submission
	function handleSubmit() {
		submitting = true;

		// Validate form
		if (!name || !email || !message) {
			error = 'All fields are required';
			submitting = false;
			return;
		}

		if (!email.includes('@') || !email.includes('.')) {
			error = 'Please enter a valid email address';
			submitting = false;
			return;
		}

		// Simulate form submission
		setTimeout(() => {
			submitting = false;
			submitted = true;
			error = null;

			// In a real implementation, you would send the form data to your server here
			console.log({ name, email, message });
		}, 1500);
	}

	// Close on Escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if showModal}
	<!-- Changed div to button with role dialog overlay -->
	<div
		class="modal-backdrop"
		onclick={closeModal}
		onkeydown={(e) => e.key === 'Enter' && closeModal()}
		transition:fade={{ duration: 200 }}
		aria-label="Close modal"
		role="button"
		tabindex="0"
	>
		<!-- Changed div to section with role dialog -->
		<div
			class="modal-container"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			transition:fly={{ y: 20, duration: 300, easing: quintOut }}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			tabindex="-1"
		>
			<div class="modal-header">
				<h2 id="modal-title">Get in Touch</h2>
				<button class="close-button" onclick={closeModal} aria-label="Close contact form">×</button
				>
			</div>

			{#if !submitted}
				<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
					<div class="form-group">
						<label for="name">Name</label>
						<input
							type="text"
							id="name"
							bind:value={name}
							placeholder="Your name"
							disabled={submitting}
						/>
					</div>

					<div class="form-group">
						<label for="email">Email</label>
						<input
							type="email"
							id="email"
							bind:value={email}
							placeholder="your.email@example.com"
							disabled={submitting}
						/>
					</div>

					<div class="form-group">
						<label for="message">Message</label>
						<textarea
							id="message"
							bind:value={message}
							placeholder="What would you like to discuss?"
							rows="4"
							disabled={submitting}
						></textarea>
					</div>

					{#if error}
						<div class="error-message" role="alert">
							{error}
						</div>
					{/if}

					<button type="submit" class="submit-button" disabled={submitting}>
						{#if submitting}
							<div class="loading-spinner" aria-hidden="true"></div>
							Sending...
						{:else}
							Send Message
						{/if}
					</button>
				</form>
			{:else}
				<div class="success-message">
					<div class="success-icon" aria-hidden="true">✓</div>
					<h3>Message Sent!</h3>
					<p>Thanks for reaching out. I'll get back to you soon.</p>
					<button class="close-modal-button" onclick={closeModal}>Close</button>
				</div>
			{/if}

			<div class="modal-footer">
				<div class="rectangle-line" aria-hidden="true"></div>
				<div class="modal-note">
					<span>Messages are currently logged in browser console</span>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Styles remain the same */
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 20px;
		box-sizing: border-box;
		border: none;
		margin: 0;
		cursor: default;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}

	.modal-container {
		background: #ffffff;
		border: 1px solid #e0e0e0;
		border-radius: 16px;
		width: 100%;
		max-width: 500px;
		overflow: hidden;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
		cursor: auto;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px;
		border-bottom: 1px solid #f0f0f0;
	}

	.modal-header h2 {
		color: #222222;
		font-family: 'Nunito', sans-serif;
		font-size: 32px;
		margin: 0;
		font-weight: 600;
		letter-spacing: 0;
	}

	.close-button {
		background: none;
		border: none;
		color: #666666;
		font-size: 28px;
		cursor: pointer;
		padding: 0;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: all 0.3s;
	}

	.close-button:hover {
		background-color: #f0f0f0;
		color: #222222;
	}

	form {
		padding: 24px;
	}

	.form-group {
		margin-bottom: 20px;
	}

	label {
		display: block;
		color: #222222;
		font-size: 16px;
		margin-bottom: 8px;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
	}

	input,
	textarea {
		width: 100%;
		padding: 14px 16px;
		background: #fcf7f2;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		color: #222222;
		font-family: 'Nunito', sans-serif;
		font-size: 16px;
		box-sizing: border-box;
		transition: all 0.3s;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: #ff611a;
		background: #ffffff;
	}

	input::placeholder,
	textarea::placeholder {
		color: #999999;
	}

	.error-message {
		background: #fef2f2;
		color: #dc2626;
		padding: 12px 16px;
		border-radius: 8px;
		font-size: 14px;
		margin-bottom: 20px;
		border: 1px solid #fecaca;
		font-family: 'Nunito', sans-serif;
	}

	.submit-button {
		background: #ff611a;
		color: white;
		border: none;
		border-radius: 8px;
		padding: 16px 24px;
		font-size: 16px;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.submit-button:hover:not(:disabled) {
		background: #e55517;
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(255, 97, 26, 0.3);
	}

	.submit-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	.loading-spinner {
		width: 18px;
		height: 18px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top: 2px solid white;
		border-radius: 50%;
		margin-right: 10px;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.success-message {
		padding: 30px 24px;
		text-align: center;
	}

	.success-icon {
		width: 60px;
		height: 60px;
		background: #dcfce7;
		border-radius: 50%;
		color: #16a34a;
		font-size: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 20px;
		border: 2px solid #bbf7d0;
	}

	.success-message h3 {
		color: #222222;
		font-size: 28px;
		margin: 0 0 10px;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
	}

	.success-message p {
		color: #666666;
		margin: 0 0 24px;
		font-family: 'Nunito', sans-serif;
		font-size: 16px;
	}

	.close-modal-button {
		background: #f0f0f0;
		color: #222222;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		padding: 12px 24px;
		font-size: 16px;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s;
	}

	.close-modal-button:hover {
		background: #e0e0e0;
		transform: translateY(-1px);
	}

	.modal-footer {
		padding: 16px 24px 24px;
		text-align: center;
		border-top: 1px solid #f0f0f0;
	}

	.rectangle-line {
		width: 50px;
		height: 2px;
		background: #ff611a;
		border-radius: 20px;
		margin: 0 auto 12px;
	}

	.modal-note span {
		color: #999999;
		font-size: 12px;
		font-family: 'Nunito', sans-serif;
	}

	@media (max-width: 600px) {
		.modal-header h2 {
			font-size: 24px;
		}

		.success-message h3 {
			font-size: 20px;
		}
	}
</style>
