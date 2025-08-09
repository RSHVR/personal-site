<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	let resumePdfUrl = '/resume.pdf';
	let isMobile = false;
	let pdfSupported = true;
	let showFallback = false;

	onMount(() => {
		// Detect mobile devices
		isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		
		// Check PDF plugin support
		const hasPdfSupport = navigator.mimeTypes && navigator.mimeTypes['application/pdf'];
		pdfSupported = hasPdfSupport || !isMobile;
		
		if (isMobile || !pdfSupported) {
			showFallback = true;
		}
	});
</script>

<svelte:head>
	<title>Resume - Arshveer Gahir</title>
	<meta name="description" content="View and download Arshveer Gahir's resume" />
</svelte:head>

<div class="resume-page">
	<div class="resume-header">
		<h1>Resume</h1>
		<a href={resumePdfUrl} download="Arshveer_Gahir_Resume.pdf" class="download-btn">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 16L16 12H13V4H11V12H8L12 16Z" fill="currentColor"/>
				<path d="M20 18H4V20H20V18Z" fill="currentColor"/>
			</svg>
			Download Resume
		</a>
	</div>

	<div class="pdf-container">
		{#if browser && showFallback}
			<div class="pdf-fallback">
				<div class="fallback-content">
					<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" fill="#ff611a"/>
					</svg>
					<h3>Resume Preview</h3>
					<p>PDF preview not available on this device</p>
					<div class="fallback-actions">
						<a href={resumePdfUrl} target="_blank" class="view-btn">View in New Tab</a>
						<a href={resumePdfUrl} download="Arshveer_Gahir_Resume.pdf" class="download-btn-fallback">Download PDF</a>
					</div>
				</div>
			</div>
		{:else}
			<object data={resumePdfUrl} type="application/pdf" class="pdf-object">
				<iframe 
					src={resumePdfUrl}
					title="Arshveer Gahir Resume"
					class="pdf-viewer">
				</iframe>
				<div class="fallback-message">
					<p>Unable to display PDF? <a href={resumePdfUrl} target="_blank">View in new tab</a> or <a href={resumePdfUrl} download="Arshveer_Gahir_Resume.pdf">download it here</a></p>
				</div>
			</object>
		{/if}
	</div>
</div>

<style>
	.resume-page {
		width: 100%;
		min-height: 100vh;
		padding: 40px 196px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: #FCF7F2;
	}

	.resume-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
		padding-bottom: 20px;
		border-bottom: 1px solid #e0e0e0;
	}

	.resume-header h1 {
		margin: 0;
		font-size: 36px;
		font-weight: 600;
		color: #222222;
		font-family: 'Nunito', sans-serif;
	}

	.download-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: #ff611a;
		color: white;
		text-decoration: none;
		border-radius: 8px;
		font-weight: 500;
		font-size: 16px;
		transition: all 0.3s ease;
		font-family: 'Nunito', sans-serif;
	}

	.download-btn:hover {
		background: #e55517;
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(255, 97, 26, 0.3);
	}

	.pdf-container {
		flex: 1;
		position: relative;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		background: white;
	}

	.pdf-viewer {
		width: 100%;
		height: 80vh;
		min-height: 600px;
		border: none;
		border-radius: 12px;
	}

	.fallback-message {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		background: rgba(255, 255, 255, 0.9);
		padding: 20px;
		border-radius: 8px;
		pointer-events: none;
	}

	.fallback-message p {
		margin: 0;
		color: #666666;
		font-size: 16px;
	}

	.fallback-message a {
		color: #ff611a;
		text-decoration: none;
		font-weight: 500;
	}

	.fallback-message a:hover {
		text-decoration: underline;
	}

	.pdf-object {
		width: 100%;
		height: 80vh;
		min-height: 600px;
		border: none;
		border-radius: 12px;
	}

	.pdf-fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60vh;
		min-height: 400px;
	}

	.fallback-content {
		text-align: center;
		padding: 40px;
		background: white;
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		max-width: 400px;
	}

	.fallback-content h3 {
		margin: 20px 0 10px 0;
		font-size: 24px;
		color: #222222;
	}

	.fallback-content p {
		margin: 0 0 30px 0;
		color: #666666;
		font-size: 16px;
	}

	.fallback-actions {
		display: flex;
		gap: 15px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.view-btn, .download-btn-fallback {
		padding: 12px 24px;
		text-decoration: none;
		border-radius: 8px;
		font-weight: 500;
		font-size: 14px;
		transition: all 0.3s ease;
		font-family: 'Nunito', sans-serif;
	}

	.view-btn {
		background: #f0f0f0;
		color: #222222;
		border: 2px solid #e0e0e0;
	}

	.view-btn:hover {
		background: #e8e8e8;
	}

	.download-btn-fallback {
		background: #ff611a;
		color: white;
	}

	.download-btn-fallback:hover {
		background: #e55517;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.resume-page {
			padding: 20px;
		}

		.resume-header {
			flex-direction: column;
			gap: 20px;
			text-align: center;
		}

		.resume-header h1 {
			font-size: 28px;
		}

		.pdf-viewer {
			height: 70vh;
			min-height: 500px;
		}
	}

	@media (max-width: 480px) {
		.resume-page {
			padding: 15px;
		}

		.download-btn {
			padding: 10px 20px;
			font-size: 14px;
		}

		.pdf-viewer {
			height: 60vh;
			min-height: 400px;
		}
	}
</style>