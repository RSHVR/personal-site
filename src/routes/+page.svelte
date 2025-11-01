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
				websiteLink="https://www.capfluence.app"
				websiteText="website"
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
				websiteLink="https://www.highlyte.ai"
				websiteText="website"
			/>
		</div>
	</div>
</div>

<style>
	/* Base styles - mobile first */
	.page-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
		transition:
			padding 0.3s ease,
			transform 0.3s ease;
		position: relative;
	}

	.hero-section-intro {
		width: 100vw;
		min-height: auto;
		margin-left: -20px;
		padding: 20px 20px 40px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}

	.title-container {
		text-align: left;
		margin-left: 0;
		width: 100%;
		max-width: 100%;
		min-height: auto;
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
		padding-top: 0;
		height: 300px;
		width: 100%;
		max-width: 350px;
		flex-shrink: 0;
		order: -1;
	}

	.hero-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 8px;
	}

	.greeting-text {
		font-size: 32px;
		font-weight: 300;
		color: #222222;
		margin-bottom: 16px;
		/*font-family: 'Poppins', sans-serif;*/
	}

	.intro {
		line-height: 1.5;
		font-size: 16px;
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
		margin-left: -20px;
		background: transparent;
		position: relative;
	}

	.hero-section-projects {
		width: 100vw;
		height: auto;
		margin-left: -20px;
		padding: 40px 20px 60px;
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
		margin-bottom: 30px;
	}

	.projects-heading {
		margin: 0;
		font-size: 28px;
		font-weight: 600;
		color: #222222;
	}

	.see-all-link {
		text-decoration: underline;
		color: inherit;
		font-size: 14px;
		margin-right: 0;
	}

	.projects-container {
		display: flex;
		flex-direction: column;
		gap: 30px;
		align-items: center;
		width: 100%;
	}

	/* Responsive breakpoints */

	/* Small mobile (0-480px) - base styles above */
	@media (max-width: 480px) {
		.page-content {
			padding: 0 15px;
		}

		.hero-section-intro {
			margin-left: -15px;
			padding: 15px 15px 30px;
		}

		.hero-section-stack {
			margin-left: -15px;
		}

		.hero-section-projects {
			margin-left: -15px;
			padding: 30px 15px 50px;
		}

		.greeting-text {
			font-size: 28px;
		}

		.intro {
			font-size: 15px;
		}

		.projects-heading {
			font-size: 24px;
		}
	}

	/* Medium mobile/tablet (481-768px) */
	@media (min-width: 481px) and (max-width: 768px) {
		.page-content {
			padding: 0 30px;
		}

		.hero-section-intro {
			margin-left: -30px;
			padding: 30px 30px 50px;
		}

		.hero-section-stack {
			margin-left: -30px;
		}

		.hero-section-projects {
			margin-left: -30px;
			padding: 50px 30px 70px;
		}

		.greeting-text {
			font-size: 36px;
		}

		.intro {
			font-size: 17px;
		}

		.projects-heading {
			font-size: 32px;
		}

		.see-all-link {
			font-size: 15px;
		}
	}

	/* Tablet/small desktop (769-1279px) */
	@media (min-width: 769px) and (max-width: 1279px) {
		.page-content {
			padding: 0 60px;
		}

		.hero-section-intro {
			margin-left: -60px;
			padding: 40px 60px 80px;
			flex-direction: row;
			align-items: flex-start;
		}

		.hero-image {
			width: 320px;
			height: 450px;
			order: 0;
			padding-top: 20px;
		}

		.title-container {
			margin-left: 60px;
			width: auto;
			flex: 1;
		}

		.greeting-text {
			font-size: 42px;
		}

		.intro {
			font-size: 17px;
		}

		.hero-section-stack {
			margin-left: -60px;
		}

		.hero-section-projects {
			margin-left: -60px;
			padding: 55px 60px 85px;
		}

		.projects-heading {
			font-size: 34px;
		}

		.see-all-link {
			font-size: 15px;
			margin-right: 80px;
		}
	}

	/* Large desktop (1280px+) */
	@media (min-width: 1280px) {
		.page-content {
			padding: 0 196px;
		}

		.hero-section-intro {
			height: 70vh;
			margin-left: -196px;
			padding: 0px 196px 172px 196px;
			flex-direction: row;
			align-items: flex-start;
		}

		.hero-image {
			width: 400px;
			height: 550px;
			order: 0;
			padding-top: 35px;
		}

		.hero-image img {
			border-radius: 0;
		}

		.title-container {
			margin-left: 90px;
			width: 934px;
			height: 650px;
		}

		.greeting-text {
			font-size: 48px;
		}

		.intro {
			font-size: 18px;
		}

		.hero-section-stack {
			margin-left: -196px;
		}

		.hero-section-projects {
			margin-left: -196px;
			padding: 60px 196px 100px 196px;
		}

		.projects-heading {
			font-size: 36px;
		}

		.projects-container {
			gap: 55px;
		}

		.see-all-link {
			font-size: 16px;
			margin-right: 150px;
		}
	}
</style>
