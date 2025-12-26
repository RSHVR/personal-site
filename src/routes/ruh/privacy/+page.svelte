<script>
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Privacy Policy - ruh</title>
	<meta name="description" content="Privacy policy for ruh - AI Product Safety Analyzer" />
</svelte:head>

<div class="privacy-page" in:fade={{ duration: 300 }}>
	<div class="privacy-container">
		<header class="privacy-header">
			<a href=".." class="back-link">← Back to <span class="ruh-text">ruh</span></a>
			<h1>Privacy Policy</h1>
			<p class="last-updated">Last updated: January 2025</p>
		</header>

		<section class="privacy-section">
			<h2>Overview</h2>
			<p>
				<span class="ruh-text">ruh</span> is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
			</p>
		</section>

		<section class="privacy-section">
			<h2>Information We Collect</h2>
			<p>When you use <span class="ruh-text">ruh</span>, we collect:</p>
			<ul>
				<li><strong>Product URLs</strong> - The Amazon product pages you analyze</li>
				<li><strong>Analysis Results</strong> - Cached safety scores and ingredient data (stored for 30 days)</li>
				<li><strong>Usage Data</strong> - Anonymous analytics to improve the extension</li>
			</ul>
			<p>We do <strong>not</strong> collect:</p>
			<ul>
				<li>Personal identifying information</li>
				<li>Browsing history outside of analyzed products</li>
				<li>Payment or financial information</li>
			</ul>
		</section>

		<section class="privacy-section">
			<h2>How We Use Your Information</h2>
			<ul>
				<li><strong>Product Analysis</strong> - To analyze ingredients and generate safety scores</li>
				<li><strong>Caching</strong> - To provide faster results on repeat views</li>
				<li><strong>Improvement</strong> - To enhance accuracy and user experience</li>
			</ul>
		</section>

		<section class="privacy-section">
			<h2>Data Storage & Security</h2>
			<p>
				Analysis results are stored securely in our database for 30 days to enable fast repeat access. After 30 days, cached data is automatically deleted. We use industry-standard encryption and security practices to protect your data.
			</p>
		</section>

		<section class="privacy-section">
			<h2>Third-Party Services</h2>
			<p>
				<span class="ruh-text">ruh</span> uses the following third-party services:
			</p>
			<ul>
				<li><strong>Anthropic Claude AI</strong> - For ingredient analysis (subject to <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener">Anthropic's Privacy Policy</a>)</li>
				<li><strong>Supabase</strong> - For data storage (subject to <a href="https://supabase.com/privacy" target="_blank" rel="noopener">Supabase's Privacy Policy</a>)</li>
				<li><strong>Google Cloud</strong> - For hosting (subject to <a href="https://cloud.google.com/privacy" target="_blank" rel="noopener">Google's Privacy Policy</a>)</li>
			</ul>
		</section>

		<section class="privacy-section">
			<h2>Your Rights</h2>
			<p>You have the right to:</p>
			<ul>
				<li>Request deletion of your cached analysis data</li>
				<li>Opt out of analytics collection</li>
				<li>Uninstall the extension at any time</li>
			</ul>
		</section>

		<section class="privacy-section">
			<h2>Children's Privacy</h2>
			<p>
				<span class="ruh-text">ruh</span> is not intended for users under 13 years of age. We do not knowingly collect information from children.
			</p>
		</section>

		<section class="privacy-section">
			<h2>Changes to This Policy</h2>
			<p>
				We may update this privacy policy from time to time. Continued use of <span class="ruh-text">ruh</span> after changes constitutes acceptance of the updated policy.
			</p>
		</section>

		<section class="privacy-section">
			<h2>Contact</h2>
			<p>
				For privacy-related questions or data deletion requests, please contact us at <a href="mailto:ruh-support@rshvr.com">ruh-support@rshvr.com</a>.
			</p>
		</section>

		<footer class="privacy-footer">
			<a href="..">Back to <span class="ruh-text">ruh</span></a>
			<span>•</span>
			<a href="/">Home</a>
		</footer>
	</div>
</div>

<style>
	.privacy-page {
		min-height: 100vh;
		background: #fcf7f2;
		padding: 60px 20px;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		color: #3a3633;
	}

	.privacy-container {
		max-width: 800px;
		margin: 0 auto;
		background: rgba(255, 251, 245, 0.8);
		padding: 60px;
		border-radius: 16px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	}

	.privacy-header {
		margin-bottom: 48px;
		text-align: center;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 24px;
		color: #6b6560;
		text-decoration: none;
		font-size: 14px;
		transition: color 0.3s ease;
	}

	.back-link:hover {
		color: #3a3633;
	}

	.privacy-header h1 {
		font-size: 40px;
		font-weight: 600;
		margin: 0 0 12px 0;
		color: #3a3633;
	}

	.last-updated {
		font-size: 14px;
		color: #6b6560;
		margin: 0;
	}

	.privacy-section {
		margin-bottom: 40px;
	}

	.privacy-section h2 {
		font-size: 24px;
		font-weight: 600;
		margin: 0 0 16px 0;
		color: #3a3633;
	}

	.privacy-section p {
		font-size: 16px;
		line-height: 1.7;
		color: #6b6560;
		margin: 0 0 16px 0;
	}

	.privacy-section ul {
		margin: 16px 0;
		padding-left: 24px;
	}

	.privacy-section li {
		font-size: 16px;
		line-height: 1.7;
		color: #6b6560;
		margin-bottom: 8px;
	}

	.privacy-section a {
		color: #a8b89f;
		text-decoration: none;
		border-bottom: 1px solid rgba(168, 184, 159, 0.3);
		transition: border-color 0.3s ease;
	}

	.privacy-section a:hover {
		border-bottom-color: #a8b89f;
	}

	.ruh-text {
		font-family: 'Cormorant Infant', serif;
		font-style: italic;
		font-size: 1.1em;
	}

	.privacy-footer {
		margin-top: 60px;
		padding-top: 32px;
		border-top: 1px solid rgba(168, 184, 159, 0.2);
		text-align: center;
		display: flex;
		gap: 12px;
		justify-content: center;
		align-items: center;
	}

	.privacy-footer a {
		color: #6b6560;
		text-decoration: none;
		font-size: 14px;
		transition: color 0.3s ease;
	}

	.privacy-footer a:hover {
		color: #3a3633;
	}

	.privacy-footer span {
		color: #6b6560;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.privacy-container {
			padding: 40px 24px;
		}

		.privacy-header h1 {
			font-size: 32px;
		}

		.privacy-section h2 {
			font-size: 20px;
		}
	}

	@media (max-width: 480px) {
		.privacy-page {
			padding: 40px 16px;
		}

		.privacy-container {
			padding: 32px 20px;
		}

		.privacy-header h1 {
			font-size: 28px;
		}
	}
</style>
