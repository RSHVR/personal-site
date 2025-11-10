<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let countdown = $state(5);

	onMount(() => {
		const timer = setInterval(() => {
			countdown--;
			if (countdown === 0) {
				clearInterval(timer);
				goto('/');
			}
		}, 1000);

		return () => clearInterval(timer);
	});
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
	</div>

	<div class="actions">
		<a href="/" class="home-button">Return to Homepage</a>
		<p class="redirect-message">Redirecting in {countdown} seconds...</p>
	</div>
</div>

<style>
	.error-container {
		width: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #fcf7f2;
		padding: 1rem;
		box-sizing: border-box;
		position: relative;
	}

	.error-code {
		margin-bottom: 0.25rem;
		text-align: center;
	}

	.error-code-text {
		font-size: 6rem;
		font-family: 'Jersey 10', sans-serif;
		color: #ff611a;
		text-shadow: 0 2px 4px rgba(255, 97, 26, 0.2);
	}

	.error-message {
		text-align: center;
		margin-bottom: 0.5rem;
	}

	.error-message h1 {
		font-family: 'Jersey 10', sans-serif;
		color: #333;
		font-size: 2.5rem;
		margin-bottom: 0.25rem;
	}

	.error-message p {
		font-family: 'Nunito', sans-serif;
		color: #666;
		font-size: 1.25rem;
		max-width: 500px;
		margin: 0 auto;
		line-height: 1.5;
	}

	.robot-container {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 1rem 0;
	}

	.robot-image {
		width: auto;
		height: 280px;
		object-fit: contain;
		transform: translateX(10px);
	}

	.actions {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.home-button {
		display: inline-block;
		background: #ff611a;
		color: #fff;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		text-decoration: none;
		padding: 0.75rem 1.5rem;
		border-radius: 50px;
		border: none;
		transition: all 0.3s ease;
		box-shadow: 0 2px 8px rgba(255, 97, 26, 0.2);
	}

	.home-button:hover {
		background: #e55517;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 97, 26, 0.3);
	}

	.redirect-message {
		font-family: 'Nunito', sans-serif;
		color: #666;
		font-size: 0.9rem;
		text-align: center;
		margin: 0;
	}

	/* Extra small (0-480px) */
	@media (max-width: 480px) {
		.error-container {
			padding: 0.75rem;
		}

		.error-code {
			margin-bottom: 0.25rem;
		}

		.error-code-text {
			font-size: 3rem;
		}

		.error-message {
			margin-bottom: 0.5rem;
		}

		.error-message h1 {
			font-size: 1.5rem;
			margin-bottom: 0.25rem;
		}

		.error-message p {
			font-size: 0.9rem;
			max-width: 100%;
		}

		.robot-container {
			margin: 0.5rem 0;
		}

		.robot-image {
			height: 140px;
		}

		.actions {
			margin-top: 0.5rem;
			gap: 0.5rem;
		}

		.home-button {
			padding: 0.6rem 1.2rem;
			font-size: 0.9rem;
		}

		.redirect-message {
			font-size: 0.8rem;
		}
	}

	/* Small (481-768px) */
	@media (min-width: 481px) and (max-width: 768px) {
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

	/* Medium (769-1279px) */
	@media (min-width: 769px) and (max-width: 1279px) {
		.error-code-text {
			font-size: 5rem;
		}

		.error-message h1 {
			font-size: 2.25rem;
		}

		.error-message p {
			font-size: 1.15rem;
		}

		.robot-image {
			height: 220px;
		}
	}

	/* Height-based media queries for short screens */
	@media (max-height: 700px) {
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

	@media (max-height: 600px) {
		.error-container {
			padding: 0.5rem;
		}

		.error-code {
			margin-bottom: 0.25rem;
		}

		.error-code-text {
			font-size: 3rem;
		}

		.error-message {
			margin-bottom: 0.5rem;
		}

		.error-message h1 {
			font-size: 1.5rem;
			margin-bottom: 0.25rem;
		}

		.error-message p {
			font-size: 0.9rem;
		}

		.robot-container {
			margin: 0.5rem 0;
		}

		.robot-image {
			height: 130px;
		}

		.actions {
			margin-top: 0.5rem;
			gap: 0.5rem;
		}

		.home-button {
			padding: 0.5rem 1rem;
			font-size: 0.85rem;
		}

		.redirect-message {
			font-size: 0.75rem;
		}
	}

	/* Combined small width and short height */
	@media (max-width: 480px) and (max-height: 700px) {
		.error-code-text {
			font-size: 2.5rem;
		}

		.error-message h1 {
			font-size: 1.25rem;
		}

		.error-message p {
			font-size: 0.85rem;
		}

		.robot-image {
			height: 110px;
		}
	}
</style>
