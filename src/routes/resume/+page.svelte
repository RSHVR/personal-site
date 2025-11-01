<script>
	let resumePdfUrl =
		'https://drive.google.com/file/d/1D7C-sFgJRu8LgYVadnyGXSArgFKSaupb/view?usp=sharing';
	let googleViewerUrl = `https://drive.google.com/file/d/1D7C-sFgJRu8LgYVadnyGXSArgFKSaupb/preview`;
</script>

<svelte:head>
	<title>Arshveer Gahir</title>
	<meta name="description" content="View and download Arshveer Gahir's resume" />
</svelte:head>

<div class="resume-page">
	<div class="resume-header">
		<h1>Resume</h1>
		<a
			href={resumePdfUrl}
			download="Arshveer_Gahir_Resume.pdf"
			class="download-btn"
			target="_blank"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M12 16L16 12H13V4H11V12H8L12 16Z" fill="currentColor" />
				<path d="M20 18H4V20H20V18Z" fill="currentColor" />
			</svg>
			Download Resume
		</a>
	</div>

	<div class="pdf-container">
		<iframe src={googleViewerUrl} title="Arshveer Gahir Resume" class="pdf-viewer" frameborder="0"
		></iframe>
	</div>
</div>

<style>
	.resume-page {
		width: 100%;
		padding: 40px 196px 60px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: #fcf7f2;
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
		margin: 0 0 20px 0;
		font-size: 28px;
		font-weight: 400;
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
		position: relative;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		background: transparent;
		width: 100%;
	}

	.pdf-viewer {
		width: 70%;
		max-width: 800px;
		aspect-ratio: 8.5 / 11;
		height: auto;
		border: none;
		border-radius: 8px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.resume-page {
			padding: 20px 20px 40px;
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
			width: 90%;
		}
	}

	@media (max-width: 480px) {
		.resume-page {
			padding: 15px 15px 30px;
		}

		.download-btn {
			padding: 10px 20px;
			font-size: 14px;
		}

		.pdf-viewer {
			width: 100%;
			max-width: 100%;
		}
	}
</style>
