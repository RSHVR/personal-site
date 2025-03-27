<script lang="ts">
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

	function handleNavClick(item: NavItem): void {
		if (item.action === 'openContactModal') {
			onOpenContactModal();
		}
	}
</script>

<nav class="component-1">
	{#each navItems as item, i}
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
</nav>

<style>
	.component-1 {
		padding: 14px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 20px;
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

	@media (max-width: 768px) {
		.component-1 {
			padding: 20px;
			flex-wrap: wrap;
			gap: 10px;
		}

		.navigation {
			padding: 10px 15px;
		}

		.text_span {
			font-size: 18px;
		}
	}
</style>
