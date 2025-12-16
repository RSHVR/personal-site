<script>
	import RobotMessage from '$lib/components/RobotMessage.svelte';
	import TechStackCarousel from '$lib/components/TechStackCarousel.svelte';
	import InfiniteProjectCarousel from '$lib/components/InfiniteProjectCarousel.svelte';

	const projects = [
		{
			title: 'Ruh - AI Product Safety Analyzer',
			description: 'AI-powered product safety analyzer for Amazon. Instantly detects harmful substances, allergens, PFAS compounds, and toxic chemicals with 0-100 harm scores. Features smart caching and detailed breakdowns with scientific citations.',
			imageSrc: 'https://youtu.be/sbAvW0giNwM',
			images: [
				'/project-images/ruh/ruh-1-main.png',
				'/project-images/ruh/ruh-2-privacy.png',
				'/project-images/ruh/ruh-3-loading.png',
				'/project-images/ruh/ruh-4-score.png',
				'/project-images/ruh/ruh-5-analysis.png',
				'https://youtu.be/sbAvW0giNwM'
			],
			actionButtons: [
				{ type: 'github', url: 'https://github.com/RSHVR/ruh', label: 'GitHub' },
				{ type: 'chromestore', url: 'https://chromewebstore.google.com/detail/ruh/mjgicecpbfabjaebiaioaijelbepihcl', label: 'Chrome' },
				{ type: 'devpost', url: 'https://devpost.com/software/ruh', label: 'Devpost' }
			]
		},
		{
			title: 'Lekhi - Embeddable Chatbot Widget',
			description: 'Embeddable AI chatbot widget with dual-mode deployment (container or floating popup), real-time streaming via Claude Agent SDK, glassmorphic UI, live video backgrounds, and Supabase-powered chat persistence.',
			imageSrc: '/project-images/lekhi/lekhi-container-mode.png',
			images: [
				'/project-images/lekhi/lekhi-container-mode.png',
				'/project-images/lekhi/lekhi-popup-mode.png'
			],
			actionButtons: [
				{ type: 'github', url: 'https://github.com/RSHVR/embeddable-chatbot', label: 'GitHub' },
				{ type: 'website', url: '/contact', label: 'Demo' }
			]
		},
		{
			title: 'Capfluence - Leads Generation & Enrichment',
			description: 'AI-powered lead discovery platform that saves financial advisors 100+ hours monthly through automated prospect identification and data-driven insights. Built with modern ML techniques and scalable architecture.',
			imageSrc: '/project-images/capfluence/capfluence-dashboard.png',
			images: [
				'/project-images/capfluence/capfluence-dashboard.png',
				'/project-images/capfluence/capfluence-prospects.png',
				'/project-images/capfluence/capfluence-leads.png',
				'/project-images/capfluence/capfluence-insights.png'
			],
			websiteLink: 'https://www.capfluence.app',
			websiteText: 'website'
		},
		{
			title: 'Highlyte - Compliance & Risk Management',
			description: 'Computer vision and NLP models that automated compliance verification across all 50 US states and Instagram, processing thousands of marketing materials and eliminating manual review bottlenecks for cannabis industry clients.',
			imageSrc: '/project-images/highlyte/highlyte-dashboard-1.png',
			images: [
				'/project-images/highlyte/highlyte-dashboard-1.png',
				'/project-images/highlyte/highlyte-dashboard-2.png',
				'/project-images/highlyte/highlyte-insights-1.png',
				'/project-images/highlyte/highlyte-insights-2.png'
			],
			websiteLink: 'https://www.highlyte.ai',
			websiteText: 'website'
		}
	];
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
				I turn complex AI challenges into revenue-generating systems that deliver measurable
				business impact. Companies work with me when they need ML/AI solutions that solve real
				problems, not just proof of concepts.
				<br /><br />

				Currently working on <a
					class="previous-workplace"
					href="https://www.capfluence.app"
					target="_blank"
					rel="noopener noreferrer">Capfluence</a
				>, an AI-powered lead discovery platform that saves financial advisors 100+ hours monthly
				through automated prospect identification and data-driven insights. Previously at <a
					class="previous-workplace"
					href="https://www.highlyte.ai"
					target="_blank"
					rel="noopener noreferrer">Highlyte</a
				>, I architected computer vision and NLP models that automated compliance verification for
				cannabis brands across all 50 US states, processing thousands of marketing materials and
				eliminating manual review bottlenecks.
				<br /><br />

				I care about impact you can measure. My approach: start with the business outcome,
				architect backwards to the solution. Every system I build answers one question: what
				outcome does this enable? If the answer isn't clear, the solution isn't ready.
			</p>
		</div>
	</div>

	<div class="hero-section-stack">
		<TechStackCarousel />
	</div>

	<div class="hero-section-projects">
		<div class="projects-header">
			<h1 class="projects-heading">Featured Projects</h1>
			<a href="/projects" class="see-all-link">see all</a>
		</div>
		<div class="projects-carousel-wrapper">
			<InfiniteProjectCarousel {projects} speed="slow" />
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
		font-size: 22px;
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
		max-width: 1041px;
		margin-bottom: 30px;
	}

	.projects-heading {
		margin: 0;
		font-size: 20px;
		font-weight: 400;
		color: #222222;
	}

	.see-all-link {
		text-decoration: underline;
		color: inherit;
		font-size: 14px;
		margin-right: 0;
	}

	.projects-carousel-wrapper {
		width: 100vw;
		margin-left: calc(-50vw + 50%);
		overflow: hidden;
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
			font-size: 22px;
		}

		.intro {
			font-size: 15px;
		}

		.projects-heading {
			font-size: 20px;
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
			font-size: 24px;
		}

		.intro {
			font-size: 17px;
		}

		.projects-heading {
			font-size: 22px;
		}

		.see-all-link {
			font-size: 15px;
		}
	}

	/* Tablet/small desktop (769-1200px) */
	@media (min-width: 769px) and (max-width: 1200px) {
		.page-content {
			padding: 0 100px;
		}

		.hero-section-intro {
			margin-left: -100px;
			padding: 40px 100px 80px;
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
			padding-top: 20px;
		}

		.greeting-text {
			font-size: 26px;
		}

		.intro {
			font-size: 17px;
		}

		.hero-section-stack {
			margin-left: -100px;
		}

		.hero-section-projects {
			margin-left: -100px;
			padding: 55px 100px 85px;
		}

		.projects-heading {
			font-size: 24px;
		}

		.see-all-link {
			font-size: 15px;
		}
	}

	/* Large desktop (1201px+) */
	@media (min-width: 1201px) {
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

		.title-container {
			margin-left: 90px;
			width: 934px;
			height: 650px;
			padding-top: 35px;
		}

		.greeting-text {
			font-size: 32px;
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
			font-size: 28px;
		}

		.see-all-link {
			font-size: 16px;
		}
	}
</style>
