<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<svelte:head>
	<title>Arshveer Gahir</title>
	<meta
		name="description"
		content="Explore Arshveer Gahir's portfolio of AI/ML projects and enterprise solutions"
	/>
</svelte:head>

<div class="projects-page">
	<div class="projects-header">
		<h1>Projects</h1>
	</div>

	<div class="projects-container">
		<ProjectCard
			title="Ruh - AI Product Safety Analyzer"
			description="AI-powered product safety analyzer for Amazon. Instantly detects harmful substances, allergens, PFAS compounds, and toxic chemicals with 0-100 harm scores. Features smart caching and detailed breakdowns with scientific citations. Built with Svelte 5, TypeScript, Claude Sonnet 4.5, and deployed on Google Cloud Run."
			imageSrc="https://youtu.be/sbAvW0giNwM"
			images={[
				'/project-images/ruh/ruh-1-main.png',
				'/project-images/ruh/ruh-2-privacy.png',
				'/project-images/ruh/ruh-3-loading.png',
				'/project-images/ruh/ruh-4-score.png',
				'/project-images/ruh/ruh-5-analysis.png',
				'https://youtu.be/sbAvW0giNwM'
			]}
			actionButtons={[
				{ type: 'github', url: 'https://github.com/RSHVR/ruh', label: 'GitHub' },
				{ type: 'chromestore', url: 'https://chromewebstore.google.com/detail/ruh/mjgicecpbfabjaebiaioaijelbepihcl', label: 'Chrome' },
				{ type: 'devpost', url: 'https://devpost.com/software/ruh', label: 'Devpost' }
			]}
		/>

		<ProjectCard
			title="Pettiness Meter"
			description="A fun Claude Artifact that measures the pettiness level of any situation or statement. Built as an interactive web tool using Claude's artifact capabilities."
			imageSrc="/project-images/pettiness-meter/pettiness-meter-01-main.png"
			images={[
				'/project-images/pettiness-meter/pettiness-meter-01-main.png',
				'/project-images/pettiness-meter/pettiness-meter-02-input.png',
				'/project-images/pettiness-meter/pettiness-meter-02-output.png'
			]}
			actionButtons={[{ type: 'website', url: '/pettiness-meter', label: 'Demo' }]}
		/>

		<ProjectCard
			title="Lekhi - Embeddable Chatbot Widget"
			description="RAG-enabled AI chatbot you can drop into any website. Features Claude Agent SDK streaming, Cohere Embed v4 + Rerank v2 for smart retrieval, liquid glass UI, video backgrounds, and Supabase persistence. Built with Svelte 5, TypeScript for edge runtimes. Roadmap: Ollama support, messaging tools, calendar booking."
			imageSrc="/project-images/lekhi/lekhi-container-mode.png"
			images={[
				'/project-images/lekhi/lekhi-container-mode.png',
				'/project-images/lekhi/lekhi-popup-mode.png'
			]}
			actionButtons={[
				{ type: 'github', url: 'https://github.com/RSHVR/embeddable-chatbot', label: 'GitHub' },
				{ type: 'website', url: '/contact', label: 'Demo' }
			]}
		/>

		<ProjectCard
			title="Simple Time Tracker"
			description="Lightweight time tracking Chrome extension with real-time earnings calculation and break time tracking. Features pause/resume functionality, editable timer names, and session persistence. All data stored locally for privacy - no backend required. Designed with minimalist UI/UX inspired by Dieter Rams principles."
			imageSrc="/project-images/simple-time-tracker/simple_time_tracker_timer.png"
			images={[
				'/project-images/simple-time-tracker/simple_time_tracker_timer.png',
				'/project-images/simple-time-tracker/simple_time_tracker_summary.png',
				'/project-images/simple-time-tracker/simple_time_tracker_settings.png'
			]}
			actionButtons={[
				{ type: 'chromestore', url: 'https://chromewebstore.google.com/detail/onjafojammohedeppldnglheinjnjekm', label: 'Chrome' }
			]}
		/>

		<ProjectCard
			title="Tsuji - AI Translation Tool"
			description="AI-powered translation tool with voice input (Groq Whisper), text-to-speech (ElevenLabs), and live interpreter mode for real-time voice translation. Supports 23 languages with multiple modes: pronunciation guides, literal word-for-word, cultural explanations, and formal/informal registers. Built with Svelte 5, TypeScript, and Cohere Command-A. Available as an embeddable npm package."
			imageSrc="/project-images/tsuji/tsuji-01-japanese-translation.png"
			images={[
				'/project-images/tsuji/tsuji-01-japanese-translation.png',
				'/project-images/tsuji/tsuji-02-italian-translation.png',
				'/project-images/tsuji/tsuji-03-hindi-translation.png',
				'/project-images/tsuji/tsuji-04-blank.png'
			]}
			actionButtons={[
				{ type: 'github', url: 'https://github.com/RSHVR/tsuji', label: 'GitHub' },
				{ type: 'website', url: '/tsuji', label: 'Demo' }
			]}
		/>

		<ProjectCard
			title="Capfluence - Leads Generation & Enrichment"
			description="AI-powered lead discovery platform that saves financial advisors 100+ hours monthly through automated prospect identification and data-driven insights. Built with modern ML techniques, scalable cloud architecture, and real-time data processing capabilities."
			imageSrc="/project-images/capfluence/capfluence-dashboard.png"
			images={[
				'/project-images/capfluence/capfluence-dashboard.png',
				'/project-images/capfluence/capfluence-prospects.png',
				'/project-images/capfluence/capfluence-leads.png',
				'/project-images/capfluence/capfluence-insights.png'
			]}
			websiteLink="https://capfluence.app"
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

<style>
	.projects-page {
		width: 100%;
		min-height: 100vh;
		padding: 40px 196px 100px 196px;
		box-sizing: border-box;
		background: #fcf7f2;
	}

	.projects-header {
		margin-bottom: 60px;
		text-align: flex-start;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
		padding-bottom: 20px;
		border-bottom: 1px solid #e0e0e0;
	}

	.projects-header h1 {
		margin: 0 0 20px 0;
		font-size: 28px;
		font-weight: 400;
		color: #222222;
		font-family: 'Nunito', sans-serif;
	}

	.projects-container {
		display: flex;
		flex-direction: column;
		gap: 40px;
		align-items: center;
	}

	/* Responsive design */
	@media (max-width: 1200px) {
		.projects-page {
			padding: 40px 100px 80px 100px;
		}

		.projects-header h1 {
			font-size: 28px;
		}
	}

	@media (max-width: 768px) {
		.projects-page {
			padding: 30px 20px 60px 20px;
		}

		.projects-header {
			margin-bottom: 40px;
		}

		.projects-header h1 {
			font-size: 22px;
		}

		.projects-subtitle {
			font-size: 16px;
		}

		.projects-container {
			gap: 30px;
		}
	}

	@media (max-width: 480px) {
		.projects-page {
			padding: 20px 15px 40px 15px;
		}

		.projects-header h1 {
			font-size: 20px;
		}

		.projects-container {
			gap: 25px;
		}
	}
</style>
