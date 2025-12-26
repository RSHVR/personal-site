<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { fade, fly, scale } from 'svelte/transition';
	import { quintOut, cubicOut, cubicInOut } from 'svelte/easing';

	let headerScrolled = $state(false);
	let currentSlide = $state(0);
	let slideDirection = $state('next');
	let hasTriggeredPopup = $state(false);

	const screenshots = [
		{
			type: 'image',
			src: '/project-images/ruh/ruh-1-main.png',
			alt: 'ruh Chrome extension main interface',
			caption: 'Your product safety companion on every Amazon page.'
		},
		{
			type: 'image',
			src: '/project-images/ruh/ruh-2-privacy.png',
			alt: 'ruh privacy screen protecting sensitive ingredient data',
			caption: 'Your data stays yours. Privacy-first ingredient analysis.'
		},
		{
			type: 'image',
			src: '/project-images/ruh/ruh-3-loading.png',
			alt: 'ruh loading screen analyzing product ingredients',
			caption: 'Analyzing in real-time. Results in seconds, not hours.'
		},
		{
			type: 'image',
			src: '/project-images/ruh/ruh-4-score.png',
			alt: 'ruh harm score interface showing product safety rating',
			caption: 'Your harm score, instantly. 0-100 scale with clear risk levels.'
		},
		{
			type: 'image',
			src: '/project-images/ruh/ruh-5-analysis.png',
			alt: 'ruh detailed ingredient analysis breakdown',
			caption: 'Every ingredient, explained. Scientific backing without the jargon.'
		},
		{
			type: 'video',
			src: 'https://www.youtube.com/embed/sbAvW0giNwM',
			alt: 'ruh demo video',
			caption: 'Watch ruh analyze products in real-time.'
		}
	];

	const features = [
		{
			icon: '⚡',
			title: 'Real-Time Analysis',
			description: 'Instant safety assessment while browsing Amazon. No copy-paste needed.'
		},
		{
			icon: '🥜',
			title: 'Allergen Detection',
			description: 'Automatically flags 8 major allergens with severity levels.'
		},
		{
			icon: '🧪',
			title: 'PFAS Screening',
			description: 'Detects forever chemicals linked to long-term health issues.'
		},
		{
			icon: '📊',
			title: '0-100 Harm Score',
			description: 'Clear safety rating with color-coded risk levels. No guesswork.'
		},
		{
			icon: '💾',
			title: 'Smart Caching',
			description: '30-day result storage means lightning-fast repeat views.'
		},
		{
			icon: '📖',
			title: 'Detailed Breakdowns',
			description: 'Scientific citations and toxicity explanations in plain language.'
		}
	];

	// Programmatically trigger Tally popup
	function triggerWaitlistPopup() {
		if (!browser || hasTriggeredPopup) return;

		// Find the hidden trigger button and click it
		const triggerButton = document.getElementById('tally-auto-trigger');
		if (triggerButton) {
			triggerButton.click();
			hasTriggeredPopup = true;
		}
	}

	onMount(() => {
		if (!browser) return;

		// Handle scroll for header effect
		function handleScroll() {
			headerScrolled = window.scrollY > 100;

			// Auto-popup trigger: 60% scroll
			if (!hasTriggeredPopup) {
				const scrollPercent =
					(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

				if (scrollPercent >= 60) {
					const alreadySeen = localStorage.getItem('ruh-waitlist-seen');
					if (!alreadySeen) {
						triggerWaitlistPopup();
						localStorage.setItem('ruh-waitlist-seen', 'true');
					}
				}
			}
		}

		window.addEventListener('scroll', handleScroll);

		// Auto-popup trigger: 15 seconds
		const timeoutId = setTimeout(() => {
			const alreadySeen = localStorage.getItem('ruh-waitlist-seen');
			if (!alreadySeen && !hasTriggeredPopup) {
				triggerWaitlistPopup();
				localStorage.setItem('ruh-waitlist-seen', 'true');
			}
		}, 15000);

		// Carousel auto-advance (disabled)
		// const carouselInterval = setInterval(() => {
		// 	currentSlide = (currentSlide + 1) % screenshots.length;
		// }, 5000);

		// Intersection Observer for scroll animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in');
					}
				});
			},
			{ threshold: 0.2 }
		);

		document.querySelectorAll('.observe-scroll').forEach((el) => {
			observer.observe(el);
		});

		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(timeoutId);
			// clearInterval(carouselInterval); // disabled auto-advance
			observer.disconnect();
		};
	});

	function nextSlide() {
		slideDirection = 'next';
		currentSlide = (currentSlide + 1) % screenshots.length;
	}

	function prevSlide() {
		slideDirection = 'prev';
		currentSlide = (currentSlide - 1 + screenshots.length) % screenshots.length;
	}

	function goToSlide(index: number) {
		slideDirection = index > currentSlide ? 'next' : 'prev';
		currentSlide = index;
	}
</script>

<svelte:head>
	<title>ruh - AI Product Safety Analyzer</title>
	<meta
		name="description"
		content="Protect your health with AI-powered product safety analysis. Instantly detect harmful chemicals, allergens, and PFAS in Amazon products."
	/>
	<meta property="og:title" content="ruh - AI Product Safety Analyzer" />
	<meta
		property="og:description"
		content="Your soul deserves safer choices. AI-powered analysis for every Amazon purchase."
	/>
	<meta property="og:type" content="website" />

	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,600;1,600&family=Inter:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>

	<!-- Tally popup script -->
	<script async src="https://tally.so/widgets/embed.js"></script>
</svelte:head>

<!-- Hidden button to trigger Tally popup programmatically -->
<button
	id="tally-auto-trigger"
	data-tally-open="xXV9Mk"
	data-tally-emoji-text="👋"
	data-tally-emoji-animation="wave"
	style="display: none;"
	aria-hidden="true"
></button>

<div class="ruh-page">
	<!-- Section 1: Minimal Sticky Header -->
	<header class="header" class:scrolled={headerScrolled}>
		<img src="/ruh-logo.png" alt="ruh" class="logo" />
	</header>

	<!-- Section 2: Hero -->
	<section class="hero">
		<div class="hero-background">
			<div class="floating-shape shape-1"></div>
			<div class="floating-shape shape-2"></div>
			<div class="floating-shape shape-3"></div>
		</div>

		<div class="hero-content glass-major">
			<h1 class="hero-title" in:fly={{ y: 30, duration: 800, easing: quintOut, delay: 100 }}>
				your soul deserves safer choices
			</h1>
			<p class="hero-subtitle" in:fly={{ y: 20, duration: 600, delay: 300 }}>
				Ever wonder what's really in the products you buy? <strong
					><span class="ruh-text">ruh</span></strong
				> is your AI-powered safety assistant that analyzes Amazon products in real-time—detecting harmful
				chemicals, allergens, and PFAS "forever chemicals" before you click "Add to Cart."
			</p>
			<div class="hero-features" in:fly={{ y: 20, duration: 600, delay: 400 }}>
				<div class="hero-feature-item">
					<span class="check-icon">✓</span>
					<span>Instant 0-100 harm scores</span>
				</div>
				<div class="hero-feature-item">
					<span class="check-icon">✓</span>
					<span>8 major allergen detection</span>
				</div>
				<div class="hero-feature-item">
					<span class="check-icon">✓</span>
					<span>PFAS & toxic chemical screening</span>
				</div>
			</div>
			<div class="hero-ctas" in:scale={{ start: 0.95, duration: 400, delay: 500 }}>
				<button
					class="cta-primary"
					data-tally-open="xXV9Mk"
					data-tally-emoji-text="👋"
					data-tally-emoji-animation="wave"
				>
					Join Waitlist
				</button>
			</div>
		</div>
	</section>

	<!-- Section 2.5: What is Ruh? -->
	<section class="what-is-ruh">
		<div class="what-is-content observe-scroll">
			<div class="what-is-text">
				<h2>What is <span class="ruh-text">ruh</span>?</h2>
				<p class="intro-paragraph">
					<strong><span class="ruh-text">ruh</span></strong> is a Chrome extension that brings AI-powered
					product safety analysis directly into your Amazon shopping experience. No more opening new
					tabs, copying ingredient lists, or spending 15+ minutes researching if a product is safe for
					you and your family.
				</p>
				<p class="intro-paragraph">
					The moment you visit any Amazon product page, <span class="ruh-text">ruh</span> automatically:
				</p>
				<ul class="intro-list">
					<li><strong>Scrapes ingredients</strong> from the product listing</li>
					<li>
						<strong>Analyzes each ingredient</strong> using Claude AI with web search capabilities
					</li>
					<li>
						<strong>Identifies harmful substances</strong> including allergens, PFAS compounds, and toxic
						chemicals
					</li>
					<li>
						<strong>Calculates a 0-100 harm score</strong> with clear risk classification (Low/Medium/High)
					</li>
					<li>
						<strong>Displays detailed breakdowns</strong> in an elegant sidebar—right on the product
						page
					</li>
				</ul>
				<p class="intro-paragraph">
					All of this happens in <strong>under 3 seconds</strong>, and results are cached for 30
					days so repeat visits are instant.
				</p>
			</div>
			<div class="what-is-visual glass-medium">
				<img
					src="/project-images/ruh/ruh-1-main.png"
					alt="Ruh Chrome extension showing harm score analysis on Amazon product page"
					loading="lazy"
					class="intro-screenshot"
				/>
			</div>
		</div>
	</section>

	<!-- Section 3: Problem Statement -->
	<section class="problem">
		<h2 class="section-heading observe-scroll">because ingredients shouldn't be mysteries</h2>

		<div class="problem-cards">
			<div class="problem-card glass-medium observe-scroll">
				<div class="problem-stat">99%</div>
				<h3>of us have PFAS in our blood</h3>
				<p>Forever chemicals are everywhere. It's time to know which products contain them.</p>
			</div>

			<div class="problem-card glass-medium observe-scroll">
				<div class="problem-stat">15+</div>
				<h3>minutes wasted researching</h3>
				<p>Researching safety shouldn't take longer than shopping itself.</p>
			</div>

			<div class="problem-card glass-medium observe-scroll">
				<div class="problem-stat">0</div>
				<h3>real-time tools exist</h3>
				<p>Until now. Safety analysis at the moment you're making decisions.</p>
			</div>
		</div>
	</section>

	<!-- Section 4: Interactive Screenshot Demo -->
	<section class="demo">
		<h2 class="section-heading observe-scroll">from curiosity to clarity in three seconds</h2>
		<p class="demo-intro observe-scroll">
			See <span class="ruh-text">ruh</span> in action analyzing a real product. Watch how it transforms
			complex ingredient lists into clear, actionable safety insights.
		</p>

		<div class="demo-container glass-major observe-scroll">
			<div class="carousel">
				{#key currentSlide}
					<div
						class="carousel-slide"
						in:fly={{
							x: slideDirection === 'next' ? 300 : -300,
							duration: 500,
							easing: cubicInOut,
							delay: 0
						}}
						out:fly={{
							x: slideDirection === 'next' ? -300 : 300,
							duration: 500,
							easing: cubicInOut,
							delay: 0
						}}
					>
						{#if screenshots[currentSlide].type === 'video'}
							<div class="carousel-video-wrapper">
								<iframe
									width="100%"
									height="100%"
									src={screenshots[currentSlide].src}
									title={screenshots[currentSlide].alt}
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
								></iframe>
							</div>
						{:else}
							<img
								src={screenshots[currentSlide].src}
								alt={screenshots[currentSlide].alt}
								loading="lazy"
								class="demo-image"
							/>
						{/if}

						<p class="carousel-caption">{screenshots[currentSlide].caption}</p>
					</div>
				{/key}
			</div>

			<div class="carousel-controls">
				<button class="carousel-btn" onclick={prevSlide} aria-label="Previous screenshot">‹</button>
				<div class="carousel-dots">
					{#each screenshots as _, i}
						<button
							class="dot"
							class:active={i === currentSlide}
							onclick={() => goToSlide(i)}
							aria-label={`Go to screenshot ${i + 1}`}
						></button>
					{/each}
				</div>
				<button class="carousel-btn" onclick={nextSlide} aria-label="Next screenshot">›</button>
			</div>
		</div>
	</section>

	<!-- Section 4.5: How It Works -->
	<section class="how-it-works">
		<h2 class="section-heading observe-scroll">How it works</h2>

		<div class="steps-container">
			<div class="step glass-medium observe-scroll">
				<div class="step-number">1</div>
				<h3>Browse Amazon</h3>
				<p>
					Visit any product page like you normally would. <span class="ruh-text">ruh</span> automatically
					detects when you're looking at a product.
				</p>
			</div>

			<div class="step-arrow observe-scroll">→</div>

			<div class="step glass-medium observe-scroll">
				<div class="step-number">2</div>
				<h3>AI Analysis</h3>
				<p>
					Claude AI scrapes the ingredient list, searches medical databases, and analyzes every
					component for safety concerns.
				</p>
			</div>

			<div class="step-arrow observe-scroll">→</div>

			<div class="step glass-medium observe-scroll">
				<div class="step-number">3</div>
				<h3>Instant Results</h3>
				<p>
					A clean sidebar appears with your harm score, allergen warnings, PFAS detection, and
					detailed ingredient breakdowns.
				</p>
			</div>
		</div>
	</section>

	<!-- Section 5: Feature Grid -->
	<section class="features">
		<h2 class="section-heading observe-scroll">everything you need to shop safer</h2>
		<div class="features-grid">
			{#each features as feature}
				<div class="feature-card glass-medium observe-scroll">
					<div class="feature-icon">{feature.icon}</div>
					<h3 class="feature-title">{feature.title}</h3>
					<p class="feature-description">{feature.description}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Section 6: Trust/Story Section -->
	<section class="trust">
		<div class="trust-content observe-scroll">
			<h2>built by someone who cares, not a corporation</h2>
			<p class="trust-story">
				After watching family members struggle with allergic reactions and reading countless labels
				without understanding the real risks, I built <span class="ruh-text">ruh</span>. This isn't
				a startup trying to scale—it's a tool I wish existed when my family needed it.
			</p>
			<p class="trust-story">
				The name "<span class="ruh-text">ruh</span>" means soul or essence in multiple languages.
				Pronounced "rooh."
			</p>

			<div class="tech-badges">
				<span class="badge glass-subtle">Claude AI</span>
				<span class="badge glass-subtle">Chrome Extension</span>
				<span class="badge glass-subtle">Real-time Analysis</span>
			</div>
		</div>
	</section>

	<!-- Section 7: Final CTA -->
	<section class="final-cta">
		<div class="final-cta-content glass-major observe-scroll">
			<h2>protect what matters most</h2>
			<p class="final-cta-subtitle">Join 500+ people making safer choices every day.</p>

			<div class="final-cta-buttons">
				<button
					class="cta-primary glow-button"
					data-tally-open="xXV9Mk"
					data-tally-emoji-text="👋"
					data-tally-emoji-animation="wave"
				>
					Join Waitlist
				</button>
			</div>
		</div>
	</section>

	<!-- Section 8: Minimal Footer -->
	<footer class="footer">
		<div class="footer-content">
			<p>&copy; 2025 <span class="ruh-text">ruh</span>. Built with care.</p>
			<div class="footer-links">
				<a href="https://github.com/RSHVR/ruh" target="_blank" rel="noopener">GitHub</a>
				<span>•</span>
				<a href="/ruh/privacy">Privacy</a>
				<span>•</span>
				<a href="/">Home</a>
			</div>
		</div>
	</footer>
</div>

<style>
	/* Reset and base styles */
	.ruh-page {
		min-height: 100vh;
		background: linear-gradient(to bottom, #fffbf5 0%, #f5f0e8 100%);
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		color: #3a3633;
		overflow-x: hidden;
	}

	/* ruh text styling */
	.ruh-text {
		font-family: 'Cormorant Infant', serif;
		font-style: italic;
		font-size: 1.25em;
		vertical-align: baseline;
	}

	/* ruh in headings should match heading size */
	h1 .ruh-text,
	h2 .ruh-text,
	h3 .ruh-text,
	h4 .ruh-text,
	h5 .ruh-text,
	h6 .ruh-text {
		font-size: 1em;
	}

	/* Section 1: Header */
	.header {
		position: fixed;
		top: 20px;
		left: 20px;
		z-index: 100;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.logo {
		height: 60px;
		width: auto;
		transition: all 0.3s ease;
	}

	.header.scrolled .logo {
		opacity: 0.9;
	}

	/* Section 2: Hero */
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 60px 20px;
		position: relative;
	}

	.hero-background {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.floating-shape {
		position: absolute;
		border-radius: 50%;
		opacity: 0.4;
		filter: blur(80px);
	}

	.shape-1 {
		width: 500px;
		height: 500px;
		background: #a8b89f;
		top: 5%;
		left: 5%;
		animation: float 8s ease-in-out infinite;
	}

	.shape-2 {
		width: 450px;
		height: 450px;
		background: #e8dcc8;
		bottom: 10%;
		right: 10%;
		animation: float 10s ease-in-out infinite 2s;
	}

	.shape-3 {
		width: 400px;
		height: 400px;
		background: #c9b5a0;
		top: 40%;
		right: 15%;
		animation: float 12s ease-in-out infinite 4s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px) translateX(0px);
		}
		33% {
			transform: translateY(-20px) translateX(10px);
		}
		66% {
			transform: translateY(10px) translateX(-15px);
		}
	}

	.hero-content {
		position: relative;
		max-width: 900px;
		text-align: center;
		padding: 80px 60px;
		border-radius: 24px;
	}

	.hero-title {
		font-family: 'Cormorant Infant', serif;
		font-size: 56px;
		font-weight: 600;
		font-style: italic;
		line-height: 1.2;
		margin: 0 0 24px 0;
		color: #3a3633;
	}

	.hero-subtitle {
		font-size: 20px;
		line-height: 1.7;
		color: #6b6560;
		margin: 0 0 32px 0;
		max-width: 700px;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-features {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin: 0 0 40px 0;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-feature-item {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 16px;
		color: #3a3633;
		justify-content: center;
	}

	.check-icon {
		color: #9bb88f;
		font-weight: 700;
		font-size: 20px;
	}

	.hero-ctas {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
	}

	/* CTAs */
	.cta-primary,
	.cta-secondary {
		padding: 16px 32px;
		border-radius: 12px;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		text-decoration: none;
		display: inline-block;
		border: none;
		font-family: 'Inter', sans-serif;
	}

	.cta-primary {
		background: #e8dcc8;
		color: #3a3633;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
	}

	.cta-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	}

	.cta-secondary {
		background: transparent;
		color: #3a3633;
		border: 2px solid #a8b89f;
	}

	.cta-secondary:hover {
		background: rgba(168, 184, 159, 0.1);
		transform: translateY(-2px);
	}

	.glow-button {
		animation: glow-pulse 2s ease-in-out infinite;
	}

	@keyframes glow-pulse {
		0%,
		100% {
			box-shadow: 0 0 20px rgba(168, 184, 159, 0.4);
		}
		50% {
			box-shadow: 0 0 40px rgba(168, 184, 159, 0.7);
		}
	}

	/* Section 2.5: What is Ruh */
	.what-is-ruh {
		padding: 120px 20px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.what-is-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		align-items: center;
	}

	.what-is-text h2 {
		font-family: 'Cormorant Infant', serif;
		font-size: 40px;
		font-weight: 600;
		font-style: italic;
		margin: 0 0 24px 0;
		color: #3a3633;
	}

	.intro-paragraph {
		font-size: 18px;
		line-height: 1.8;
		color: #6b6560;
		margin: 0 0 20px 0;
	}

	.intro-paragraph:last-of-type {
		margin-bottom: 0;
	}

	.intro-list {
		margin: 20px 0;
		padding-left: 24px;
	}

	.intro-list li {
		font-size: 17px;
		line-height: 1.8;
		color: #6b6560;
		margin-bottom: 12px;
	}

	.intro-list li strong {
		color: #3a3633;
	}

	.what-is-visual {
		padding: 24px;
		border-radius: 16px;
	}

	.intro-screenshot {
		width: 100%;
		height: auto;
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
	}

	/* Section 3: Problem */
	.problem {
		padding: 120px 20px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-heading {
		font-family: 'Cormorant Infant', serif;
		font-size: 40px;
		font-weight: 600;
		font-style: italic;
		text-align: center;
		margin: 0 0 60px 0;
		color: #3a3633;
	}

	.problem-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 32px;
	}

	.problem-card {
		padding: 40px;
		border-radius: 16px;
		text-align: center;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.problem-card:hover {
		transform: translateY(-4px);
		backdrop-filter: blur(35px) !important;
		-webkit-backdrop-filter: blur(35px) !important;
		box-shadow: 0 12px 40px rgba(168, 184, 159, 0.25);
	}

	.problem-stat {
		font-size: 56px;
		font-weight: 600;
		color: #a8b89f;
		margin-bottom: 16px;
	}

	.problem-card h3 {
		font-size: 20px;
		font-weight: 600;
		margin: 0 0 12px 0;
		color: #3a3633;
	}

	.problem-card p {
		font-size: 16px;
		line-height: 1.6;
		color: #6b6560;
		margin: 0;
	}

	/* Section 4: Demo */
	.demo {
		padding: 120px 20px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.demo-intro {
		font-size: 20px;
		line-height: 1.6;
		color: #6b6560;
		text-align: center;
		margin: 0 auto 60px auto;
		max-width: 700px;
	}

	.demo-container {
		padding: 30px;
		border-radius: 24px;
		max-width: 900px;
		margin: 0 auto;
	}

	.carousel {
		position: relative;
		min-height: 600px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.carousel-slide {
		width: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		right: 0;
		will-change: transform;
		transform: translateZ(0);
	}

	.demo-image {
		width: auto;
		max-width: 100%;
		max-height: 500px;
		height: auto;
		border-radius: 12px;
		margin: 0 auto 24px auto;
		display: block;
		object-fit: contain;
		backface-visibility: hidden;
	}

	.carousel-video-wrapper {
		width: 100%;
		max-width: 700px;
		margin: 0 auto 24px auto;
		border-radius: 12px;
		overflow: hidden;
		aspect-ratio: 16 / 9;
	}

	.carousel-video-wrapper iframe {
		width: 100%;
		height: 100%;
		border: none;
		display: block;
		backface-visibility: hidden;
	}

	.carousel-caption {
		font-size: 18px;
		line-height: 1.6;
		color: #6b6560;
		margin: 0;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		font-weight: 500;
	}

	.carousel-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
		margin-top: 32px;
	}

	.carousel-btn {
		background: rgba(168, 184, 159, 0.2);
		border: 1px solid rgba(168, 184, 159, 0.3);
		border-radius: 50%;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-size: 24px;
		color: #3a3633;
		transition: all 0.3s ease;
	}

	.carousel-btn:hover {
		background: rgba(168, 184, 159, 0.3);
		transform: scale(1.1);
	}

	.carousel-dots {
		display: flex;
		gap: 12px;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(168, 184, 159, 0.3);
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		padding: 0;
	}

	.dot.active {
		background: #a8b89f;
		transform: scale(1.2);
	}

	.demo-context {
		max-width: 800px;
		margin: 40px auto 0 auto;
		text-align: center;
	}

	.context-note {
		font-size: 16px;
		line-height: 1.7;
		color: #6b6560;
		background: rgba(168, 184, 159, 0.1);
		padding: 20px 28px;
		border-radius: 12px;
		border-left: 4px solid #a8b89f;
		font-style: italic;
		margin: 0;
	}

	/* Section 4.5: How it Works */
	.how-it-works {
		padding: 120px 20px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.steps-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 32px;
		flex-wrap: wrap;
	}

	.step {
		flex: 1;
		min-width: 280px;
		max-width: 320px;
		padding: 40px 32px;
		border-radius: 16px;
		text-align: center;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.step:hover {
		transform: translateY(-4px);
		backdrop-filter: blur(35px) !important;
		-webkit-backdrop-filter: blur(35px) !important;
		box-shadow: 0 12px 40px rgba(168, 184, 159, 0.25);
	}

	.step-number {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: #a8b89f;
		color: #fffbf5;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28px;
		font-weight: 600;
		margin: 0 auto 20px auto;
	}

	.step h3 {
		font-size: 22px;
		font-weight: 600;
		margin: 0 0 12px 0;
		color: #3a3633;
	}

	.step p {
		font-size: 16px;
		line-height: 1.6;
		color: #6b6560;
		margin: 0;
	}

	.step-arrow {
		font-size: 32px;
		color: #a8b89f;
		opacity: 0.5;
	}

	/* Section 5: Features */
	.features {
		padding: 120px 20px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 32px;
	}

	.feature-card {
		padding: 40px;
		border-radius: 16px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.feature-card:hover {
		transform: translateY(-4px);
		backdrop-filter: blur(35px) !important;
		-webkit-backdrop-filter: blur(35px) !important;
		box-shadow: 0 12px 40px rgba(168, 184, 159, 0.25);
	}

	.feature-icon {
		font-size: 48px;
		margin-bottom: 20px;
	}

	.feature-title {
		font-size: 20px;
		font-weight: 600;
		margin: 0 0 12px 0;
		color: #3a3633;
	}

	.feature-description {
		font-size: 16px;
		line-height: 1.6;
		color: #6b6560;
		margin: 0;
	}

	/* Section 6: Trust */
	.trust {
		padding: 120px 20px;
		max-width: 800px;
		margin: 0 auto;
	}

	.trust-content {
		text-align: center;
	}

	.trust-content h2 {
		font-family: 'Cormorant Infant', serif;
		font-size: 36px;
		font-weight: 600;
		font-style: italic;
		margin: 0 0 32px 0;
		color: #3a3633;
	}

	.trust-story {
		font-size: 18px;
		line-height: 1.8;
		color: #6b6560;
		margin: 0 0 24px 0;
	}

	.tech-badges {
		display: flex;
		gap: 12px;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 40px;
	}

	.badge {
		padding: 8px 16px;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 500;
		color: #3a3633;
	}

	/* Section 7: Final CTA */
	.final-cta {
		padding: 120px 20px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.final-cta-content {
		padding: 80px 60px;
		border-radius: 24px;
		text-align: center;
		border: 2px solid rgba(168, 184, 159, 0.4);
	}

	.final-cta-content h2 {
		font-family: 'Cormorant Infant', serif;
		font-size: 48px;
		font-weight: 600;
		font-style: italic;
		margin: 0 0 16px 0;
		color: #3a3633;
	}

	.final-cta-subtitle {
		font-size: 20px;
		color: #6b6560;
		margin: 0 0 40px 0;
	}

	.final-cta-buttons {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
	}

	/* Section 8: Footer */
	.footer {
		padding: 60px 20px 40px 20px;
		text-align: center;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
	}

	.footer-content p {
		margin: 0 0 16px 0;
		color: #6b6560;
		font-size: 14px;
	}

	.footer-links {
		display: flex;
		gap: 12px;
		justify-content: center;
		align-items: center;
	}

	.footer-links a {
		color: #6b6560;
		text-decoration: none;
		font-size: 14px;
		transition: color 0.3s ease;
	}

	.footer-links a:hover {
		color: #3a3633;
	}

	.footer-links span {
		color: #6b6560;
	}

	/* Glassmorphism Classes */
	.glass-major {
		background: rgba(255, 251, 245, 0.5);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(168, 184, 159, 0.3);
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.3),
			inset 0 0 60px rgba(255, 255, 255, 0.3);
		position: relative;
	}

	.glass-medium {
		background: rgba(245, 240, 232, 0.5);
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);
		border: 1px solid rgba(168, 184, 159, 0.3);
		box-shadow:
			0 4px 16px rgba(0, 0, 0, 0.08),
			inset 0 0 40px rgba(255, 255, 255, 0.3);
		position: relative;
	}

	.glass-subtle {
		background: rgba(255, 251, 245, 0.6);
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);
		border: 1px solid rgba(168, 184, 159, 0.2);
	}

	/* Scroll animations */
	.observe-scroll {
		opacity: 1;
		transform: translateY(0);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.observe-scroll.animate-in {
		opacity: 1;
		transform: translateY(0);
	}

	/* Accessibility */
	@media (prefers-reduced-motion: reduce) {
		* {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}

	/* Focus states */
	button:focus-visible,
	a:focus-visible {
		outline: 2px solid #a8b89f;
		outline-offset: 4px;
	}

	/* Responsive Design */

	/* Mobile (0-480px) */
	@media (max-width: 480px) {
		.hero-content {
			padding: 40px 24px;
		}

		.hero-title {
			font-size: 32px;
		}

		.hero-subtitle {
			font-size: 16px;
		}

		.section-heading {
			font-size: 28px;
		}

		.problem-cards {
			grid-template-columns: 1fr;
		}

		.problem-card {
			padding: 32px 24px;
		}

		.demo-container {
			padding: 20px 16px;
		}

		.carousel {
			min-height: 280px;
		}

		.demo-image {
			max-height: 250px;
		}

		.carousel-controls {
			margin-top: 20px;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}

		.feature-card {
			padding: 32px 24px;
		}

		.trust-content h2 {
			font-size: 28px;
		}

		.trust-story {
			font-size: 16px;
		}

		.final-cta-content {
			padding: 40px 24px;
		}

		.final-cta-content h2 {
			font-size: 32px;
		}

		.final-cta-subtitle {
			font-size: 16px;
		}

		.hero-ctas,
		.final-cta-buttons {
			flex-direction: column;
			width: 100%;
		}

		.cta-primary,
		.cta-secondary {
			width: 100%;
			text-align: center;
		}

		/* New sections responsive */
		.what-is-content {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.what-is-text h2 {
			font-size: 28px;
		}

		.intro-paragraph {
			font-size: 16px;
		}

		.intro-list li {
			font-size: 15px;
		}

		.demo-intro {
			font-size: 16px;
		}

		.step-arrow {
			display: none;
		}

		.steps-container {
			flex-direction: column;
		}

		.step {
			max-width: 100%;
		}

		/* Reduce blur on mobile for performance */
		.glass-major {
			backdrop-filter: blur(32px);
			-webkit-backdrop-filter: blur(32px);
		}

		.glass-medium {
			backdrop-filter: blur(16px);
			-webkit-backdrop-filter: blur(16px);
		}

		.glass-subtle {
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
		}
	}

	/* Small (481-768px) */
	@media (min-width: 481px) and (max-width: 768px) {
		.hero-content {
			padding: 60px 40px;
		}

		.hero-title {
			font-size: 40px;
		}

		.section-heading {
			font-size: 32px;
		}

		.problem-cards {
			grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		}

		.demo-container {
			padding: 20px;
			max-height: fit-content;
		}

		.features-grid {
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		}

		.final-cta-content {
			padding: 60px 40px;
		}

		.final-cta-content h2 {
			font-size: 40px;
		}

		/* New sections responsive */
		.what-is-content {
			grid-template-columns: 1fr;
			gap: 48px;
		}

		.step-arrow {
			display: none;
		}
	}

	/* Medium (769-1279px) */
	@media (min-width: 769px) and (max-width: 1279px) {
		.hero-title {
			font-size: 48px;
		}

		.section-heading {
			font-size: 36px;
		}
	}

	/* Browser fallback for no backdrop-filter support */
	@supports not (backdrop-filter: blur(1px)) {
		.glass-major,
		.glass-medium,
		.glass-subtle {
			background: rgba(255, 251, 245, 0.95);
		}
	}
</style>
