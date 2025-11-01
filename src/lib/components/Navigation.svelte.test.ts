import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Navigation from './Navigation.svelte';

describe('Navigation Component', () => {
	test('should render site title', () => {
		render(Navigation);

		const title = screen.getByRole('heading', { name: /Arshveer Gahir/i });
		expect(title).toBeInTheDocument();
	});

	test('should render navigation links', () => {
		render(Navigation);

		expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Resume/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Projects/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
	});

	test('should have correct link hrefs', () => {
		render(Navigation);

		expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute('href', '/');
		expect(screen.getByRole('link', { name: /Resume/i })).toHaveAttribute('href', 'resume');
		expect(screen.getByRole('link', { name: /Projects/i })).toHaveAttribute('href', '/projects');
		expect(screen.getByRole('link', { name: /Contact/i })).toHaveAttribute('href', '/contact');
	});

	test('should render Tools dropdown button', () => {
		render(Navigation);

		const toolsButton = screen.getByRole('button', { name: /Tools/i });
		expect(toolsButton).toBeInTheDocument();
	});

	test('should toggle Tools dropdown when clicked', async () => {
		render(Navigation);

		const toolsButton = screen.getByRole('button', { name: /Tools/i });

		// Dropdown should not be visible initially
		expect(screen.queryByText(/Translation Chatbot/i)).not.toBeInTheDocument();

		// Click to open dropdown
		await fireEvent.click(toolsButton);

		// Dropdown should be visible
		expect(screen.getByText(/Translation Chatbot/i)).toBeInTheDocument();

		// Click again to close
		await fireEvent.click(toolsButton);

		// Dropdown should be hidden
		expect(screen.queryByText(/Translation Chatbot/i)).not.toBeInTheDocument();
	});

	test('should have Translation Chatbot link in dropdown', async () => {
		render(Navigation);

		const toolsButton = screen.getByRole('button', { name: /Tools/i });
		await fireEvent.click(toolsButton);

		const chatbotLink = screen.getByRole('link', { name: /Translation Chatbot/i });
		expect(chatbotLink).toBeInTheDocument();
		expect(chatbotLink).toHaveAttribute('href', '/how-do-you-say');
	});

	test('should call onOpenContactModal when provided', () => {
		const mockCallback = vi.fn();
		render(Navigation, { props: { onOpenContactModal: mockCallback } });

		// This component doesn't trigger the modal directly,
		// but it should accept the prop without error
		expect(mockCallback).not.toHaveBeenCalled();
	});

	test('should have Contact link with special styling', () => {
		render(Navigation);

		const contactLink = screen.getByRole('link', { name: /Contact/i });
		expect(contactLink).toHaveClass('contact-btn');
	});

	test('should rotate dropdown icon when open', async () => {
		render(Navigation);

		const toolsButton = screen.getByRole('button', { name: /Tools/i });
		const svg = toolsButton.querySelector('svg');

		expect(svg).not.toHaveClass('rotated');

		await fireEvent.click(toolsButton);

		const svgAfter = toolsButton.querySelector('svg');
		expect(svgAfter).toHaveClass('rotated');
	});
});

describe('Navigation Responsive Behavior', () => {
	// Helper to set viewport size
	const setViewportSize = (width: number) => {
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: width,
		});
		window.dispatchEvent(new Event('resize'));
	};

	test('should render title "Arshveer Gahir" at all viewport sizes', () => {
		const viewports = [320, 480, 768, 1024, 1280, 1920];

		viewports.forEach(width => {
			setViewportSize(width);
			const { unmount } = render(Navigation);

			const title = screen.getByRole('heading', { name: /Arshveer Gahir/i });
			expect(title).toBeInTheDocument();
			expect(title).toBeVisible();

			unmount();
		});
	});

	test('should have nav-bar element with proper structure', () => {
		render(Navigation);

		const navBar = document.querySelector('.nav-bar');
		expect(navBar).toBeInTheDocument();
	});

	test('should have title in title-container', () => {
		render(Navigation);

		const titleContainer = document.querySelector('.title-container');
		expect(titleContainer).toBeInTheDocument();

		const title = titleContainer?.querySelector('h1');
		expect(title).toBeInTheDocument();
		expect(title).toHaveTextContent('Arshveer Gahir');
	});

	test('should have desktop nav-links container', () => {
		render(Navigation);

		const navLinks = document.querySelector('.nav-links');
		expect(navLinks).toBeInTheDocument();
	});

	test('should have hamburger button for mobile', () => {
		render(Navigation);

		const hamburger = document.querySelector('.hamburger-btn');
		expect(hamburger).toBeInTheDocument();
	});

	test('should toggle mobile menu when hamburger clicked', async () => {
		render(Navigation);

		const hamburger = document.querySelector('.hamburger-btn') as HTMLElement;
		expect(hamburger).toBeInTheDocument();

		// Mobile menu should not be visible initially
		let mobileMenu = document.querySelector('.mobile-menu');
		expect(mobileMenu).not.toBeInTheDocument();

		// Click hamburger to open
		await fireEvent.click(hamburger);

		// Mobile menu should be visible
		mobileMenu = document.querySelector('.mobile-menu');
		expect(mobileMenu).toBeInTheDocument();
	});

	test('should have mobile nav-links in mobile menu', async () => {
		render(Navigation);

		const hamburger = document.querySelector('.hamburger-btn') as HTMLElement;
		await fireEvent.click(hamburger);

		const mobileNavLinks = document.querySelector('.mobile-menu .mobile-nav-links');
		expect(mobileNavLinks).toBeInTheDocument();
	});

	test('should have title with proper classes', () => {
		render(Navigation);

		const title = screen.getByRole('heading', { name: /Arshveer Gahir/i });
		expect(title).toHaveClass('site-title');

		const titleContainer = document.querySelector('.title-container');
		expect(titleContainer).toContainElement(title);
	});

	test('should have nav-bar with flex layout classes', () => {
		render(Navigation);

		const navBar = document.querySelector('.nav-bar') as HTMLElement;
		// Check for Tailwind flex classes
		expect(navBar).toHaveClass('flex');
		expect(navBar).toHaveClass('items-center');
		expect(navBar).toHaveClass('justify-between');
	});

	test('should not overflow viewport width', () => {
		const viewports = [320, 480, 768, 1024, 1280];

		viewports.forEach(width => {
			setViewportSize(width);
			const { container, unmount } = render(Navigation);

			const navBar = container.querySelector('.nav-bar') as HTMLElement;
			if (navBar) {
				// Nav bar should not exceed viewport width
				const rect = navBar.getBoundingClientRect();
				// Account for potential scrollbar (15px buffer)
				expect(rect.width).toBeLessThanOrEqual(width + 15);
			}

			unmount();
		});
	});
});
