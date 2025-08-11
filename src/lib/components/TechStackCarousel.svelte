<script>
	// Array of tech stack items - you can add your actual tech images here
	const techStack = [
		'docker.png',
		'figma.png',
		'github.png',
		'miro.png',
		'mongodb.png',
		'neo4j.png',
		'nginx.png',
		'nodejs.png',
		'postgresql.png',
		'python.png',
		'r.jpg',
		'tensorflow.png',
		'typescript.png'
	];

	// Create multiple duplicates for seamless infinite scroll
	const duplicatedStack = [...techStack, ...techStack, ...techStack];

	// Track which images failed to load
	let failedImages = /** @type {Record<string, boolean>} */ ({});
</script>

<div class="carousel-container">
	<div class="carousel-track">
		{#each duplicatedStack as tech, index}
			<div class="carousel-item">
				{#if failedImages[`${tech}-${index}`]}
					<div class="fallback-text">
						{tech.replace(/\.(svg|png|jpg)$/, '').toUpperCase()}
					</div>
				{:else}
					<img
						src="/tech-icons/{tech}"
						alt={tech.replace(/\.(svg|png|jpg)$/, '')}
						on:error={() => {
							failedImages[`${tech}-${index}`] = true;
							failedImages = failedImages; // Trigger reactivity
						}}
					/>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.carousel-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
	}

	.carousel-track {
		display: flex;
		animation: scroll 45s linear infinite;
		height: 100%;
		align-items: center;
		width: calc(64px * 39); /* 39 items (13 * 3) * (24px width + 40px margin) */
	}

	.carousel-item {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		margin: 0 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.carousel-item img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		filter: grayscale(100%);
		opacity: 0.7;
		transition: all 0.3s ease;
	}

	.carousel-item:hover img {
		filter: grayscale(0%);
		opacity: 1;
		transform: scale(1.1);
	}

	.fallback-text {
		font-size: 14px;
		font-weight: 600;
		color: #666;
		text-align: center;
		background: #e0e0e0;
		padding: 10px;
		border-radius: 8px;
		width: 100%;
		height: 60px;
		display: none;
		align-items: center;
		justify-content: center;
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-33.333%);
		}
	}
</style>
