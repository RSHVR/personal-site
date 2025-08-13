<script>
	export let onOpenContactModal = () => {};
</script>

<div class="nav-bar flex items-center justify-between px-12">
	<div class="title-container">
		<h1 class="site-title">Arshveer Gahir</h1>
	</div>
	<div class="nav-links flex gap-8">
		<a href="/">Home</a>
		<a href="resume">Resume</a>
		<a href="/projects">Projects</a>
		<a href="/contact" class="contact-btn">Contact</a>
	</div>
</div>

<style>
	.nav-bar {
		display: flex !important;
		justify-content: space-between !important;
		align-items: center !important;
		padding-left: 196px !important;
		padding-right: 196px !important;
		width: 100vw !important;
	}

	.nav-links {
		display: flex !important;
		gap: 75px !important;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		font-size: 20px;
		color: #2a2a2a;
	}

	.nav-links a {
		text-decoration: none;
		color: inherit;
	}

	.nav-links a:hover {
		color: #989898;
	}

	.nav-links a.contact-btn {
		background: none;
		border: none;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		font-size: 20px;
		color: #ff611a;
		cursor: pointer;
		transition: color 0.3s ease;
		padding: 0;
	}

	.nav-links a.contact-btn:hover {
		color: #f98d5c;
	}

	.site-title {
		margin: 0;
		font-family: 'Nunito', sans-serif;
		font-weight: 400;
		font-size: 36px;
		color: #222222;
	}
</style>
