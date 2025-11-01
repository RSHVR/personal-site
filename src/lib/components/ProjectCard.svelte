<script>
	let {
		title = '',
		description = '',
		images = [],
		imageSrc = '',
		readMoreLink = '#',
		readMoreText = 'GitHub'
	} = $props();

	let currentImageIndex = $state(0);
	let showModal = $state(false);
	let modalImageIndex = $state(0);

	// Backward compatibility - if imageSrc is provided, use it as single image
	$effect(() => {
		if (typeof imageSrc === 'string' && imageSrc && images.length === 0) {
			images = [imageSrc];
		}
	});

	function nextImage() {
		currentImageIndex = (currentImageIndex + 1) % images.length;
	}

	function prevImage() {
		currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
	}

	function openModal() {
		modalImageIndex = currentImageIndex;
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	function nextModalImage() {
		modalImageIndex = (modalImageIndex + 1) % images.length;
	}

	function prevModalImage() {
		modalImageIndex = (modalImageIndex - 1 + images.length) % images.length;
	}

	function handleKeydown(event) {
		if (!showModal) return;

		if (event.key === 'Escape') {
			closeModal();
		} else if (event.key === 'ArrowRight') {
			nextModalImage();
		} else if (event.key === 'ArrowLeft') {
			prevModalImage();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="project-card">
	<div class="image-container">
		{#if images.length > 0}
			<img src={images[currentImageIndex]} alt={title} />

			<!-- Carousel navigation -->
			{#if images.length > 1}
				<button class="nav-btn nav-btn-left" onclick={prevImage}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path
							d="M15 18L9 12L15 6"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<button class="nav-btn nav-btn-right" onclick={nextImage}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path
							d="M9 18L15 12L9 6"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>

				<!-- Expand button -->
				<button class="expand-btn" onclick={openModal}>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
						<path
							d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>

				<!-- Image indicators -->
				<div class="image-indicators">
					{#each images as _, index}
						<button
							class="indicator"
							class:active={index === currentImageIndex}
							onclick={() => (currentImageIndex = index)}
						></button>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
	<div class="text-container">
		<h3 class="project-title">{title}</h3>
		<p class="project-description">{description}</p>
		<div class="read-more-section">
			<svg class="arrow" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M32 1L39 8L32 15M39 8H1"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<a href={readMoreLink} target="_blank" rel="noopener noreferrer" class="read-more"
				>{readMoreText}</a
			>
		</div>
	</div>
</div>

<!-- Modal -->
{#if showModal}
	<div class="modal-overlay" onclick={closeModal}>
		<div class="modal-content" onclick={(e) => e.stopPropagation()}>
			<img src={images[modalImageIndex]} alt={title} />

			{#if images.length > 1}
				<button class="modal-nav-btn modal-nav-left" onclick={prevModalImage}>
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
						<path
							d="M15 18L9 12L15 6"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<button class="modal-nav-btn modal-nav-right" onclick={nextModalImage}>
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
						<path
							d="M9 18L15 12L9 6"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			{/if}

			<button class="modal-close" onclick={closeModal}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path
						d="M18 6L6 18M6 6L18 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<!-- Modal indicators -->
			{#if images.length > 1}
				<div class="modal-indicators">
					{#each images as _, index}
						<button
							class="modal-indicator"
							class:active={index === modalImageIndex}
							onclick={() => (modalImageIndex = index)}
						></button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* Base styles - mobile first */
	.project-card {
		width: 100%;
		max-width: 1041px;
		min-height: auto;
		border-radius: 15px;
		padding: 20px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: stretch;
		background: #ffffff;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	.image-container {
		width: 100%;
		height: 250px;
		border-radius: 15px;
		overflow: hidden;
		flex-shrink: 0;
		position: relative;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.text-container {
		width: 100%;
		min-height: 200px;
		display: flex;
		flex-direction: column;
		text-align: left;
		position: relative;
		font-weight: 300;
		font-size: 16px;
		padding-bottom: 50px;
		overflow: hidden;
		box-sizing: border-box;
	}

	.project-title {
		margin: 0 0 16px 0;
		font-weight: 600;
		font-size: 24px;
		color: #222222;
		font-weight: 400;
		word-wrap: break-word;
		overflow-wrap: break-word;
		hyphens: auto;
		max-width: 100%;
		/*font-family: 'Poppins', sans-serif;*/
	}

	.project-description {
		margin: 0;
		margin-bottom: 40px;
		padding-right: 120px;
		flex: 1 1 auto;
		line-height: 1.5;
		color: #666666;
		font-size: 16px;
		word-wrap: break-word;
		overflow-wrap: break-word;
		hyphens: auto;
		max-width: 100%;
		overflow: hidden;
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

	/* Carousel navigation buttons */
	.nav-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 2;
		transition: all 0.3s ease;
		color: #222222;
	}

	.nav-btn:hover {
		background: rgba(255, 255, 255, 1);
		transform: translateY(-50%) scale(1.1);
	}

	.nav-btn-left {
		left: 10px;
	}

	.nav-btn-right {
		right: 10px;
	}

	/* Expand button */
	.expand-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		background: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 4px;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 3;
		transition: all 0.3s ease;
		color: #222222;
	}

	.expand-btn:hover {
		background: rgba(255, 255, 255, 1);
		transform: scale(1.1);
	}

	/* Image indicators */
	.image-indicators {
		position: absolute;
		bottom: 15px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 8px;
		z-index: 2;
	}

	.indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.6);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.indicator.active {
		background: rgba(255, 255, 255, 1);
		transform: scale(1.2);
	}

	.indicator:hover {
		background: rgba(255, 255, 255, 0.9);
	}

	/* Modal styles */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 20px;
	}

	.modal-content {
		position: relative;
		max-width: 85vw;
		max-height: 85vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-content img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		border-radius: 8px;
	}

	/* Modal navigation buttons */
	.modal-nav-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 50%;
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 1001;
		transition: all 0.3s ease;
		color: #222222;
	}

	.modal-nav-btn:hover {
		background: rgba(255, 255, 255, 1);
		transform: translateY(-50%) scale(1.1);
	}

	.modal-nav-left {
		left: -80px;
	}

	.modal-nav-right {
		right: -80px;
	}

	/* Modal close button */
	.modal-close {
		position: absolute;
		top: -50px;
		right: 0;
		background: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 1001;
		transition: all 0.3s ease;
		color: #222222;
	}

	.modal-close:hover {
		background: rgba(255, 255, 255, 1);
		transform: scale(1.1);
	}

	/* Modal indicators */
	.modal-indicators {
		position: absolute;
		bottom: -50px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 12px;
		z-index: 1001;
	}

	.modal-indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.6);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.modal-indicator.active {
		background: rgba(255, 255, 255, 1);
		transform: scale(1.2);
	}

	.modal-indicator:hover {
		background: rgba(255, 255, 255, 0.9);
	}

	/* Responsive breakpoints */

	/* Small mobile (0-480px) */
	@media (max-width: 480px) {
		.project-card {
			padding: 15px;
			gap: 15px;
		}

		.image-container {
			height: 200px;
		}

		.text-container {
			padding-bottom: 45px;
		}

		.project-title {
			font-size: 20px;
			margin-bottom: 12px;
		}

		.project-description {
			font-size: 14px;
			line-height: 1.4;
			margin-bottom: 35px;
			padding-right: 100px;
		}

		.read-more-section {
			gap: 12px;
		}

		.arrow {
			width: 28px;
			height: 12px;
		}

		.read-more {
			font-size: 14px;
		}

		.nav-btn {
			width: 32px;
			height: 32px;
		}

		.expand-btn {
			width: 28px;
			height: 28px;
		}
	}

	/* Medium mobile/tablet (481-768px) */
	@media (min-width: 481px) and (max-width: 768px) {
		.project-card {
			padding: 18px;
		}

		.image-container {
			height: 280px;
		}

		.text-container {
			padding-bottom: 48px;
		}

		.project-title {
			font-size: 22px;
		}

		.project-description {
			font-size: 15px;
			margin-bottom: 38px;
			padding-right: 110px;
		}
	}

	/* Tablet/small desktop (769-1279px) */
	@media (min-width: 769px) and (max-width: 1279px) {
		.project-card {
			flex-direction: row;
			padding: 22px;
			height: 320px;
		}

		.image-container {
			width: 380px;
			height: 100%;
			flex-shrink: 0;
		}

		.text-container {
			width: auto;
			flex: 1;
			min-width: 0;
			height: 100%;
			padding-bottom: 40px;
		}

		.project-description {
			margin-bottom: 0;
			padding-right: 140px;
		}
	}

	/* Large desktop (1280px+) */
	@media (min-width: 1280px) {
		.project-card {
			flex-direction: row;
			padding: 24px;
			height: 365px;
		}

		.image-container {
			width: 417px;
			height: 326px;
			flex-shrink: 0;
		}

		.text-container {
			width: 561px;
			max-width: 561px;
			min-width: 0;
			height: 327px;
			padding-bottom: 40px;
		}

		.project-description {
			margin-bottom: 0;
			padding-right: 150px;
		}
	}

	/* Modal responsive adjustments */
	@media (max-width: 768px) {
		.modal-nav-left {
			left: 10px;
		}

		.modal-nav-right {
			right: 10px;
		}

		.modal-nav-btn {
			width: 40px;
			height: 40px;
		}

		.modal-close {
			top: 10px;
			right: 10px;
		}

		.modal-indicators {
			bottom: 10px;
		}
	}
</style>
