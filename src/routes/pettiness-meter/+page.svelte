<svelte:head>
	<title>Pettiness Meter | Arshveer Gahir</title>
	<meta name="description" content="Pettiness Meter - A Claude Artifact by Arshveer Gahir" />
</svelte:head>

<div class="pettiness-meter-page">
	<div class="page-header">
		<h1>Pettiness Meter</h1>
		<p class="subtitle">A Claude Artifact</p>
	</div>

	<div class="iframe-container">
		<iframe
			src="https://claude.site/public/artifacts/caec517e-1c57-4795-ac51-8bf0446cfee6/embed"
			title="Pettiness Meter - Claude Artifact"
			width="100%"
			height="600"
			frameborder="0"
			allow="clipboard-write"
			allowfullscreen
		></iframe>
	</div>
</div>

<style>
	.pettiness-meter-page {
		width: 100%;
		min-height: 100vh;
		padding: 40px 196px 100px 196px;
		box-sizing: border-box;
		background: #fcf7f2;
	}

	.page-header {
		margin-bottom: 40px;
		padding-bottom: 20px;
		border-bottom: 1px solid #e0e0e0;
	}

	.page-header h1 {
		margin: 0 0 8px 0;
		font-size: 28px;
		font-weight: 400;
		color: #222222;
		font-family: 'Nunito', sans-serif;
	}

	.subtitle {
		margin: 0;
		font-size: 14px;
		color: #666666;
		font-weight: 300;
	}

	.iframe-container {
		width: 100%;
		border-radius: 12px;
		overflow: hidden;
		background: #ffffff;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}

	.iframe-container iframe {
		display: block;
	}

	/* Responsive design */
	@media (max-width: 1200px) {
		.pettiness-meter-page {
			padding: 40px 100px 80px 100px;
		}
	}

	@media (max-width: 768px) {
		.pettiness-meter-page {
			padding: 30px 20px 60px 20px;
		}

		.page-header h1 {
			font-size: 24px;
		}
	}

	@media (max-width: 480px) {
		.pettiness-meter-page {
			padding: 20px 15px 40px 15px;
		}

		.page-header h1 {
			font-size: 20px;
		}

		.iframe-container iframe {
			height: 500px;
		}
	}
</style>
