<script>
	import { onMount } from 'svelte';
	import LiquidGlass from './LiquidGlass.svelte';

	let { onOpenContactModal = () => {} } = $props();

	let showToolsDropdown = $state(false);
	let showMobileMenu = $state(false);
	let dropdownElement;

	function toggleToolsDropdown() {
		showToolsDropdown = !showToolsDropdown;
	}

	function closeToolsDropdown() {
		showToolsDropdown = false;
	}

	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
	}

	function closeMobileMenu() {
		showMobileMenu = false;
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
		<a href="/" class="nav-home">Home</a>
		<a href="resume" class="nav-resume">Resume</a>
		<a href="/projects" class="nav-projects">Projects</a>
		<a href="/faq" class="nav-faq">FAQ</a>
		<div class="tools-dropdown" class:open={showToolsDropdown} bind:this={dropdownElement}>
			<button class="tools-btn" onclick={toggleToolsDropdown}>
				Products
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
					<a href="/ruh" class="dropdown-item" onclick={closeToolsDropdown}
						>ruh</a
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
		<div class="mobile-dock-wrapper" onclick={(e) => e.stopPropagation()}>
			<LiquidGlass contrast="light" roundness={24} blur={0.5} opacity={0.7}>
				<nav class="mobile-dock">
					<a href="/" class="dock-item" onclick={closeMobileMenu}>
						<svg class="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
							<polyline points="9 22 9 12 15 12 15 22"></polyline>
						</svg>
						<span class="dock-label">Home</span>
					</a>

					<a href="resume" class="dock-item" onclick={closeMobileMenu}>
						<svg class="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
							<polyline points="14 2 14 8 20 8"></polyline>
							<line x1="16" y1="13" x2="8" y2="13"></line>
							<line x1="16" y1="17" x2="8" y2="17"></line>
							<polyline points="10 9 9 9 8 9"></polyline>
						</svg>
						<span class="dock-label">Resume</span>
					</a>

					<a href="/projects" class="dock-item" onclick={closeMobileMenu}>
						<svg class="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
							<line x1="8" y1="21" x2="16" y2="21"></line>
							<line x1="12" y1="17" x2="12" y2="21"></line>
						</svg>
						<span class="dock-label">Projects</span>
					</a>

					<a href="/faq" class="dock-item" onclick={closeMobileMenu}>
						<svg class="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10"></circle>
							<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
							<line x1="12" y1="17" x2="12.01" y2="17"></line>
						</svg>
						<span class="dock-label">FAQ</span>
					</a>

					<div class="dock-divider"></div>

					<!-- Products section -->
					<button class="dock-item dock-dropdown-trigger" onclick={toggleToolsDropdown}>
						<svg class="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
							<polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
							<line x1="12" y1="22.08" x2="12" y2="12"></line>
						</svg>
						<span class="dock-label">Products</span>
						<svg class="dock-chevron" class:rotated={showToolsDropdown} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="15 18 9 12 15 6"></polyline>
						</svg>
					</button>

					{#if showToolsDropdown}
						<div class="dock-submenu">
							<a href="/ruh" class="dock-subitem" onclick={closeMobileMenu}>
								<span>ruh</span>
							</a>
						</div>
					{/if}

					<div class="dock-divider"></div>

					<a href="/contact" class="dock-item dock-contact" onclick={closeMobileMenu}>
						<svg class="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
							<polyline points="22,6 12,13 2,6"></polyline>
						</svg>
						<span class="dock-label">Contact</span>
					</a>
				</nav>
			</LiquidGlass>
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
		background: transparent;
		z-index: 999;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Vertical dock wrapper */
	.mobile-dock-wrapper {
		position: fixed;
		top: 50%;
		right: 20px;
		transform: translateY(-50%);
		z-index: 1000;
		animation: dockSlideIn 0.3s ease-out;
	}

	@keyframes dockSlideIn {
		from {
			opacity: 0;
			transform: translateY(-50%) translateX(20px);
		}
		to {
			opacity: 1;
			transform: translateY(-50%) translateX(0);
		}
	}

	/* The dock nav container */
	.mobile-dock {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px 12px;
		gap: 4px;
		min-width: 72px;
	}

	/* Individual dock items */
	.dock-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 10px 8px;
		border-radius: 12px;
		text-decoration: none;
		color: #2a2a2a;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: 'Nunito', sans-serif;
	}

	.dock-item:hover {
		background: rgba(0, 0, 0, 0.08);
	}

	.dock-item:active {
		transform: scale(0.95);
	}

	/* Dock icons */
	.dock-icon {
		width: 24px;
		height: 24px;
		stroke-linecap: round;
		stroke-linejoin: round;
		margin-bottom: 4px;
	}

	/* Dock labels */
	.dock-label {
		font-size: 11px;
		font-weight: 600;
		text-align: center;
		line-height: 1.2;
	}

	/* Dock divider */
	.dock-divider {
		width: 36px;
		height: 1px;
		background: rgba(0, 0, 0, 0.15);
		margin: 6px 0;
	}

	/* Products dropdown trigger */
	.dock-dropdown-trigger {
		position: relative;
	}

	.dock-chevron {
		width: 12px;
		height: 12px;
		position: absolute;
		right: 2px;
		top: 50%;
		transform: translateY(-50%);
		opacity: 0.5;
		transition: transform 0.2s ease;
	}

	.dock-chevron.rotated {
		transform: translateY(-50%) rotate(-90deg);
	}

	/* Dock submenu */
	.dock-submenu {
		width: 100%;
		padding: 4px 0;
		animation: submenuFade 0.2s ease-out;
	}

	@keyframes submenuFade {
		from {
			opacity: 0;
			transform: translateX(4px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.dock-subitem {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px 12px;
		border-radius: 8px;
		text-decoration: none;
		color: #2a2a2a;
		font-family: 'Nunito', sans-serif;
		font-size: 13px;
		font-weight: 600;
		transition: all 0.2s ease;
	}

	.dock-subitem:hover {
		background: rgba(0, 0, 0, 0.08);
	}

	/* Contact button styling */
	.dock-contact {
		color: #ff611a;
	}

	.dock-contact .dock-icon {
		stroke: #ff611a;
	}

	.dock-contact:hover {
		background: rgba(255, 97, 26, 0.1);
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
	}

	/* Tablet (481-1429px) */
	@media (min-width: 481px) and (max-width: 1429px) {
		.nav-bar {
			padding-left: 50px !important;
			padding-right: 50px !important;
			gap: 24px !important;
		}

		.site-title {
			font-size: 28px;
		}
	}

	/* All screens up to 1429px - show hamburger, hide desktop nav */
	@media (max-width: 1429px) {
		.hamburger-btn {
			display: block;
		}

		.desktop-nav {
			display: none !important;
		}
	}

	/* Desktop (1430px+) - show desktop nav, hide hamburger */
	@media (min-width: 1430px) {
		.hamburger-btn {
			display: none;
		}

		.desktop-nav {
			display: flex !important;
		}
	}
</style>
