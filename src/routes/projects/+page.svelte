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
			title="How Do You Say? - Language Model Powered Translation"
			description="AI-powered translation tool built with Svelte and TypeScript, using Cohere's Command-A translation model (released August 28, 2025) and hosted on Cloudflare. Provides accurate translations that preserve meaning and context across multiple languages, with pronunciation guides included. This results in more natural, contextually appropriate translations that sound right in the target language."
			imageSrc="/project-images/how-do-you-say/hdys-dashboard.png"
			images={[
				'/project-images/how-do-you-say/hdys-dashboard.png',
				'/project-images/how-do-you-say/hdys-translation.png',
				'/project-images/how-do-you-say/hdys-failure-mode.png',
				'/project-images/how-do-you-say/hdys-menu.png'
			]}
			repoLink="https://github.com/RSHVR/hdys"
			repoType="GitHub"
			websiteLink="/how-do-you-say"
			websiteText="website"
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
		font-size: 36px;
		font-weight: 600;
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
			font-size: 40px;
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
			font-size: 32px;
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
			font-size: 28px;
		}

		.projects-container {
			gap: 25px;
		}
	}
</style>
