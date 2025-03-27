<script>
	import RobotMessage from '$lib/components/RobotMessage.svelte';
</script>

<div class="page-content">
	<div class="title-container">
		<h1 class="site-title">
			<span class="site-title-text">Site Under Construction</span>
		</h1>
	</div>

	<div class="robot-content">
		<RobotMessage message="I'm working on it" />
	</div>
</div>

<style>
	/* Base styles */
	.page-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		transition:
			padding 0.3s ease,
			transform 0.3s ease;
		position: relative;
	}

	.title-container {
		text-align: center;
		margin-bottom: 60px;
		padding-top: 30px;
		transition:
			margin-bottom 0.3s ease,
			padding-top 0.3s ease;
	}

	.site-title {
		margin: 0;
		padding: 0 20px; /* Add horizontal padding to prevent awkward wrapping */
	}

	.site-title-text {
		color: #a3a3a3;
		font-size: min(96px, 16vw); /* Base size */
		font-family: 'Jersey 10', sans-serif;
		font-weight: 400;
		letter-spacing: 2px;
		line-height: 1.2;
		display: inline-block;
		transition: all 0.3s ease;
	}

	.robot-content {
		flex: 1;
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		margin-top: 20px;
		transition: margin-top 0.3s ease;
	}

	/* Extra small (0-480px) */
	@media (max-width: 480px) {
		.page-content {
			padding: 15px;
		}

		.title-container {
			margin-bottom: 30px;
			padding-top: 15px;
		}

		.site-title {
			padding: 0 10px;
		}

		.site-title-text {
			font-size: min(60px, 13vw);
			letter-spacing: 1px;
		}
	}

	/* Small (481-768px) */
	@media (min-width: 481px) and (max-width: 768px) {
		.page-content {
			padding: 18px;
			transform: translateY(-3%);
		}

		.title-container {
			margin-bottom: 30px;
			padding-top: 15px;
		}

		.site-title-text {
			font-size: min(70px, 13vw);
			letter-spacing: 1.2px;
		}
	}

	/* Medium (769-1279px) */
	@media (min-width: 769px) and (max-width: 1279px) {
		.title-container {
			margin-bottom: 40px;
		}

		.page-content {
			transform: translateY(-4%);
		}

		.site-title-text {
			font-size: min(80px, 14vw);
			letter-spacing: 1.5px;
		}
	}

	/* Large (1280px+) */
	@media (min-width: 1280px) {
		.title-container {
			margin-bottom: 60px;
		}

		.site-title-text {
			font-size: min(96px, 16vw);
			letter-spacing: 2px;
		}
	}
</style>
