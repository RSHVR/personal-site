<script>
	import '../lib/styles/global.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ContactModal from '$lib/components/ContactModal.svelte';
	import BreakpointDebugger from '$lib/components/BreakpointDebugger.svelte';
	import { dev } from '$app/environment';

	let showContactModal = false;

	function handleOpenContactModal() {
		showContactModal = true;
	}
</script>

<div class="under-construction">
	<header class="header">
		<Navigation onOpenContactModal={handleOpenContactModal} />
	</header>

	<main class="main-content">
		<slot />
	</main>

	<footer class="footer-wrapper">
		<Footer />
	</footer>

	<ContactModal bind:showModal={showContactModal} />

	{#if dev}
		<BreakpointDebugger />
	{/if}
</div>

<style>
	/* Base styles */
	.under-construction {
		width: 100%;
		min-height: 100vh;
		position: relative;
		background: #131314;
		display: flex;
		flex-direction: column;
		overflow: hidden; /* Prevent content from overflowing when translated */
	}

	.header {
		width: 100%;
		height: 120px;
		background: #131314;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-shrink: 0;
		transition: height 0.3s ease; /* Smooth transition for size changes */
	}

	.main-content {
		position: relative;
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-bottom: 40px; /* Ensure spacing before footer */
		overflow-y: auto; /* Allow scrolling if content is too large */
		transition: padding-bottom 0.3s ease; /* Smooth transition for padding changes */
		/* Ensure the main content has a minimum height to maintain footer position */
		min-height: calc(100vh - 180px); /* 100vh - (header height + footer height) */
	}

	.footer-wrapper {
		width: 100%;
		height: 60px; /* Fixed height for footer */
		margin-top: auto;
		flex-shrink: 0; /* Prevent footer from shrinking */
	}

	/* Extra small (0-480px) */
	@media (max-width: 480px) {
		.header {
			height: 90px;
		}

		.main-content {
			padding-bottom: 30px;
			min-height: calc(100vh - 150px); /* 100vh - (header + footer) */
		}
	}

	/* Small (481-768px) */
	@media (min-width: 481px) and (max-width: 768px) {
		.header {
			height: 100px;
		}

		.main-content {
			padding-bottom: 35px;
			min-height: calc(100vh - 160px); /* 100vh - (header + footer) */
		}
	}

	/* Medium (769-1279px) */
	@media (min-width: 769px) and (max-width: 1279px) {
		.header {
			height: 110px;
		}

		.main-content {
			padding-bottom: 38px;
			min-height: calc(100vh - 170px); /* 100vh - (header + footer) */
		}
	}

	/* Large (1280px+) */
	@media (min-width: 1280px) {
		.header {
			height: 120px;
		}

		.main-content {
			padding-bottom: 40px;
			min-height: calc(100vh - 180px); /* 100vh - (header + footer) */
		}
	}

	/* For very short height screens */
	@media (max-height: 600px) {
		.under-construction {
			min-height: 600px; /* Minimum height for very short screens */
		}

		.header {
			height: 80px;
		}

		.main-content {
			padding-bottom: 25px;
			min-height: calc(100vh - 140px); /* 100vh - (header + footer) */
		}
	}
</style>
