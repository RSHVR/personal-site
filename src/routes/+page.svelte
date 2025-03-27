<script>
	import RobotMessage from '$lib/components/RobotMessage.svelte';
</script>

<div class="site-under-construction">
	<span class="siteunderconstruction_span">Site Under Construction</span>
</div>

<RobotMessage message="I'm working on it" />

<style>
	.site-under-construction {
		position: absolute;
		left: 50%;
		top: 20%;
		transform: translateX(-50%);
		text-align: center;
		width: 100%;
	}

	.siteunderconstruction_span {
		color: #a3a3a3;
		font-size: min(96px, 18vw);
		font-family: 'Jersey 10', sans-serif;
		font-weight: 400;
		letter-spacing: 2px;
		white-space: wrap;
	}

	@media (max-width: 1200px) {
		.site-under-construction {
			top: 15%;
		}
	}

	@media (max-width: 768px) {
		.site-under-construction {
			top: 10%;
		}
	}

	@media (max-height: 700px) {
		.site-under-construction {
			top: 15%;
		}
	}
</style>
