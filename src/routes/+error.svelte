<script>
	import { page } from '$app/stores';
</script>

<div class="error-container">
	<div class="error-code">
		<span class="error-code-text">{$page.status}</span>
	</div>

	<div class="error-message">
		{#if $page.status === 404}
			<h1>Oops! Page not found</h1>
			<p>Looks like this path is still under construction or doesn't exist yet.</p>
		{:else}
			<h1>Something went wrong</h1>
			<p>We've encountered an unexpected error. Please try again later.</p>
		{/if}
	</div>

	<div class="robot-container">
		<img src="/robot_oops.png" alt="Robot looking confused" class="robot-image" />
		<div class="message-container">
			<div class="message-bubble">
				<div class="message-text">
					{#if $page.status === 404}
						<span
							>I can't seem to find that page in my circuits! Let me guide you back to safety.</span
						>
					{:else}
						<span>My circuits are a bit overloaded. Let's try a different approach.</span>
					{/if}
				</div>
			</div>
			<div class="message-pointer"></div>
		</div>
	</div>

	<div class="actions">
		<a href="/" class="home-button">Return to Homepage</a>
	</div>
</div>

<style>
	.error-container {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #131314;
		padding: 2rem;
		box-sizing: border-box;
		position: relative;
	}

	.error-code {
		margin-bottom: 1rem;
	}

	.error-code-text {
		font-size: 6rem;
		font-family: 'Jersey 10', sans-serif;
		color: rgba(255, 97, 26, 0.7);
		text-shadow: 0 0 10px rgba(255, 97, 26, 0.3);
	}

	.error-message {
		text-align: center;
		margin-bottom: 2rem;
	}

	.error-message h1 {
		font-family: 'Jersey 10', sans-serif;
		color: #a3a3a3;
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.error-message p {
		font-family: 'Nunito', sans-serif;
		color: #a3a3a3;
		font-size: 1.25rem;
		max-width: 500px;
		margin: 0 auto;
		line-height: 1.5;
	}

	.robot-container {
		display: flex;
		align-items: center;
		position: relative;
		margin: 2rem 0;
	}

	.robot-image {
		width: auto;
		height: 280px;
		object-fit: contain;
	}

	.message-container {
		position: absolute;
		top: -40px;
		right: -280px;
		width: 250px;
	}

	.message-bubble {
		background: #1e1f20;
		border-radius: 8px;
		padding: 1rem;
	}

	.message-text span {
		color: #a3a3a3;
		font-size: 1rem;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		line-height: 1.5;
	}

	.message-pointer {
		width: 15px;
		height: 15px;
		background: #1e1f20;
		position: absolute;
		bottom: -8px;
		left: 15px;
		clip-path: polygon(0 0, 100% 0, 50% 100%);
	}

	.actions {
		margin-top: 2rem;
	}

	.home-button {
		display: inline-block;
		background: rgba(255, 97, 26, 0.15);
		color: rgba(255, 97, 26, 0.7);
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		text-decoration: none;
		padding: 0.75rem 1.5rem;
		border-radius: 50px;
		border: 1px solid rgba(255, 97, 26, 0.3);
		transition: all 0.3s ease;
	}

	.home-button:hover {
		background: rgba(255, 97, 26, 0.25);
		transform: translateY(-2px);
	}

	@media (max-width: 1200px) {
		.message-container {
			position: relative;
			top: 0;
			right: 0;
			margin-left: 1rem;
		}

		.robot-container {
			flex-direction: column;
		}

		.message-pointer {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.error-code-text {
			font-size: 4rem;
		}

		.error-message h1 {
			font-size: 2rem;
		}

		.error-message p {
			font-size: 1rem;
		}

		.robot-image {
			height: 180px;
		}
	}
</style>
