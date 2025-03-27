<div class="footer">
	<div class="footer-content">
		<div class="rectangle-line"></div>
		<div class="copyright">
			<span class="copyright-text">© Arshveer Gahir 2025</span>
		</div>
	</div>
</div>

<style>
	.footer {
		width: 100%;
		height: 60px; /* Fixed height */
		background: #131314;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative; /* Ensure footer maintains its position */
		z-index: 1; /* Ensure footer stays above content */
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 5px 0;
		box-sizing: border-box;
	}

	.rectangle-line {
		width: 50px;
		height: 2px;
		background: rgba(255, 97, 26, 0.7);
		border-radius: 20px;
		margin-bottom: 8px;
	}

	.copyright-text {
		color: #2a2a2a;
		font-size: 16px;
		font-family: 'Nunito', sans-serif;
		font-weight: 400;
		transition: font-size 0.3s ease;
	}

	/* Responsive adjustments while maintaining consistent height */
	/* Extra small (0-480px) */
	@media (max-width: 480px) {
		.rectangle-line {
			width: 40px;
			margin-bottom: 6px;
		}

		.copyright-text {
			font-size: 14px;
		}
	}

	/* Small and Medium (481-1279px) */
	@media (min-width: 481px) and (max-width: 1279px) {
		.rectangle-line {
			width: 45px;
			margin-bottom: 7px;
		}

		.copyright-text {
			font-size: 15px;
		}
	}
</style>
