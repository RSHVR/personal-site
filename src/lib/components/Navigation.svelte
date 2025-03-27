<script lang="ts">
	import { onMount } from 'svelte';

	// Use callback props instead of createEventDispatcher
	export let onOpenContactModal: () => void;

	// Define type for navigation items
	type NavItem = {
		text: string;
		path: string | null;
		action?: string;
	};

	const navItems: NavItem[] = [
		{ text: 'Homepage', path: '/' },
		{ text: 'About', path: '/about' },
		{ text: 'Resume', path: '/resume' },
		{ text: 'Projects', path: '/projects' },
		{ text: 'Services', path: '/services' },
		{ text: 'Get in Touch', path: null, action: 'openContactModal' }
	];

	// Get all items except the last one (Get in Touch)
	const menuItems = navItems.slice(0, navItems.length - 1);
	const contactItem = navItems[navItems.length - 1];

	function handleNavClick(item: NavItem): void {
		if (item.action === 'openContactModal') {
			onOpenContactModal();
		}
		if (isMenuOpen) {
			isMenuOpen = false;
		}
	}

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Close menu when clicking outside
	let menuRef: HTMLDivElement;
	let burgerRef: HTMLButtonElement;

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isMenuOpen &&
				menuRef &&
				burgerRef &&
				!menuRef.contains(event.target as Node) &&
				!burgerRef.contains(event.target as Node)
			) {
				isMenuOpen = false;
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
</script>

<nav class="component-1">
	<!-- Hamburger menu for small screens -->
	<div class="mobile-menu">
		<button class="burger-button" on:click={toggleMenu} bind:this={burgerRef}>
			<div class="burger-icon" class:open={isMenuOpen}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</button>

		{#if isMenuOpen}
			<div class="dropdown-menu" bind:this={menuRef}>
				{#each menuItems as item, i}
					{#if item.path}
						<a href={item.path} class="dropdown-link" on:click={() => handleNavClick(item)}>
							<span class="dropdown-text">{item.text}</span>
						</a>
					{:else}
						<button class="dropdown-button" on:click={() => handleNavClick(item)}>
							<span class="dropdown-text">{item.text}</span>
						</button>
					{/if}
				{/each}
			</div>
		{/if}
	</div>

	<!-- Desktop menu items -->
	<div class="desktop-menu">
		{#each menuItems as item, i}
			{#if item.path}
				<a href={item.path} class="navigation-link">
					<div
						class="navigation navigation_{i ? `0${i}` : ''}"
						data-hover="False"
						data-selected="False"
					>
						<div class="text text_{i ? `0${i}` : ''}">
							<span class="text_span">{item.text}</span>
						</div>
					</div>
				</a>
			{:else}
				<button class="navigation-link navigation-button" on:click={() => handleNavClick(item)}>
					<div
						class="navigation navigation_{i ? `0${i}` : ''}"
						data-hover="False"
						data-selected="False"
					>
						<div class="text text_{i ? `0${i}` : ''}">
							<span class="text_span">{item.text}</span>
						</div>
					</div>
				</button>
			{/if}
		{/each}
	</div>

	<!-- "Get in Touch" button (always visible) -->
	<button
		class="navigation-link navigation-button contact-button"
		on:click={() => handleNavClick(contactItem)}
	>
		<div class="navigation navigation_contact" data-hover="False" data-selected="False">
			<div class="text text_contact">
				<span class="text_span">{contactItem.text}</span>
			</div>
		</div>
	</button>
</nav>

<style>
	.component-1 {
		padding: 14px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 20px;
		position: relative;
	}

	.navigation-link {
		text-decoration: none;
	}

	.navigation-button {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
	}

	.navigation {
		padding: 14px;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: background-color 0.3s;
	}

	.text_span {
		color: #2a2a2a;
		font-size: 20px;
		font-weight: 600;
		white-space: nowrap;
	}

	/* Mobile menu styling */
	.mobile-menu {
		display: none;
		position: relative;
	}

	.burger-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 10px;
		z-index: 11;
	}

	.burger-icon {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 24px;
		height: 18px;
	}

	.burger-icon span {
		display: block;
		height: 2px;
		width: 100%;
		background-color: #2a2a2a;
		transition: all 0.3s ease;
	}

	.burger-icon.open span:nth-child(1) {
		transform: translateY(8px) rotate(45deg);
	}

	.burger-icon.open span:nth-child(2) {
		opacity: 0;
	}

	.burger-icon.open span:nth-child(3) {
		transform: translateY(-8px) rotate(-45deg);
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		right: 0;
		background: white;
		border-radius: 10px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		padding: 10px 0;
		z-index: 10;
		min-width: 180px;
	}

	.dropdown-link,
	.dropdown-button {
		display: block;
		width: 100%;
		padding: 12px 20px;
		text-decoration: none;
		text-align: left;
		background: none;
		border: none;
		font: inherit;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.dropdown-link:hover,
	.dropdown-button:hover {
		background-color: #f5f5f5;
	}

	.dropdown-text {
		color: #2a2a2a;
		font-size: 18px;
		font-weight: 500;
	}

	/* Desktop menu (hidden on mobile) */
	.desktop-menu {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	@media (max-width: 768px) {
		.component-1 {
			padding: 20px;
			gap: 15px;
		}

		.mobile-menu {
			display: block;
			margin-right: auto; /* Push it to the left */
		}

		.desktop-menu {
			display: none; /* Hide regular menu on mobile */
		}

		.navigation {
			padding: 10px 15px;
		}

		.text_span {
			font-size: 18px;
		}
	}
</style>
