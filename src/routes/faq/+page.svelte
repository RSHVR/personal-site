<script>
	import LiquidGlass from '$lib/components/LiquidGlass.svelte';
</script>

<div class="page-content">
	<div class="faq-header">
		<h1>Frequently Asked Questions</h1>
		<p class="subtitle">For employers, co-workers, and clients</p>
	</div>

	<div class="faq-sections">
		<section class="faq-section">
			<h2>Work Style & Collaboration</h2>

			<div class="faq-item">
				<h3>How do you prefer to communicate on projects?</h3>
				<p>I favor email for async updates and documentation, paired with video calls for deeper discussions, brainstorming, or anything that benefits from real-time dialogue. Clear, written communication keeps everyone aligned while calls build rapport and move decisions forward faster.</p>
			</div>

			<div class="faq-item">
				<h3>What's your availability and timezone?</h3>
				<p>I'm based in Toronto (Eastern Time) and typically maintain flexible hours. I can accommodate calls across North American timezones comfortably, and I'm happy to find overlap windows for international collaboration when needed.</p>
			</div>

			<div class="faq-item">
				<h3>How do you approach deadlines and project management?</h3>
				<p>I break work into clear milestones with regular check-ins. If something's at risk, I communicate early rather than late. I'd rather flag a potential delay proactively than surprise anyone at the deadline.</p>
			</div>

			<div class="faq-item">
				<h3>Do you work better independently or in teams?</h3>
				<p>I'm collaborative by nature and thrive when working closely with product managers, designers, and other engineers. That said, I'm equally comfortable taking ownership of a workstream and driving it independently when the situation calls for it.</p>
			</div>
		</section>

		<section class="faq-section">
			<h2>Technical Expertise & Approach</h2>

			<div class="faq-item">
				<h3>What's your primary tech stack?</h3>
				<p>Python is my go-to for ML/AI work, with TypeScript for full-stack development. I work extensively with cloud platforms (AWS, GCP), modern ML frameworks (PyTorch, scikit-learn), and vector databases. For web applications, I lean toward SvelteKit, React, and Node.js.</p>
			</div>

			<div class="faq-item">
				<h3>How do you approach AI/ML problems?</h3>
				<p>Business outcome first, technology second. I start by understanding what success looks like from a user or business perspective, then work backward to determine the right technical approach. Not every problem needs deep learning. Sometimes a well-tuned heuristic or simpler model delivers better ROI.</p>
			</div>

			<div class="faq-item">
				<h3>What types of projects excite you most?</h3>
				<p>Projects that sit at the intersection of meaningful impact and interesting technical challenges. I'm particularly drawn to work where AI can tangibly improve people's lives or help businesses operate more effectively, not just AI for its own sake.</p>
			</div>

			<div class="faq-item">
				<h3>How do you stay current with rapidly evolving AI technology?</h3>
				<p>Continuous hands-on experimentation. I build side projects to test new frameworks and models, follow key researchers and practitioners, and maintain a habit of reading papers alongside implementation. The best way to understand a technology is to ship something with it.</p>
			</div>
		</section>

		<section class="faq-section">
			<h2>Hiring & Engagement</h2>

			<div class="faq-item">
				<h3>Are you available for new work?</h3>
				<p>Yes, I'm currently open to opportunities, including full-time roles and contract/consulting engagements. I'm selective about fit, looking for teams building products that matter with people I can learn from.</p>
			</div>

			<div class="faq-item">
				<h3>What's the best way to engage your services?</h3>
				<p>Reach out via <a href="/contact">email or book a call</a> directly on my calendar. I respond to all inquiries within 24-48 hours and am happy to jump on a quick intro call to discuss your needs.</p>
			</div>

			<div class="faq-item">
				<h3>Do you consider full-time roles or only contract work?</h3>
				<p>I'm open to both. For the right opportunity with a mission I believe in and a team I'd be excited to join, full-time is absolutely on the table. For shorter-term needs or specialized projects, contract arrangements often make more sense.</p>
			</div>

			<div class="faq-item">
				<h3>What does your typical engagement process look like?</h3>
				<p>It usually starts with a discovery call to understand your goals and challenges. From there, I'll outline a scope and approach, we'll align on timeline and terms, and then we get to work. I prefer starting with a focused initial phase that delivers tangible value before expanding scope.</p>
			</div>
		</section>
	</div>

	<div class="faq-cta-wrapper">
		<LiquidGlass contrast="light" roundness={12} blur={4} opacity={0.3}>
			<div class="faq-cta">
				<p>Have a question that's not answered here?</p>
				<a href="/contact" class="contact-link">Let's talk</a>
			</div>
		</LiquidGlass>
	</div>
</div>

<style>
	.page-content {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 40px 20px 80px;
		box-sizing: border-box;
	}

	.faq-header {
		margin-bottom: 48px;
		text-align: center;
	}

	.faq-header h1 {
		font-size: 32px;
		font-weight: 400;
		color: #222222;
		margin: 0 0 12px 0;
	}

	.subtitle {
		font-size: 16px;
		color: #666666;
		margin: 0;
		font-weight: 300;
	}

	.faq-sections {
		display: flex;
		flex-direction: column;
		gap: 48px;
	}

	.faq-section h2 {
		font-size: 20px;
		font-weight: 500;
		color: #222222;
		margin: 0 0 24px 0;
		padding-bottom: 12px;
		border-bottom: 1px solid #e0e0e0;
	}

	.faq-item {
		margin-bottom: 24px;
	}

	.faq-item:last-child {
		margin-bottom: 0;
	}

	.faq-item h3 {
		font-size: 16px;
		font-weight: 500;
		color: #333333;
		margin: 0 0 8px 0;
	}

	.faq-item p {
		font-size: 15px;
		font-weight: 300;
		color: #444444;
		line-height: 1.6;
		margin: 0;
	}

	.faq-item a {
		color: inherit;
		text-decoration: underline;
		text-decoration-color: #999999;
		text-underline-offset: 2px;
	}

	.faq-item a:hover {
		text-decoration-color: #333333;
	}

	.faq-cta-wrapper {
		margin-top: 64px;
	}

	.faq-cta {
		text-align: center;
		padding: 32px;
	}

	.faq-cta p {
		font-size: 16px;
		color: #666666;
		margin: 0 0 16px 0;
	}

	.contact-link {
		display: inline-block;
		font-size: 16px;
		font-weight: 500;
		color: #ff611a;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.contact-link:hover {
		color: #f98d5c;
	}

	/* Responsive styles */
	@media (max-width: 480px) {
		.page-content {
			padding: 30px 15px 60px;
		}

		.faq-header {
			margin-bottom: 36px;
		}

		.faq-header h1 {
			font-size: 26px;
		}

		.subtitle {
			font-size: 14px;
		}

		.faq-sections {
			gap: 40px;
		}

		.faq-section h2 {
			font-size: 18px;
		}

		.faq-item h3 {
			font-size: 15px;
		}

		.faq-item p {
			font-size: 14px;
		}

		.faq-cta-wrapper {
			margin-top: 48px;
		}

		.faq-cta {
			padding: 24px 20px;
		}
	}

	@media (min-width: 481px) and (max-width: 768px) {
		.page-content {
			padding: 40px 30px 70px;
		}

		.faq-header h1 {
			font-size: 28px;
		}
	}

	@media (min-width: 769px) {
		.page-content {
			padding: 60px 40px 100px;
		}

		.faq-header h1 {
			font-size: 36px;
		}

		.faq-header {
			margin-bottom: 56px;
		}

		.faq-section h2 {
			font-size: 22px;
		}

		.faq-item h3 {
			font-size: 17px;
		}

		.faq-item p {
			font-size: 16px;
		}
	}
</style>
