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
			description: 'RAG-enabled AI chatbot widget with Claude Agent SDK streaming, Cohere Embed v4 + Rerank v2, liquid glass UI, video backgrounds, and Supabase persistence. Drop it into any website.',
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
			title: 'Tsuji - AI Translation Tool',
			description: 'AI-powered translation tool with Cohere Command-A. Supports 23 languages with pronunciation guides, literal translations, cultural explanations, and formal/informal modes. Traditional Japanese-inspired UI.',
			imageSrc: '/project-images/tsuji/tsuji-01-japanese-translation.png',
			images: [
				'/project-images/tsuji/tsuji-01-japanese-translation.png',
				'/project-images/tsuji/tsuji-02-italian-translation.png',
				'/project-images/tsuji/tsuji-03-hindi-translation.png',
				'/project-images/tsuji/tsuji-04-blank.png'
			],
			actionButtons: [
				{ type: 'github', url: 'https://github.com/RSHVR/tsuji', label: 'GitHub' },
				{ type: 'website', url: '/tsuji', label: 'Demo' }
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
		},
		{
			title: 'Pettiness Meter',
			description: 'A fun Claude Artifact that measures the pettiness level of any situation or statement. Built as an interactive web tool using Claude\'s artifact capabilities.',
			imageSrc: '/project-images/pettiness-meter/pettiness-meter-01-main.png',
			images: [
				'/project-images/pettiness-meter/pettiness-meter-01-main.png',
				'/project-images/pettiness-meter/pettiness-meter-02-input.png',
				'/project-images/pettiness-meter/pettiness-meter-02-output.png'
			],
			actionButtons: [{ type: 'website', url: '/pettiness-meter', label: 'Demo' }]
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
		padding: 40px 0 60px;
		box-sizing: border-box;
	}

	.projects-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: 1041px;
		margin: 0 auto 30px;
		padding: 0 20px;
		box-sizing: border-box;
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
			padding: 30px 0 50px;
		}

		.projects-header {
			padding: 0 15px;
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

	/* Tablet (481-1200px) - vertical stacking */
	@media (min-width: 481px) and (max-width: 1200px) {
		.page-content {
			padding: 0 50px;
		}

		.hero-section-intro {
			margin-left: -50px;
			padding: 40px 50px 60px;
		}

		.hero-section-stack {
			margin-left: -50px;
		}

		.hero-section-projects {
			margin-left: -50px;
			padding: 50px 0 70px;
		}

		.projects-header {
			padding: 0 50px;
		}

		.greeting-text {
			font-size: 26px;
		}

		.intro {
			font-size: 17px;
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
			height: 500px;
			min-height: 350px;
			order: 0;
			padding-top: 35px;
		}

		.title-container {
			margin-left: 90px;
			width: 934px;
			padding-top: 35px;
		}

		.greeting-text {
			font-size: 32px;
		}

		.intro {
			font-size: 17px;
		}

		.hero-section-stack {
			margin-left: -196px;
		}

		.hero-section-projects {
			margin-left: -196px;
			padding: 60px 0 100px;
		}

		.projects-header {
			padding: 0 196px;
		}

		.projects-heading {
			font-size: 28px;
		}

		.see-all-link {
			font-size: 16px;
		}
	}
</style>
