<script>
	import '../lib/styles/global.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ContactModal from '$lib/components/ContactModal.svelte';

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

	<Footer />

	<ContactModal bind:showModal={showContactModal} />
</div>

<style>
	.under-construction {
		width: 100%;
		height: 100vh;
		position: relative;
		background: #131314;
		overflow: hidden;
		display: grid;
		grid-template-rows: 120px 1fr 120px;
	}

	.header {
		width: 100%;
		height: 120px;
		background: #131314;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.main-content {
		position: relative;
		width: 100%;
		height: 100%;
	}

	@media (max-width: 768px) {
		.under-construction {
			grid-template-rows: auto 1fr auto;
		}

		.header {
			height: auto;
			min-height: 120px;
		}
	}
</style>
