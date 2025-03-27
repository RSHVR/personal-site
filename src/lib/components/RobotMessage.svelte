<script>
	export let message = "I'm working on it";
</script>

<div class="robot-container">
	<div class="robot-message-group">
		<img src="/robot.png" alt="Robot" class="robot-image" />
		<div class="message-container">
			<div class="rectangle-10">
				<div class="im-working-as-fast-as-i-can">
					<span class="working_span">{message}</span>
				</div>
			</div>
			<div class="vector-1"></div>
		</div>
	</div>
	<div class="status-container">
		<div class="rectangle-1">
			<div class="ellipse-1"></div>
			<div class="offline">
				<span class="offline_span">OFFLINE</span>
			</div>
		</div>
	</div>
</div>

<style>
	/* Base styles - will apply to all screen sizes */
	.robot-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 320px;
		margin: 0 auto;
	}

	.robot-message-group {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.robot-image {
		width: auto;
		height: 280px; /* Desktop default */
		object-fit: contain;
		position: relative;
		transition: height 0.3s ease; /* Smooth transition for size changes */
	}

	.message-container {
		position: absolute;
		top: -30px;
		right: -80px;
		transition:
			top 0.3s ease,
			right 0.3s ease; /* Smooth transition for position changes */
	}

	.rectangle-10 {
		min-width: fit-content;
		height: 47px;
		background: #1e1f20;
		border-radius: 8px;
		display: flex;
		align-items: center;
		padding: 0 20px;
		white-space: nowrap;
		transition:
			height 0.3s ease,
			padding 0.3s ease; /* Smooth transition for size changes */
	}

	.working_span {
		color: #a3a3a3;
		font-size: 20px;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		white-space: nowrap;
		transition: font-size 0.3s ease; /* Smooth transition for font size changes */
	}

	.vector-1 {
		width: 13px;
		height: 13px;
		background: #1e1f20;
		position: absolute;
		bottom: -13px;
		left: 13px;
		clip-path: polygon(0 0, 100% 0, 50% 100%);
	}

	.status-container {
		margin-top: 20px;
		width: 120px;
		transition:
			width 0.3s ease,
			margin-top 0.3s ease; /* Smooth transition for size changes */
	}

	.rectangle-1 {
		width: 100%;
		height: 25px;
		background: #311c1c;
		border-radius: 100px;
		position: relative;
		display: flex;
		align-items: center;
		padding-left: 9px;
	}

	.ellipse-1 {
		width: 12px;
		height: 12px;
		background: #c91313;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.offline {
		margin-left: 7px;
		height: 100%;
		display: flex;
		align-items: center;
		flex-grow: 1;
		justify-content: center;
	}

	.offline_span {
		color: #c91313;
		font-size: 24px;
		font-family: 'Jersey 10', sans-serif;
		font-weight: 400;
		text-transform: uppercase;
		line-height: 25px;
		transition: font-size 0.3s ease; /* Smooth transition for font size changes */
	}

	/* Extra Small Mobile (320px - 480px) */
	@media (max-width: 480px) {
		.robot-container {
			max-width: 250px;
		}

		.robot-image {
			height: 180px; /* Phone size as specified */
		}

		.message-container {
			top: -20px;
			right: -50px;
		}

		.rectangle-10 {
			height: 35px;
			padding: 0 12px;
		}

		.working_span {
			font-size: 14px;
		}

		.status-container {
			width: 100px;
			margin-top: 12px;
		}

		.offline_span {
			font-size: 18px;
		}
	}

	/* Small Mobile landscape (481px - 600px) */
	@media (min-width: 481px) and (max-width: 600px) {
		.robot-container {
			max-width: 280px;
		}

		.robot-image {
			height: 180px; /* Phone size as specified */
		}

		.message-container {
			top: -22px;
			right: -60px;
		}

		.rectangle-10 {
			height: 38px;
			padding: 0 14px;
		}

		.working_span {
			font-size: 15px;
		}

		.status-container {
			width: 105px;
			margin-top: 14px;
		}

		.offline_span {
			font-size: 19px;
		}
	}

	/* Small Tablets portrait (601px - 768px) */
	@media (min-width: 601px) and (max-width: 768px) {
		.robot-container {
			max-width: 300px;
		}

		.robot-image {
			height: 240px; /* Tablet size as specified */
		}

		.message-container {
			top: -26px; /* Closer to large tablet value for smoother transition */
			right: -70px; /* Closer to large tablet value for smoother transition */
		}

		.rectangle-10 {
			height: 41px; /* Closer to large tablet value for smoother transition */
			padding: 0 17px; /* Closer to large tablet value for smoother transition */
		}

		.working_span {
			font-size: 17px; /* Match large tablet size for smoother transition */
		}

		.status-container {
			width: 112px; /* Closer to large tablet value for smoother transition */
			margin-top: 17px; /* Closer to large tablet value for smoother transition */
		}

		.offline_span {
			font-size: 21px; /* Closer to large tablet value for smoother transition */
		}
	}

	/* Large Tablets landscape (769px - 1024px) */
	@media (min-width: 769px) and (max-width: 1024px) {
		.robot-container {
			max-width: 310px;
		}

		.robot-image {
			height: 240px; /* Tablet size as specified */
		}

		.message-container {
			top: -28px;
			right: -73px; /* Closer to desktop value for smoother transition */
		}

		.rectangle-10 {
			height: 43px; /* Closer to desktop value for smoother transition */
			padding: 0 18px;
		}

		.working_span {
			font-size: 18px; /* Match desktop size for smoother transition */
		}

		.status-container {
			width: 115px;
			margin-top: 18px;
		}

		.offline_span {
			font-size: 22px;
		}
	}

	/* Small Desktops/Laptops (1025px - 1280px) */
	@media (min-width: 1025px) and (max-width: 1280px) {
		.robot-container {
			max-width: 320px;
		}

		.robot-image {
			height: 280px; /* Desktop size as specified */
		}

		.message-container {
			top: -30px;
			right: -75px;
		}

		.rectangle-10 {
			height: 45px;
			padding: 0 19px; /* Slightly increased for better transition */
		}

		.working_span {
			font-size: 18px;
		}

		.status-container {
			width: 118px;
		}

		.offline_span {
			font-size: 23px;
		}
	}

	/* For very short height screens */
	@media (max-height: 600px) {
		.robot-image {
			height: 160px;
		}

		.status-container {
			margin-top: 10px;
		}
	}
</style>
