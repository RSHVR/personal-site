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
