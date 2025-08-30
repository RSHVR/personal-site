<script>
	import { onMount } from 'svelte';

	export let onOpenContactModal = () => {};

	let showToolsDropdown = false;
	let dropdownElement;

	function toggleToolsDropdown() {
		showToolsDropdown = !showToolsDropdown;
	}

	function closeToolsDropdown() {
		showToolsDropdown = false;
	}

	function handleClickOutside(event) {
		if (dropdownElement && !dropdownElement.contains(event.target)) {
			closeToolsDropdown();
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="nav-bar flex items-center justify-between px-12">
	<div class="title-container">
		<h1 class="site-title">Arshveer Gahir</h1>
	</div>
	<div class="nav-links flex gap-8">
		<a href="/">Home</a>
		<a href="resume">Resume</a>
		<a href="/projects">Projects</a>
		<div class="tools-dropdown" class:open={showToolsDropdown} bind:this={dropdownElement}>
			<button class="tools-btn" onclick={toggleToolsDropdown}>
				Tools
				<svg
					class="dropdown-icon"
					class:rotated={showToolsDropdown}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{#if showToolsDropdown}
				<div class="dropdown-menu">
					<a href="/how-do-you-say" class="dropdown-item" onclick={closeToolsDropdown}
						>Translation Chatbot</a
					>
				</div>
			{/if}
		</div>
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

	.tools-dropdown {
		position: relative;
		display: inline-block;
	}

	.tools-btn {
		background: none;
		border: none;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		font-size: 20px;
		color: #2a2a2a;
		cursor: pointer;
		padding: 0;
		display: flex;
		align-items: center;
		gap: 4px;
		transition: color 0.3s ease;
	}

	.tools-btn:hover {
		color: #989898;
	}

	.dropdown-icon {
		width: 16px;
		height: 16px;
		transition: transform 0.2s ease;
	}

	.dropdown-icon.rotated {
		transform: rotate(180deg);
	}

	.dropdown-menu {
		position: absolute;
		top: calc(100% + 8px);
		left: 0;
		min-width: 160px;
		background: white;
		border: 1px solid #e5e5e5;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		animation: dropdownFade 0.15s ease-out;
	}

	@keyframes dropdownFade {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.dropdown-item {
		display: block;
		padding: 12px 16px;
		color: #2a2a2a;
		text-decoration: none;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		font-size: 16px;
		transition: all 0.2s ease;
		border-radius: 6px;
		margin: 4px;
	}

	.dropdown-item:hover {
		background: #f8f9fa;
		color: #ff611a;
	}
</style>
