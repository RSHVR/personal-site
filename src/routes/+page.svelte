<script>
	import RobotMessage from '$lib/components/RobotMessage.svelte';
</script>

<div class="page-content">
	<div class="title-container">
		<h1 class="site-under-construction">
			<span class="siteunderconstruction_span">Site Under Construction</span>
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
		transition: padding 0.3s ease; /* Smooth transition for padding changes */
	}

	.title-container {
		text-align: center;
		margin-bottom: 60px;
		padding-top: 30px;
		transition:
			margin-bottom 0.3s ease,
			padding-top 0.3s ease; /* Smooth transitions */
	}

	.site-under-construction {
		margin: 0;
	}

	.siteunderconstruction_span {
		color: #a3a3a3;
		font-size: min(96px, 16vw);
		font-family: 'Jersey 10', sans-serif;
		font-weight: 400;
		letter-spacing: 2px;
		line-height: 1.2;
		transition: font-size 0.3s ease; /* This won't actually apply since we're using min() */
	}

	.robot-content {
		flex: 1;
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		margin-top: 20px;
		transition: margin-top 0.3s ease; /* Smooth transition for margin changes */
	}

	/* Extra Small Mobile (320px - 480px) */
	@media (max-width: 480px) {
		.page-content {
			padding: 15px;
		}

		.title-container {
			margin-bottom: 40px;
			padding-top: 20px;
		}
	}

	/* Small Mobile landscape (481px - 600px) */
	@media (min-width: 481px) and (max-width: 600px) {
		.title-container {
			margin-bottom: 45px;
			padding-top: 25px;
		}
	}

	/* Small Tablets portrait (601px - 768px) */
	@media (min-width: 601px) and (max-width: 768px) {
		.title-container {
			margin-bottom: 50px;
		}
	}

	/* For very short height screens */
	@media (max-height: 600px) {
		.title-container {
			margin-bottom: 30px;
			padding-top: 15px;
		}

		.page-content {
			padding: 10px;
		}
	}
</style>
