import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('Home Page (+page.svelte)', () => {
	test('should render greeting heading', () => {
		render(Page);
		const greeting = screen.getByText(/Hi, I am Veer/i);
		expect(greeting).toBeInTheDocument();
	});

	test('should render intro paragraph with company links', () => {
		render(Page);
		expect(screen.getByText(/product-focused ML\/AI Engineer/i)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Capfluence/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Highlyte/i })).toBeInTheDocument();
	});

	test('should render projects section heading', () => {
		render(Page);
		const projectsHeading = screen.getByRole('heading', { name: /Recent Projects/i });
		expect(projectsHeading).toBeInTheDocument();
	});

	test('should render "see all" link for projects', () => {
		render(Page);
		const seeAllLink = screen.getByRole('link', { name: /see all/i });
		expect(seeAllLink).toBeInTheDocument();
		expect(seeAllLink).toHaveAttribute('href', '/projects');
	});

	test('should render profile image', () => {
		render(Page);
		const profileImage = screen.getByAltText(/profile picture/i);
		expect(profileImage).toBeInTheDocument();
		expect(profileImage).toHaveAttribute('src', '/profile-image.png');
	});

	test('should render tech stack carousel', () => {
		render(Page);
		// Check for tech stack images (carousel duplicates them, so use getAllBy)
		const dockerImages = screen.getAllByAltText(/docker/i);
		expect(dockerImages.length).toBeGreaterThan(0);
		expect(dockerImages[0]).toBeInTheDocument();
	});

	test('should render project cards', () => {
		render(Page);
		// Check for Capfluence project
		expect(screen.getByText(/Capfluence - Leads Generation/i)).toBeInTheDocument();
		// Check for Highlyte project
		expect(screen.getByText(/Highlyte - Compliance/i)).toBeInTheDocument();
	});
});
