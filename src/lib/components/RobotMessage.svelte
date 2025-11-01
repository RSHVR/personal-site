<script>
	import StatusIndicator from './StatusIndicator.svelte';
	let { message = "I'm working on it" } = $props();
</script>

<div class="robot-container">
	<div class="robot-message-group">
		<img src="/robot.png" alt="Robot" class="robot-image" />
		<div class="message-container">
			<div class="message-bubble">
				<div class="message-text">
					<span>{message}</span>
				</div>
			</div>
			<div class="message-pointer"></div>
		</div>
	</div>

	<div class="status-wrapper">
		<StatusIndicator status="OFFLINE" />
	</div>
</div>

<style>
	/* Base styles - will apply to all screen sizes */
	.robot-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 320px;
		margin: 0 auto;
		padding-bottom: 20px; /* Add padding to prevent overlap with footer */
	}

	.robot-message-group {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.robot-image {
		width: auto;
		height: 280px; /* Desktop default */
		object-fit: contain;
		position: relative;
		transition: height 0.3s ease; /* Smooth transition for size changes */
	}

	.message-container {
		position: absolute;
		top: -30px;
		right: -80px;
		transition:
			top 0.3s ease,
			right 0.3s ease; /* Smooth transition for position changes */
	}

	.message-bubble {
		min-width: fit-content;
		height: 47px;
		background: #1e1f20;
		border-radius: 8px;
		display: flex;
		align-items: center;
		padding: 0 20px;
		white-space: nowrap;
		transition:
			height 0.3s ease,
			padding 0.3s ease; /* Smooth transition for size changes */
	}

	.message-text span {
		color: #a3a3a3;
		font-size: 20px;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		white-space: nowrap;
		transition: font-size 0.3s ease; /* Smooth transition for font size changes */
	}

	.message-pointer {
		width: 13px;
		height: 13px;
		background: #1e1f20;
		position: absolute;
		bottom: -13px;
		left: 13px;
		clip-path: polygon(0 0, 100% 0, 50% 100%);
	}

	.status-wrapper {
		margin-top: 20px;
		transition: margin-top 0.3s ease;
	}

	/* Extra small (0-480px) */
	@media (max-width: 480px) {
		.robot-container {
			max-width: 250px;
			padding-bottom: 15px;
			transform: scale(0.85);
		}

		.robot-image {
			height: 180px;
		}

		.message-container {
			top: -20px;
			right: -50px;
		}

		.message-bubble {
			height: 35px;
			padding: 0 12px;
		}

		.message-text span {
			font-size: 14px;
		}

		.status-wrapper {
			margin-top: 12px;
		}
	}

	/* Small (481-768px) */
	@media (min-width: 481px) and (max-width: 768px) {
		.robot-container {
			max-width: 290px;
			padding-bottom: 15px;
			position: relative;
			top: -8px;
			transform: scale(0.88);
		}

		.robot-image {
			height: 210px;
		}

		.message-container {
			top: -25px;
			right: -65px;
		}

		.message-bubble {
			height: 38px;
			padding: 0 15px;
		}

		.message-text span {
			font-size: 16px;
		}

		.status-wrapper {
			margin-top: 15px;
		}
	}

	/* Medium (769-1279px) */
	@media (min-width: 769px) and (max-width: 1279px) {
		.robot-container {
			max-width: 300px;
			padding-bottom: 20px;
			position: relative;
			top: -15px;
			transform: scale(0.92);
		}

		.robot-image {
			height: 230px;
		}

		.message-container {
			top: -28px;
			right: -70px;
		}

		.message-bubble {
			height: 42px;
			padding: 0 17px;
		}

		.message-text span {
			font-size: 17px;
		}

		.status-wrapper {
			margin-top: 15px;
		}
	}

	/* Large (1280px+) */
	@media (min-width: 1280px) {
		.robot-container {
			max-width: 320px;
		}

		.robot-image {
			height: 280px;
		}

		.message-container {
			right: -80px;
		}

		.message-text span {
			font-size: 20px;
		}
	}

	/* For very short height screens */
	@media (max-height: 600px) {
		.robot-container {
			padding-bottom: 10px;
		}

		.robot-image {
			height: 160px;
		}

		.status-wrapper {
			margin-top: 10px;
		}
	}
</style>
