<script>
	let {
		title = '',
		description = '',
		images = [],
		imageSrc = '',
		repoLink = '',
		repoType = 'GitHub', // 'GitHub' or 'HuggingFace'
		websiteLink = '',
		websiteText = 'website', // 'website' or 'app'
		actionButtons = [] // Array of button objects: { type, url, label }
	} = $props();

	// Portal action to teleport modal to body (avoids carousel transform issues)
	function portal(node) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.remove();
			}
		};
	}

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

	// Get button icon SVG based on type
	function getButtonIcon(type) {
		const icons = {
			github: '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>',
			huggingface: '<path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>',
			website: '<circle cx="12" cy="12" r="10" stroke-width="2"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke-width="2"/>',
			app: '<rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/><path d="M9 9h6v6H9z" stroke-width="2"/>',
			chromestore: '<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 4.894c1.737 1.737 2.65 4.013 2.65 6.106H15.85c0-2.12-.87-4.065-2.294-5.488l4.338-4.338c.533.533 1.013 1.107 1.45 1.72zm-6.738 10.95c-2.12 0-4.064-.87-5.488-2.294l4.338-4.338c.533.533 1.107 1.013 1.72 1.45v4.338c-.527.15-1.067.23-1.62.23zm-5.7-4.157c0-2.12.87-4.064 2.294-5.488l4.338 4.338c-.533.533-1.013 1.107-1.45 1.72H4.456c-.15-.527-.23-1.067-.23-1.62zm10.388-5.7c.527.15 1.067.23 1.62.23 2.12 0 4.064.87 5.488 2.294l-4.338 4.338c-.533-.533-1.107-1.013-1.72-1.45V5.987z" fill="currentColor"/>',
			devpost: '<path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c0-2.502-1.216-3.853-3.767-3.853H10.112z" fill="currentColor"/>',
			youtube: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>'
		};
		return icons[type] || '';
	}

	// Get button class based on type
	function getButtonClass(type) {
		if (type === 'github' || type === 'huggingface') return 'btn-tertiary';
		return 'btn-secondary';
	}

	// Determine if icon should have stroke or fill
	function isStrokeIcon(type) {
		return type === 'website' || type === 'app';
	}

	// Check if a URL is a YouTube video
	function isYouTubeUrl(url) {
		return url?.includes('youtube.com') || url?.includes('youtu.be');
	}

	// Extract YouTube video ID from URL
	function getYouTubeVideoId(url) {
		if (!url) return null;
		// Handle youtu.be format
		if (url.includes('youtu.be/')) {
			return url.split('youtu.be/')[1]?.split('?')[0];
		}
		// Handle youtube.com format
		const match = url.match(/[?&]v=([^&]+)/);
		return match ? match[1] : null;
	}

	// Build action buttons array from both old props and new actionButtons prop
	$effect(() => {
		// For backward compatibility, if actionButtons is empty but old props are set, use them
		if (actionButtons.length === 0) {
			const buttons = [];
			if (repoLink) {
				buttons.push({
					type: repoType.toLowerCase(),
					url: repoLink,
					label: repoType
				});
			}
			if (websiteLink) {
				buttons.push({
					type: websiteText,
					url: websiteLink,
					label: websiteText
				});
			}
			if (buttons.length > 0) {
				actionButtons = buttons;
			}
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="project-card">
	<div class="image-container">
		{#if images.length > 0}
			{#if isYouTubeUrl(images[currentImageIndex])}
				<iframe
					src="https://www.youtube.com/embed/{getYouTubeVideoId(images[currentImageIndex])}"
					title={title}
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					class="youtube-embed"
				></iframe>
			{:else}
				<img src={images[currentImageIndex]} alt={title} />
			{/if}

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
		<div class="action-buttons">
			{#each actionButtons as button}
				<a href={button.url} target="_blank" rel="noopener noreferrer" class="btn {getButtonClass(button.type)}">
					{#if isStrokeIcon(button.type)}
						<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							{@html getButtonIcon(button.type)}
						</svg>
					{:else}
						<svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
							{@html getButtonIcon(button.type)}
						</svg>
					{/if}
					<span class="btn-text">{button.label}</span>
				</a>
			{/each}
		</div>
	</div>
</div>

<!-- Modal - using portal action to render outside carousel transform -->
{#if showModal}
	<div class="modal-overlay" onclick={closeModal} use:portal>
		<div class="modal-content" onclick={(e) => e.stopPropagation()}>
			{#if isYouTubeUrl(images[modalImageIndex])}
				<iframe
					src="https://www.youtube.com/embed/{getYouTubeVideoId(images[modalImageIndex])}"
					title={title}
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					class="modal-youtube-embed"
				></iframe>
			{:else}
				<img src={images[modalImageIndex]} alt={title} />
			{/if}

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
		aspect-ratio: 16/10;
		border-radius: 15px;
		overflow: hidden;
		flex-shrink: 0;
		position: relative;
	}

	.image-container img,
	.youtube-embed {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.youtube-embed {
		border: none;
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
		margin-bottom: 50px;
		flex: 1 1 auto;
		line-height: 1.5;
		color: #666666;
		font-size: 16px;
		word-wrap: break-word;
		overflow-wrap: break-word;
		hyphens: auto;
		max-width: 100%;
		overflow-y: auto;
		max-height: 200px;
	}

	/* Action Buttons */
	.action-buttons {
		position: absolute;
		bottom: 0;
		right: 0;
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 8px 16px;
		border-radius: 8px;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		font-size: 14px;
		text-decoration: none;
		transition: all 0.3s ease;
		width: 110px;
		height: 32px;
		box-sizing: border-box;
	}

	.btn-icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}

	.btn-text {
		display: inline;
	}

	.btn-secondary {
		background: transparent;
		color: #ff611a;
		border: 2px solid #ff611a;
	}

	.btn-secondary:hover {
		background: rgba(255, 97, 26, 0.1);
		transform: translateY(-1px);
	}

	.btn-tertiary {
		background: transparent;
		color: #ff611a;
		border: none;
		text-decoration: underline;
	}

	.btn-tertiary:hover {
		text-decoration: none;
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
		max-width: 50vw;
		max-height: 50vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-content img,
	.modal-youtube-embed {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		border-radius: 8px;
	}

	.modal-youtube-embed {
		border: none;
		width: 50vw;
		height: 28vw; /* 16:9 aspect ratio */
		max-height: 50vh;
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
			margin-bottom: 45px;
		}

		/* Mobile: Icon-only buttons, centered */
		.action-buttons {
			left: 50%;
			right: auto;
			transform: translateX(-50%);
			gap: 10px;
		}

		.btn {
			width: 36px;
			height: 36px;
			padding: 8px;
			font-size: 14px;
		}

		.btn-text {
			display: none;
		}

		.btn-icon {
			width: 20px;
			height: 20px;
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

		.text-container {
			padding-bottom: 48px;
		}

		.project-title {
			font-size: 22px;
		}

		.project-description {
			font-size: 15px;
			margin-bottom: 48px;
		}

		/* Tablet: Icon-only buttons, centered */
		.action-buttons {
			left: 50%;
			right: auto;
			transform: translateX(-50%);
		}

		.btn {
			width: 40px;
			height: 40px;
			padding: 10px;
		}

		.btn-text {
			display: none;
		}

		.btn-icon {
			width: 20px;
			height: 20px;
		}
	}

	/* Tablet/small desktop (860-1279px) */
	@media (min-width: 860px) and (max-width: 1279px) {
		.project-card {
			flex-direction: row;
			padding: 22px;
			height: 320px;
		}

		.image-container {
			width: 380px;
			height: 100%;
			aspect-ratio: 16/10;
		}

		.text-container {
			width: auto;
			flex: 1;
			min-width: 0;
			height: 100%;
			padding-bottom: 50px;
		}

		.project-description {
			margin-bottom: 0;
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
			aspect-ratio: 16/10;
		}

		.text-container {
			width: 561px;
			max-width: 561px;
			min-width: 0;
			height: 327px;
			padding-bottom: 50px;
		}

		.project-description {
			margin-bottom: 0;
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
