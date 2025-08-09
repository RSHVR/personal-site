<script>
	export let title = '';
	export let description = '';
	export let imageSrc = '';
	export let readMoreLink = '#';
</script>

<div class="project-card">
	<div class="image-container">
		<img src={imageSrc} alt={title} />
	</div>
	<div class="text-container">
		<h3 class="project-title">{title}</h3>
		<p class="project-description">{description}</p>
		<div class="read-more-section">
			<svg class="arrow" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M32 1L39 8L32 15M39 8H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			<a href={readMoreLink} class="read-more">Read More</a>
		</div>
	</div>
</div>

<style>
	.project-card {
		width: 1041px; /* 1157 * 0.9 */
		height: 365px; /* 405 * 0.9 */
		border-radius: 15px;
		padding: 24px; /* 27 * 0.9 */
		box-sizing: border-box;
		display: flex;
		gap: 20px; /* 22 * 0.9 */
		align-items: flex-start;
		background: #ffffff;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.image-container {
		width: 417px; /* 463 * 0.9 */
		height: 326px; /* 362 * 0.9 */
		border-radius: 15px;
		overflow: hidden;
		flex-shrink: 0;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.text-container {
		width: 561px; /* 623 * 0.9 */
		height: 327px; /* 363 * 0.9 */
		display: flex;
		flex-direction: column;
		text-align: left;
		position: relative;
	}

	.project-title {
		margin: 0 0 16px 0;
		font-weight: 600;
		font-size: 24px;
		color: #222222;
	}

	.project-description {
		margin: 0;
		flex: 1;
		line-height: 1.5;
		color: #666666;
		font-size: 16px;
	}

	.read-more-section {
		position: absolute;
		bottom: 0;
		right: 0;
		display: flex;
		align-items: center;
		gap: 19px; /* 21 * 0.9 */
	}

	.arrow {
		width: 36px; /* 40 * 0.9 */
		height: 14px; /* 16 * 0.9 */
		color: #222222;
	}

	.read-more {
		text-decoration: none;
		color: #222222;
		font-weight: 500;
		font-size: 16px;
		transition: color 0.3s ease;
	}

	.read-more:hover {
		color: #666666;
	}

	.read-more-section:hover .arrow {
		color: #666666;
		transform: translateX(4px);
		transition: all 0.3s ease;
	}
</style>