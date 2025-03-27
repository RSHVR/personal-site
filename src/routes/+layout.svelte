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
	}

	.header {
		width: 100%;
		height: 120px;
		background: #131314;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-shrink: 0;
		transition:
			height 0.3s ease,
			min-height 0.3s ease; /* Smooth transition for size changes */
	}

	.main-content {
		position: relative;
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-bottom: 30px; /* Ensure spacing before footer */
		overflow-y: auto; /* Allow scrolling if content is too large */
		transition: padding-bottom 0.3s ease; /* Smooth transition for padding changes */
	}

	.footer-wrapper {
		width: 100%;
		margin-top: auto;
	}

	/* Extra Small Mobile (320px - 480px) */
	@media (max-width: 480px) {
		.header {
			height: 90px;
			min-height: 90px;
		}

		.main-content {
			padding-bottom: 20px;
		}
	}

	/* Small Mobile landscape (481px - 600px) */
	@media (min-width: 481px) and (max-width: 600px) {
		.header {
			height: 100px;
			min-height: 100px;
		}

		.main-content {
			padding-bottom: 25px;
		}
	}

	/* Small Tablets portrait (601px - 768px) */
	@media (min-width: 601px) and (max-width: 768px) {
		.header {
			height: 110px;
			min-height: 110px;
		}
	}

	/* For very short height screens */
	@media (max-height: 600px) {
		.under-construction {
			min-height: 600px; /* Minimum height for very short screens */
		}

		.header {
			height: 80px;
			min-height: 80px;
		}

		.main-content {
			padding-bottom: 15px;
		}
	}
</style>
