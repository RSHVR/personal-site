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
		overflow-x: hidden; /* Allow vertical scrolling but prevent horizontal */
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
		flex: 1; /* Take up all available space between header and footer */
		display: flex;
		flex-direction: column;
		padding-bottom: 20px; /* Smaller padding to ensure footer is visible */
		transition: padding-bottom 0.3s ease;
	}

	.footer-wrapper {
		width: 100%;
		height: 60px; /* Fixed height for footer */
		flex-shrink: 0; /* Prevent footer from shrinking */
		position: relative; /* Ensure proper stacking context */
		z-index: 1; /* Make sure footer is above other elements */
	}

	/* Extra small (0-480px) */
	@media (max-width: 480px) {
		.header {
			height: 90px;
		}

		.main-content {
			padding-bottom: 15px;
		}
	}

	/* Small (481-768px) */
	@media (min-width: 481px) and (max-width: 768px) {
		.header {
			height: 100px;
		}

		.main-content {
			padding-bottom: 18px;
		}
	}

	/* Medium (769-1279px) */
	@media (min-width: 769px) and (max-width: 1279px) {
		.header {
			height: 110px;
		}

		.main-content {
			padding-bottom: 20px;
		}
	}

	/* Large (1280px+) */
	@media (min-width: 1280px) {
		.header {
			height: 120px;
		}

		.main-content {
			padding-bottom: 20px;
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
			padding-bottom: 15px;
		}
	}
</style>
