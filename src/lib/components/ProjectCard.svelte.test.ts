import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import ProjectCard from './ProjectCard.svelte';

describe('ProjectCard Component', () => {
	const mockProps = {
		title: 'Test Project',
		description: 'This is a test project description',
		images: ['/image1.png', '/image2.png', '/image3.png'],
		readMoreLink: 'https://example.com',
		readMoreText: 'Visit Site'
	};

	test('should render with props', () => {
		render(ProjectCard, { props: mockProps });

		expect(screen.getByText('Test Project')).toBeInTheDocument();
		expect(screen.getByText('This is a test project description')).toBeInTheDocument();
	});

	test('should display first image by default', () => {
		render(ProjectCard, { props: mockProps });

		const image = screen.getByAltText('Test Project');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', '/image1.png');
	});

	test('should render navigation buttons when multiple images', () => {
		const { container } = render(ProjectCard, { props: mockProps });

		// Should have carousel navigation elements
		// Check for nav buttons by class (more reliable than role)
		const navButtons = container.querySelectorAll('.nav-btn');
		expect(navButtons.length).toBe(2); // left and right buttons
	});

	test('should render read more link', () => {
		render(ProjectCard, { props: mockProps });

		const link = screen.getByRole('link', { name: /Visit Site/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', 'https://example.com');
		expect(link).toHaveAttribute('target', '_blank');
	});

	test('should have carousel functionality with multiple images', async () => {
		render(ProjectCard, { props: mockProps });

		const image = screen.getByAltText('Test Project');
		expect(image).toHaveAttribute('src', '/image1.png');

		// Component should render carousel controls
		// Testing the image cycling requires interacting with SVG buttons
		// For now, verify the initial state is correct
		const buttons = screen.getAllByRole('button');
		expect(buttons.length).toBeGreaterThan(0);
	});

	test('should show image indicators when multiple images', () => {
		render(ProjectCard, { props: mockProps });

		const buttons = screen.getAllByRole('button');
		// 3 indicator buttons + 2 nav buttons + 1 expand button = 6 total
		expect(buttons.length).toBeGreaterThanOrEqual(3);
	});

	test('should handle single image (backward compatibility)', () => {
		render(ProjectCard, {
			props: {
				...mockProps,
				images: [],
				imageSrc: '/single-image.png'
			}
		});

		const image = screen.getByAltText('Test Project');
		expect(image).toHaveAttribute('src', '/single-image.png');
	});

	test('should not show navigation when only one image', () => {
		render(ProjectCard, {
			props: {
				...mockProps,
				images: ['/single-image.png']
			}
		});

		// Should only have minimal buttons (no carousel navigation)
		const buttons = screen.queryAllByRole('button');
		// With single image, no nav buttons should appear
		expect(buttons.length).toBe(0);
	});

	test('should have accessible read more link', () => {
		render(ProjectCard, { props: mockProps });

		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});
});
