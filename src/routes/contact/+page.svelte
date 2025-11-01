<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import ContactModal from '$lib/components/ContactModal.svelte';

	let showModal = $state(false);

	onMount(() => {
		// Show modal immediately when page loads
		showModal = false;
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
	<title>Arshveer Gahir</title>
	<meta
		name="description"
		content="Get in touch with Arshveer Gahir for AI/ML projects and collaborations"
	/>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
</svelte:head>

<div class="contact-page">
	<div class="contact-section">
		<div class="contact-header">
			<h1>Let's talk!</h1>
			<p class="contact-subtitle">Always open to discussing new ideas and opportunities.</p>

			<div class="contact-info">
				<div class="contact-card">
					<div class="contact-content">
						<span class="material-icons-round">mail</span>
						<a href="mailto:arshveersinghgahir@gmail.com"
							><p>arshveersinghgahir at gmail dot com</p></a
						>
					</div>
				</div>

				<div class="contact-card">
					<div class="contact-content">
						<svg class="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
							/>
						</svg>
						<a
							href="https://www.linkedin.com/in/arshveer-singh-gahir"
							target="_blank"
							rel="noopener noreferrer"><p>linkedin.com/in/arshveer-singh-gahir</p></a
						>
					</div>
				</div>

				<div class="contact-card">
					<div class="contact-content">
						<span class="material-icons-round">location_on</span>
						<p>Toronto, Canada</p>
					</div>
				</div>
			</div>
		</div>
		<div class="inline-booking-container">
			<!-- Google Calendar Appointment Scheduling begin -->
			<iframe
				src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ16SgKeOJtE_u7t9Fc146hsjooiwjZpBXBGyqX5jZimhwGKSQKuRPKL2duRNRxf0V3sJ6aJ-WxT?gv=true"
				style="border: 0"
				width="100%"
				height="700"
				frameborder="0"
			></iframe>
			<!-- end Google Calendar Appointment Scheduling -->
		</div>
	</div>
</div>

<ContactModal bind:showModal />

<style>
	.contact-page {
		width: 100%;
		min-height: 100vh;
		padding: 40px 196px 100px 196px;
		box-sizing: border-box;
		background: #fcf7f2;
	}

	.contact-section {
		display: flex;
		gap: 40px;
		align-items: flex-start;
		justify-content: space-between;
	}

	.contact-header {
		flex: 0 0 auto;
		align-self: flex-start;
	}

	.contact-header h1 {
		margin: 0 0 30px 0;
		font-size: 28px;
		font-weight: 400;
		color: #222222;
		font-family: 'Nunito', sans-serif;
		padding-bottom: 20px;
		border-bottom: 1px solid #e0e0e0;
		width: 100%;
	}

	.contact-subtitle {
		margin: 0 0 50px 0;
		font-size: 18px;
		color: #666666;
		font-family: 'Nunito', sans-serif;
		line-height: 1.5;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 30px;
		margin-bottom: 50px;
		align-items: flex-start;
	}

	.contact-card {
		background: white;

		padding: 25px;
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s ease;
		box-sizing: border-box;
	}

	.contact-card a {
		text-decoration: none;
		color: inherit;
	}

	.contact-card:hover {
		transform: translateY(-4px);
	}

	.contact-content {
		display: flex;
		align-items: center;
		gap: 15px;
		text-align: left;
	}

	.contact-content .material-icons-round {
		font-size: 24px;
		color: #666666;
		flex-shrink: 0;
	}

	.linkedin-icon {
		width: 24px;
		height: 24px;
		color: #666666;
		flex-shrink: 0;
	}

	.contact-card p {
		margin: 0;
		font-size: 16px;
		color: #666666;
		font-family: 'Nunito', sans-serif;
		line-height: 1.4;
	}

	.inline-booking-container {
		flex: 1;
		min-height: 600px;
		align-self: flex-end;
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
	@media (max-width: 480px) {
		.contact-page {
			padding: 30px 15px 60px 15px;
		}

		.contact-section {
			flex-direction: column;
			gap: 20px;
		}

		.contact-header h1 {
			font-size: 24px;
		}

		.contact-subtitle {
			margin: 0 0 30px 0;
			font-size: 16px;
		}

		.contact-info {
			flex-direction: column;
			gap: 15px;
			margin-bottom: 30px;
		}

		.contact-card {
			width: 100%;
			height: auto;
			padding: 20px 15px;
		}

		.contact-content {
			justify-content: flex-start;
		}

		.inline-booking-container {
			min-height: 450px;
		}

		.inline-booking-container iframe {
			height: 500px;
		}

		.open-form-btn {
			padding: 14px 28px;
			font-size: 16px;
		}
	}

	@media (min-width: 481px) and (max-width: 768px) {
		.contact-page {
			padding: 40px 30px 80px 30px;
		}

		.contact-section {
			flex-direction: column;
			gap: 30px;
		}

		.contact-header h1 {
			font-size: 22px;
		}

		.contact-subtitle {
			font-size: 17px;
		}

		.contact-info {
			flex-direction: column;
			gap: 20px;
		}

		.contact-card {
			width: 100%;
			height: auto;
			padding: 25px 20px;
		}

		.contact-content {
			justify-content: flex-start;
		}

		.inline-booking-container iframe {
			height: 550px;
		}

		.inline-booking-container {
			min-height: 500px;
		}
	}

	@media (min-width: 769px) and (max-width: 1200px) {
		.contact-page {
			padding: 40px 100px 100px 100px;
		}

		.contact-header h1 {
			font-size: 24px;
		}
	}
</style>
