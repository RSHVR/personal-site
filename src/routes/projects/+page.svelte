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
		<p class="projects-subtitle">
			A collection of AI/ML solutions and enterprise applications I've built
		</p>
	</div>

	<div class="projects-container">
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
			readMoreLink="https://capfluence.app"
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

<style>
	.projects-page {
		width: 100%;
		min-height: 100vh;
		padding: 60px 196px 100px 196px;
		box-sizing: border-box;
		background: #fcf7f2;
	}

	.projects-header {
		margin-bottom: 60px;
		text-align: center;
	}

	.projects-header h1 {
		margin: 0 0 20px 0;
		font-size: 48px;
		font-weight: 600;
		color: #222222;
		font-family: 'Nunito', sans-serif;
	}

	.projects-subtitle {
		margin: 0;
		font-size: 18px;
		color: #666666;
		font-family: 'Nunito', sans-serif;
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.5;
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
