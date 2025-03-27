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
	.robot-container {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -20%);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.robot-message-group {
		position: relative;
		display: flex;
		align-items: flex-start;
	}

	.robot-image {
		width: auto;
		max-height: 280px;
		min-height: 240px;
		object-fit: contain;
	}

	.message-container {
		position: absolute;
		top: -30px; /* Position above the robot */
		left: 60%; /* Position to the right of robot's center */
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
	}

	.working_span {
		color: #a3a3a3;
		font-size: 20px;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		white-space: nowrap;
	}

	.vector-1 {
		width: 13px;
		height: 13px;
		background: #1e1f20;
		position: absolute;
		bottom: -13px;
		left: 13px; /* Align to the left side */
		clip-path: polygon(0 0, 100% 0, 50% 100%);
	}

	.status-container {
		margin-top: 30px;
		width: 120px;
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
	}

	@media (max-width: 1400px) {
		.robot-container {
			transform: translate(-50%, -15%);
		}

		.message-container {
			left: 60%; /* Maintain right position */
		}
	}

	@media (max-width: 1200px) {
		.robot-container {
			transform: translate(-50%, 0);
		}

		.message-container {
			left: 60%; /* Maintain right position */
		}
	}

	@media (max-height: 700px) {
		.robot-container {
			transform: translate(-50%, 0);
		}
	}

	/* Adjusted responsive styles to keep message above and to the right of robot */
	@media (max-width: 768px) {
		.message-container {
			left: 65%; /* Increase right position slightly on smaller screens */
		}

		.rectangle-10 {
			min-width: fit-content;
			padding: 0 15px;
			height: 40px; /* Slightly smaller height */
		}

		.working_span {
			font-size: 16px; /* Smaller font size for mobile */
		}
	}
</style>
