<script>
	import { onMount } from 'svelte';

	let { onOpenContactModal = () => {} } = $props();

	let showToolsDropdown = $state(false);
	let showMoreDropdown = $state(false);
	let showMobileMenu = $state(false);
	let dropdownElement;
	let moreDropdownElement;

	function toggleToolsDropdown() {
		showToolsDropdown = !showToolsDropdown;
		showMoreDropdown = false;
	}

	function closeToolsDropdown() {
		showToolsDropdown = false;
	}

	function toggleMoreDropdown() {
		showMoreDropdown = !showMoreDropdown;
		showToolsDropdown = false;
	}

	function closeMoreDropdown() {
		showMoreDropdown = false;
	}

	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
	}

	function closeMobileMenu() {
		showMobileMenu = false;
		showToolsDropdown = false;
		showMoreDropdown = false;
	}

	function handleClickOutside(event) {
		if (dropdownElement && !dropdownElement.contains(event.target)) {
			closeToolsDropdown();
		}
		if (moreDropdownElement && !moreDropdownElement.contains(event.target)) {
			closeMoreDropdown();
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

	<!-- Hamburger button (mobile only) -->
	<button class="hamburger-btn" onclick={toggleMobileMenu} aria-label="Toggle menu">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			{#if showMobileMenu}
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			{:else}
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			{/if}
		</svg>
	</button>

	<!-- Desktop navigation -->
	<div class="nav-links desktop-nav flex gap-8">
		<!-- Menu dropdown (progressively shows hidden items) -->
		<div class="more-dropdown" class:open={showMoreDropdown} bind:this={moreDropdownElement}>
			<button class="more-btn" onclick={toggleMoreDropdown}>
				Menu
				<svg
					class="dropdown-icon"
					class:rotated={showMoreDropdown}
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
			{#if showMoreDropdown}
				<div class="dropdown-menu">
					<a href="/" class="dropdown-item nav-home" onclick={closeMoreDropdown}>Home</a>
					<a href="resume" class="dropdown-item nav-resume" onclick={closeMoreDropdown}>Resume</a>
					<a href="/projects" class="dropdown-item nav-projects" onclick={closeMoreDropdown}
						>Projects</a
					>
				</div>
			{/if}
		</div>

		<a href="/" class="nav-home">Home</a>
		<a href="resume" class="nav-resume">Resume</a>
		<a href="/projects" class="nav-projects">Projects</a>
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

<!-- Mobile menu overlay -->
{#if showMobileMenu}
	<div class="mobile-menu-overlay" onclick={closeMobileMenu}>
		<div class="mobile-menu" onclick={(e) => e.stopPropagation()}>
			<nav class="mobile-nav-links">
				<a href="/" onclick={closeMobileMenu}>Home</a>
				<a href="resume" onclick={closeMobileMenu}>Resume</a>
				<a href="/projects" onclick={closeMobileMenu}>Projects</a>

				<!-- Mobile tools section -->
				<div class="mobile-tools">
					<button class="mobile-tools-btn" onclick={toggleToolsDropdown}>
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
						<div class="mobile-dropdown-menu">
							<a href="/how-do-you-say" onclick={closeMobileMenu}>Translation Chatbot</a>
						</div>
					{/if}
				</div>

				<a href="/contact" class="mobile-contact-btn" onclick={closeMobileMenu}>Contact</a>
			</nav>
		</div>
	</div>
{/if}

<style>
	.nav-bar {
		display: flex !important;
		justify-content: space-between !important;
		align-items: center !important;
		gap: 180px !important;
		padding-left: 196px !important;
		padding-right: 196px !important;
		width: 100% !important;
		max-width: 100% !important;
		box-sizing: border-box !important;
	}

	.nav-links {
		display: flex !important;
		gap: 40px !important;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		font-size: 20px;
		color: #2a2a2a;
		flex-shrink: 0;
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
		font-weight: 500;
		font-size: 36px;
		color: #222222;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex-shrink: 0;
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

	/* More dropdown */
	.more-dropdown {
		position: relative;
		display: none;
	}

	.more-btn {
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

	.more-btn:hover {
		color: #989898;
	}

	/* Hamburger button - hidden on desktop */
	.hamburger-btn {
		display: none;
		background: none;
		border: none;
		color: #222222;
		cursor: pointer;
		padding: 8px;
		transition: color 0.3s ease;
	}

	.hamburger-btn:hover {
		color: #989898;
	}

	/* Mobile menu overlay */
	.mobile-menu-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Mobile menu drawer */
	.mobile-menu {
		position: fixed;
		top: 0;
		right: 0;
		width: min(280px, 85vw);
		max-width: 100vw;
		height: 100vh;
		background: #fcf7f2;
		box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		animation: slideIn 0.3s ease-out;
		overflow-y: auto;
		box-sizing: border-box;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.mobile-nav-links {
		display: flex;
		flex-direction: column;
		padding: 80px 30px 30px;
		gap: 24px;
	}

	.mobile-nav-links a {
		text-decoration: none;
		color: #2a2a2a;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		font-size: 20px;
		padding: 12px 0;
		border-bottom: 1px solid #e0e0e0;
		transition: color 0.3s ease;
	}

	.mobile-nav-links a:hover {
		color: #989898;
	}

	.mobile-contact-btn {
		color: #ff611a !important;
	}

	.mobile-contact-btn:hover {
		color: #f98d5c !important;
	}

	/* Mobile tools dropdown */
	.mobile-tools {
		display: flex;
		flex-direction: column;
	}

	.mobile-tools-btn {
		background: none;
		border: none;
		font-family: 'Nunito', sans-serif;
		font-weight: 600;
		font-size: 20px;
		color: #2a2a2a;
		cursor: pointer;
		padding: 12px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #e0e0e0;
		transition: color 0.3s ease;
		text-align: left;
	}

	.mobile-tools-btn:hover {
		color: #989898;
	}

	.mobile-dropdown-menu {
		padding-left: 20px;
		animation: slideDown 0.2s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			max-height: 0;
		}
		to {
			opacity: 1;
			max-height: 100px;
		}
	}

	.mobile-dropdown-menu a {
		border: none;
		font-size: 18px;
		padding: 8px 0;
	}

	/* Responsive styles */

	/* Mobile (0-480px) */
	@media (max-width: 480px) {
		.nav-bar {
			padding-left: 15px !important;
			padding-right: 15px !important;
			gap: 16px !important;
		}

		.site-title {
			font-size: 24px;
		}

		.hamburger-btn {
			display: block;
		}

		.desktop-nav {
			display: none !important;
		}
	}

	/* Small tablet (481-768px) */
	@media (min-width: 481px) and (max-width: 768px) {
		.nav-bar {
			padding-left: 30px !important;
			padding-right: 30px !important;
			gap: 24px !important;
		}

		.site-title {
			font-size: 24px;
		}

		.hamburger-btn {
			display: block;
		}

		.desktop-nav {
			display: none !important;
		}
	}

	/* Medium tablet/small desktop (769-1200px) */
	@media (min-width: 769px) and (max-width: 1200px) {
		.nav-bar {
			padding-left: 100px !important;
			padding-right: 100px !important;
			gap: 32px !important;
		}

		.site-title {
			font-size: 28px;
		}

		.nav-links {
			gap: 24px !important;
		}

		/* Progressive hiding - start showing More dropdown */
		/* Hide Home, Resume, Projects in nav-links, show in More dropdown */
		.nav-links > .nav-home,
		.nav-links > .nav-resume,
		.nav-links > .nav-projects {
			display: none !important;
		}

		.more-dropdown {
			display: inline-block !important;
		}

		/* Hide items not yet collapsed from More dropdown */
		.more-dropdown .nav-home,
		.more-dropdown .nav-resume,
		.more-dropdown .nav-projects {
			display: block !important;
		}
	}

	/* Large desktop (900-1023px) - Hide Home + Resume */
	@media (min-width: 900px) and (max-width: 1023px) {
		.nav-links > .nav-home,
		.nav-links > .nav-resume {
			display: none !important;
		}

		.nav-links > .nav-projects {
			display: inline !important;
		}

		.more-dropdown {
			display: inline-block !important;
		}

		.more-dropdown .nav-home,
		.more-dropdown .nav-resume {
			display: block !important;
		}

		.more-dropdown .nav-projects {
			display: none !important;
		}
	}

	/* Extra large desktop (1024-1200px) - Hide only Home */
	@media (min-width: 1024px) and (max-width: 1200px) {
		.nav-links > .nav-home {
			display: none !important;
		}

		.nav-links > .nav-resume,
		.nav-links > .nav-projects {
			display: inline !important;
		}

		.more-dropdown {
			display: inline-block !important;
		}

		.more-dropdown .nav-home {
			display: block !important;
		}

		.more-dropdown .nav-resume,
		.more-dropdown .nav-projects {
			display: none !important;
		}
	}

	/* Full desktop (1201px+) - Show all nav items, hide More dropdown */
	@media (min-width: 1201px) {
		.nav-links > .nav-home,
		.nav-links > .nav-resume,
		.nav-links > .nav-projects {
			display: inline !important;
		}

		.more-dropdown {
			display: none !important;
		}
	}
</style>
