<script>
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	export let showModal = false;

	// Form data
	let name = '';
	let email = '';
	let message = '';
	let submitting = false;
	let submitted = false;
	let error = null;

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
	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if showModal}
	<div class="modal-backdrop" on:click={closeModal} transition:fade={{ duration: 200 }}>
		<div
			class="modal-container"
			on:click|stopPropagation={() => {}}
			transition:fly={{ y: 20, duration: 300, easing: quintOut }}
		>
			<div class="modal-header">
				<h2>Get in Touch</h2>
				<button class="close-button" on:click={closeModal}>×</button>
			</div>

			{#if !submitted}
				<form on:submit|preventDefault={handleSubmit}>
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
						<div class="error-message">
							{error}
						</div>
					{/if}

					<button type="submit" class="submit-button" disabled={submitting}>
						{#if submitting}
							<div class="loading-spinner"></div>
							Sending...
						{:else}
							Send Message
						{/if}
					</button>
				</form>
			{:else}
				<div class="success-message">
					<div class="success-icon">✓</div>
					<h3>Message Sent!</h3>
					<p>Thanks for reaching out. I'll get back to you soon.</p>
					<button class="close-modal-button" on:click={closeModal}>Close</button>
				</div>
			{/if}

			<div class="modal-footer">
				<div class="rectangle-line"></div>
				<div class="modal-note">
					<span>Messages are currently logged in browser console</span>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
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
	}

	.modal-container {
		background: #1a1a1b;
		border: 1px solid #2a2a2a;
		border-radius: 8px;
		width: 100%;
		max-width: 500px;
		overflow: hidden;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		border-bottom: 1px solid #2a2a2a;
	}

	.modal-header h2 {
		color: #a3a3a3;
		font-family: 'Jersey 10', sans-serif;
		font-size: 28px;
		margin: 0;
		font-weight: 400;
		letter-spacing: 1px;
	}

	.close-button {
		background: none;
		border: none;
		color: #a3a3a3;
		font-size: 28px;
		cursor: pointer;
		padding: 0;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background-color 0.3s;
	}

	.close-button:hover {
		background-color: rgba(255, 97, 26, 0.1);
		color: rgba(255, 97, 26, 0.9);
	}

	form {
		padding: 20px;
	}

	.form-group {
		margin-bottom: 20px;
	}

	label {
		display: block;
		color: #a3a3a3;
		font-size: 14px;
		margin-bottom: 8px;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
	}

	input,
	textarea {
		width: 100%;
		padding: 12px;
		background: #131314;
		border: 1px solid #2a2a2a;
		border-radius: 6px;
		color: #a3a3a3;
		font-family: 'Nunito', sans-serif;
		font-size: 16px;
		box-sizing: border-box;
		transition: border-color 0.3s;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: rgba(255, 97, 26, 0.7);
	}

	input::placeholder,
	textarea::placeholder {
		color: #3a3a3a;
	}

	.error-message {
		background: rgba(201, 19, 19, 0.1);
		color: #c91313;
		padding: 10px;
		border-radius: 4px;
		font-size: 14px;
		margin-bottom: 20px;
		border: 1px solid rgba(201, 19, 19, 0.3);
	}

	.submit-button {
		background: rgba(255, 97, 26, 0.15);
		color: rgba(255, 97, 26, 0.9);
		border: 1px solid rgba(255, 97, 26, 0.3);
		border-radius: 50px;
		padding: 12px 24px;
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
		background: rgba(255, 97, 26, 0.25);
		transform: translateY(-2px);
	}

	.submit-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.loading-spinner {
		width: 18px;
		height: 18px;
		border: 2px solid rgba(255, 97, 26, 0.3);
		border-top: 2px solid rgba(255, 97, 26, 0.9);
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
		padding: 30px 20px;
		text-align: center;
	}

	.success-icon {
		width: 60px;
		height: 60px;
		background: rgba(39, 174, 96, 0.1);
		border-radius: 50%;
		color: #27ae60;
		font-size: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 20px;
		border: 1px solid rgba(39, 174, 96, 0.3);
	}

	.success-message h3 {
		color: #a3a3a3;
		font-size: 24px;
		margin: 0 0 10px;
		font-family: 'Jersey 10', sans-serif;
		font-weight: 400;
	}

	.success-message p {
		color: #a3a3a3;
		margin: 0 0 20px;
		font-family: 'Nunito', sans-serif;
	}

	.close-modal-button {
		background: rgba(255, 97, 26, 0.15);
		color: rgba(255, 97, 26, 0.9);
		border: 1px solid rgba(255, 97, 26, 0.3);
		border-radius: 50px;
		padding: 12px 24px;
		font-size: 16px;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s;
	}

	.close-modal-button:hover {
		background: rgba(255, 97, 26, 0.25);
		transform: translateY(-2px);
	}

	.modal-footer {
		padding: 10px 20px 20px;
		text-align: center;
	}

	.rectangle-line {
		width: 50px;
		height: 2px;
		background: rgba(255, 97, 26, 0.7);
		border-radius: 20px;
		margin: 0 auto 10px;
	}

	.modal-note span {
		color: #2a2a2a;
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
