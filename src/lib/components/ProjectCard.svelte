<script>
	export let title = '';
	export let description = '';
	export let images = []; // Array of image URLs
	export let imageSrc = ''; // Backward compatibility
	export let readMoreLink = '#';
	export let readMoreText = 'GitHub';

	let currentImageIndex = 0;
	let showModal = false;
	let modalImageIndex = 0;

	// Backward compatibility - if imageSrc is provided, use it as single image
	$: if (typeof imageSrc === 'string' && imageSrc && images.length === 0) {
		images = [imageSrc];
	}

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

<svelte:window on:keydown={handleKeydown} />

<div class="project-card">
	<div class="image-container">
		{#if images.length > 0}
			<img src={images[currentImageIndex]} alt={title} />

			<!-- Carousel navigation -->
			{#if images.length > 1}
				<button class="nav-btn nav-btn-left" on:click={prevImage}>
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
				<button class="nav-btn nav-btn-right" on:click={nextImage}>
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
				<button class="expand-btn" on:click={openModal}>
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
							on:click={() => (currentImageIndex = index)}
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
	<div class="modal-overlay" on:click={closeModal}>
		<div class="modal-content" on:click|stopPropagation>
			<img src={images[modalImageIndex]} alt={title} />

			{#if images.length > 1}
				<button class="modal-nav-btn modal-nav-left" on:click={prevModalImage}>
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
				<button class="modal-nav-btn modal-nav-right" on:click={nextModalImage}>
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

			<button class="modal-close" on:click={closeModal}>
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
							on:click={() => (modalImageIndex = index)}
						></button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

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
		position: relative;
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
		font-weight: 300;
		font-size: 16px;
	}

	.project-title {
		margin: 0 0 16px 0;
		font-weight: 600;
		font-size: 24px;
		color: #222222;
		font-weight: 400;
		/*font-family: 'Poppins', sans-serif;*/
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
</style>
