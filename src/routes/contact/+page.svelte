<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import ContactModal from '$lib/components/ContactModal.svelte';

	let showModal = false;

	onMount(() => {
		// Show modal immediately when page loads
		showModal = true;
	});

	function handleModalClose() {
		showModal = false;
		// Redirect to home page after modal closes
		setTimeout(() => {
			goto('/');
		}, 300);
	}
</script>

<svelte:head>
	<title>Contact - Arshveer Gahir</title>
	<meta name="description" content="Get in touch with Arshveer Gahir for AI/ML projects and collaborations" />
</svelte:head>

<div class="contact-page">
	<div class="contact-header">
		<h1>Get in Touch</h1>
		<p class="contact-subtitle">Let's discuss AI/ML projects, collaborations, or opportunities</p>
		
		<div class="contact-info">
			<div class="contact-card">
				<h3>Email</h3>
				<p>arshveer.gahir@example.com</p>
			</div>
			
			<div class="contact-card">
				<h3>LinkedIn</h3>
				<p>linkedin.com/in/arshveergahir</p>
			</div>
			
			<div class="contact-card">
				<h3>Location</h3>
				<p>San Francisco, CA</p>
			</div>
		</div>

		<button class="open-form-btn" on:click={() => showModal = true}>
			Open Contact Form
		</button>
	</div>
</div>

<ContactModal bind:showModal={showModal} />

<style>
	.contact-page {
		width: 100%;
		min-height: 80vh;
		padding: 60px 196px 100px 196px;
		box-sizing: border-box;
		background: #FCF7F2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.contact-header {
		text-align: center;
		max-width: 800px;
	}

	.contact-header h1 {
		margin: 0 0 20px 0;
		font-size: 48px;
		font-weight: 600;
		color: #222222;
		font-family: 'Nunito', sans-serif;
	}

	.contact-subtitle {
		margin: 0 0 50px 0;
		font-size: 18px;
		color: #666666;
		font-family: 'Nunito', sans-serif;
		line-height: 1.5;
	}

	.contact-info {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 30px;
		margin-bottom: 50px;
	}

	.contact-card {
		background: white;
		padding: 30px 25px;
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		text-align: center;
		transition: transform 0.3s ease;
	}

	.contact-card:hover {
		transform: translateY(-4px);
	}

	.contact-card h3 {
		margin: 0 0 15px 0;
		font-size: 20px;
		font-weight: 600;
		color: #222222;
		font-family: 'Nunito', sans-serif;
	}

	.contact-card p {
		margin: 0;
		font-size: 16px;
		color: #666666;
		font-family: 'Nunito', sans-serif;
	}

	.open-form-btn {
		background: #ff611a;
		color: white;
		border: none;
		border-radius: 8px;
		padding: 16px 32px;
		font-size: 18px;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.open-form-btn:hover {
		background: #e55517;
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(255, 97, 26, 0.3);
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.contact-page {
			padding: 40px 20px 80px 20px;
		}

		.contact-header h1 {
			font-size: 36px;
		}

		.contact-info {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.contact-card {
			padding: 25px 20px;
		}
	}

	@media (max-width: 480px) {
		.contact-page {
			padding: 30px 15px 60px 15px;
		}

		.contact-header h1 {
			font-size: 28px;
		}

		.open-form-btn {
			padding: 14px 28px;
			font-size: 16px;
		}
	}
</style>