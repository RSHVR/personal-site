<script>
	import ProjectCard from './ProjectCard.svelte';

	let {
		projects = [],
		direction = 'left',
		speed = 'normal',
		pauseOnHover = true
	} = $props();

	// Duplicate projects for seamless infinite scroll
	const duplicatedProjects = [...projects, ...projects];

	// Speed mapping
	const speedMap = {
		slow: '60s',
		normal: '40s',
		fast: '25s'
	};

	const animationDuration = speedMap[speed] || speedMap.normal;
	const animationDirection = direction === 'right' ? 'reverse' : 'normal';
</script>

<div class="carousel-container">
	<div
		class="carousel-track"
		class:pause-on-hover={pauseOnHover}
		style="--animation-duration: {animationDuration}; --animation-direction: {animationDirection};"
	>
		{#each duplicatedProjects as project, index}
			<div class="carousel-item">
				<ProjectCard
					title={project.title}
					description={project.description}
					imageSrc={project.imageSrc}
					images={project.images}
					actionButtons={project.actionButtons}
					repoLink={project.repoLink}
					repoType={project.repoType}
					websiteLink={project.websiteLink}
					websiteText={project.websiteText}
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	.carousel-container {
		width: 100%;
		overflow: hidden;
		position: relative;
		mask-image: linear-gradient(
			to right,
			transparent,
			black 5%,
			black 95%,
			transparent
		);
		-webkit-mask-image: linear-gradient(
			to right,
			transparent,
			black 5%,
			black 95%,
			transparent
		);
	}

	.carousel-track {
		display: flex;
		gap: 24px;
		animation: scroll var(--animation-duration, 40s) linear infinite;
		animation-direction: var(--animation-direction, normal);
		width: fit-content;
	}

	.carousel-track.pause-on-hover:hover {
		animation-play-state: paused;
	}

	.carousel-item {
		flex-shrink: 0;
		width: 350px;
	}

	/* Force compact card layout - override responsive styles */
	.carousel-item :global(.project-card) {
		flex-direction: column !important;
		width: 350px !important;
		height: auto !important;
		min-height: 480px;
		padding: 16px !important;
		gap: 16px !important;
	}

	.carousel-item :global(.image-container) {
		width: 100% !important;
		height: 200px !important;
	}

	.carousel-item :global(.text-container) {
		width: 100% !important;
		height: auto !important;
		min-height: 220px;
		padding-bottom: 50px !important;
	}

	.carousel-item :global(.project-title) {
		font-size: 20px !important;
		margin-bottom: 12px !important;
	}

	.carousel-item :global(.project-description) {
		font-size: 14px !important;
		line-height: 1.4 !important;
		max-height: 140px !important;
		overflow: hidden !important;
	}

	/* Force icon-only buttons */
	.carousel-item :global(.action-buttons) {
		left: 50% !important;
		right: auto !important;
		transform: translateX(-50%) !important;
		gap: 10px !important;
	}

	.carousel-item :global(.btn) {
		width: 36px !important;
		height: 36px !important;
		padding: 8px !important;
	}

	.carousel-item :global(.btn-text) {
		display: none !important;
	}

	.carousel-item :global(.btn-icon) {
		width: 20px !important;
		height: 20px !important;
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	/* Responsive adjustments */
	@media (max-width: 480px) {
		.carousel-item {
			width: 300px;
		}

		.carousel-item :global(.project-card) {
			width: 300px !important;
		}

		.carousel-track {
			gap: 16px;
		}
	}
</style>
