<script>
	export let status = 'OFFLINE';
	export const color = '#c91313'; // Red color by default
</script>

<div class="status-container">
	<div class="status-indicator">
		<div class="status-dot"></div>
		<div class="status-text">
			<span class="status-label">{status}</span>
		</div>
	</div>
</div>

<style>
	.status-container {
		width: 120px;
		transition: width 0.3s ease;
	}

	.status-indicator {
		width: 100%;
		height: 25px;
		background: color-mix(in srgb, var(--color, #c91313) 20%, #000);
		border-radius: 100px;
		position: relative;
		display: flex;
		align-items: center;
		padding-left: 9px;
	}

	.status-dot {
		width: 12px;
		height: 12px;
		background: var(--color, #c91313);
		border-radius: 50%;
		flex-shrink: 0;
	}

	.status-text {
		margin-left: 7px;
		height: 100%;
		display: flex;
		align-items: center;
		flex-grow: 1;
		justify-content: center;
	}

	.status-label {
		color: var(--color, #c91313);
		font-size: 24px;
		font-family: 'Jersey 10', sans-serif;
		font-weight: 400;
		text-transform: uppercase;
		line-height: 25px;
		transition: font-size 0.3s ease;
	}

	/* Responsive styling */
	/* Extra small (0-480px) */
	@media (max-width: 480px) {
		.status-container {
			width: 100px;
		}

		.status-label {
			font-size: 18px;
		}
	}

	/* Small (481-768px) */
	@media (min-width: 481px) and (max-width: 768px) {
		.status-container {
			width: 108px;
		}

		.status-label {
			font-size: 20px;
		}
	}

	/* Medium (769-1279px) */
	@media (min-width: 769px) and (max-width: 1279px) {
		.status-container {
			width: 115px;
		}

		.status-label {
			font-size: 22px;
		}
	}

	/* Large (1280px+) */
	@media (min-width: 1280px) {
		.status-container {
			width: 120px;
		}

		.status-label {
			font-size: 24px;
		}
	}
</style>
