<script>
	import RobotMessage from '$lib/components/RobotMessage.svelte';
	import TechStackCarousel from '$lib/components/TechStackCarousel.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<div class="page-content">
	<div class="hero-section-intro">
		<div class="hero-image">
			<img src="/profile-image.png" alt="profile picture" />
		</div>
		<div class="title-container">
			<h1 class="greeting">
				<span class="greeting-text">Hello, Veer here</span>
			</h1>
			<p class="intro">
				I am a product-focused ML/AI Engineer with proven track record of building enterprise AI
				solutions that deliver measurable business impact. Currently building <a
					class="previous-workplace"
					href="https://www.capfluence.app"
					target="_blank"
					rel="noopener noreferrer">Capfluence</a
				>, an AI-powered lead discovery platform that saves financial advisors 100+ hours monthly
				through automated prospect identification and data-driven insights.
				<br /><br />

				At
				<a
					class="previous-workplace"
					href="https://www.highlyte.ai"
					target="_blank"
					rel="noopener noreferrer">Highlyte</a
				>, I architected and deployed computer vision and NLP models that automated compliance
				verification for cannabis industry clients across all 50 US states and Instagram, processing
				thousands of marketing materials and eliminating manual review bottlenecks.
				<br /><br />

				I excel at the intersection of technology and business strategy, translating complex
				technical capabilities into user-centric products that solve real problems. My analytical
				approach allows me to architect scalable solutions that align technical innovation with
				business objectives.
			</p>
		</div>
	</div>

	<div class="hero-section-stack">
		<TechStackCarousel />
	</div>

	<div class="hero-section-projects">
		<div class="projects-header">
			<h1 class="projects-heading">Recent Projects</h1>
			<a href="/projects" class="see-all-link">see all</a>
		</div>
		<div class="projects-container">
			<ProjectCard
				title="Capfluence - Leads Generation & Enrichment"
				description="AI-powered lead discovery platform that saves financial advisors 100+ hours monthly through automated prospect identification and data-driven insights. Built with modern ML techniques and scalable architecture."
				imageSrc="/project-images/capfluence/capfluence-dashboard.png"
				images={[
					'/project-images/capfluence/capfluence-dashboard.png',
					'/project-images/capfluence/capfluence-prospects.png',
					'/project-images/capfluence/capfluence-leads.png',
					'/project-images/capfluence/capfluence-insights.png'
				]}
				readMoreLink="https://www.capfluence.app"
				readMoreText="website"
			/>
			<ProjectCard
				title="Highlyte - Compliance & Risk Management"
				description="Computer vision and NLP models that automated compliance verification across all 50 US states and Instagram, processing thousands of marketing materials and eliminating manual review bottlenecks for cannabis industry clients."
				imageSrc="/project-images/highlyte/highlyte-dashboard-1.png"
				images={[
					'/project-images/highlyte/highlyte-dashboard-1.png',
					'/project-images/highlyte/highlyte-dashboard-2.png',
					'/project-images/highlyte/highlyte-insights-1.png',
					'/project-images/highlyte/highlyte-insights-2.png'
				]}
				readMoreLink="https://www.highlyte.ai"
				readMoreText="website"
			/>
		</div>
	</div>
</div>

<style>
	/* Base styles */
	.page-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		padding: 0 196px;
		box-sizing: border-box;
		transition:
			padding 0.3s ease,
			transform 0.3s ease;
		position: relative;
	}

	.hero-section-intro {
		width: 100vw;
		height: 70vh;
		margin-left: -196px;
		padding: 0px 196px 172px 196px;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}

	.title-container {
		text-align: left;
		margin-left: 90px;
		width: 934px;
		height: 650px;
		padding-top: 0px;
		transition:
			margin-bottom 0.3s ease,
			padding-top 0.3s ease;
		align-items: flex-start;
	}

	.site-title {
		margin: 0;
		padding: 0 20px; /* Add horizontal padding to prevent awkward wrapping */
		max-width: 767px; /* Force wrap at 768px by making container 1px smaller */
		margin-left: auto;
		margin-right: auto;
	}

	.site-title-text {
		color: #a3a3a3;
		font-size: min(96px, 16vw); /* Base size that scales down */
		font-family: 'Jersey 10', sans-serif;
		font-weight: 400;
		letter-spacing: 2px;
		line-height: 1.2;
		display: inline-block;
		transition: all 0.3s ease;
		/* Note: white-space: nowrap is applied in larger screens in media query */
	}

	.hero-image {
		padding-top: 35px;
		height: 550px;
		width: 400px;
		flex-shrink: 0;
	}

	.hero-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.greeting-text {
		font-size: 48px;
		font-weight: 300;
		color: #222222;
		margin-bottom: 16px;
		/*font-family: 'Poppins', sans-serif;*/
	}

	.intro {
		line-height: 1.5;
		font-size: 18px;
		font-weight: 200;
	}

	.previous-workplace {
		text-decoration: none;
		color: inherit;
		border-bottom: none;
		background-image: linear-gradient(
			to right,
			currentColor 0%,
			currentColor 60%,
			transparent 60%,
			transparent 100%
		);
		background-size: 8.1px 1.5px;
		background-repeat: repeat-x;
		background-position: bottom;
	}

	.stack {
		display: flex;
		justify-content: space-between;
		gap: 40px;
		margin-top: 40px;
	}

	.stack-category h3 {
		margin: 0 0 10px 0;
		font-weight: 600;
	}

	.stack-category ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.stack-category li {
		margin-bottom: 5px;
	}

	.hero-section-stack {
		width: 100vw;
		height: 200px;
		margin-left: -196px;
		background: transparent;
		position: relative;
	}

	.hero-section-projects {
		width: 100vw;
		height: auto;
		margin-left: -196px;
		padding: 60px 196px 100px 196px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.projects-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-bottom: 50px;
	}

	.projects-heading {
		margin: 0;
		font-size: 36px;
		font-weight: 600;
		color: #222222;
	}

	.see-all-link {
		text-decoration: underline;
		color: inherit;
		font-size: 16px;
		margin-right: 150px;
	}

	.projects-container {
		display: flex;
		flex-direction: column;
		gap: 55px;
		align-items: center;
		width: 100%;
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
			font-size: min(80px, 14vw);
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
			white-space: nowrap; /* Prevent text from wrapping */
		}
	}

	/* Large (1280px+) */
	@media (min-width: 1280px) {
		.title-container {
			margin-bottom: 60px;
		}

		.site-title {
			max-width: none; /* Remove max-width to prevent wrapping */
		}

		.site-title-text {
			font-size: min(120px, 16vw); /* Larger max font size */
			letter-spacing: 2px;
			white-space: nowrap; /* Prevent text from wrapping */
		}
	}
</style>
