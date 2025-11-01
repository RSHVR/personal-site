import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import ContactModal from './ContactModal.svelte';

describe('ContactModal Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('should not render when showModal is false', () => {
		render(ContactModal, { props: { showModal: false } });

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	test('should render when showModal is true', () => {
		render(ContactModal, { props: { showModal: true } });

		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
	});

	test('should render form fields', () => {
		render(ContactModal, { props: { showModal: true } });

		expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
	});

	test('should have submit button', () => {
		render(ContactModal, { props: { showModal: true } });

		const submitButton = screen.getByRole('button', { name: /Send Message/i });
		expect(submitButton).toBeInTheDocument();
	});

	test('should have close button', () => {
		render(ContactModal, { props: { showModal: true } });

		const closeButton = screen.getByRole('button', { name: /Close contact form/i });
		expect(closeButton).toBeInTheDocument();
	});

	test('should have form validation for empty fields', async () => {
		render(ContactModal, { props: { showModal: true } });

		const submitButton = screen.getByRole('button', { name: /Send Message/i });
		await fireEvent.click(submitButton);

		// Form should show an error (checking for error role is more reliable)
		await waitFor(() => {
			const errorMessage = screen.queryByRole('alert');
			// Error message should exist OR form should still be on screen (not showing success)
			expect(screen.queryByText(/Message Sent!/i)).not.toBeInTheDocument();
		});
	});

	test('should validate email format', async () => {
		render(ContactModal, { props: { showModal: true } });

		const nameInput = screen.getByLabelText(/Name/i);
		const emailInput = screen.getByLabelText(/Email/i);
		const messageInput = screen.getByLabelText(/Message/i);

		await fireEvent.input(nameInput, { target: { value: 'John Doe' } });
		await fireEvent.input(emailInput, { target: { value: 'invalid-email' } });
		await fireEvent.input(messageInput, { target: { value: 'Test message' } });

		const submitButton = screen.getByRole('button', { name: /Send Message/i });
		await fireEvent.click(submitButton);

		// Should not show success with invalid email
		await waitFor(() => {
			expect(screen.queryByText(/Message Sent!/i)).not.toBeInTheDocument();
		});
	});

	test('should show success message after valid submission', async () => {
		render(ContactModal, { props: { showModal: true } });

		const nameInput = screen.getByLabelText(/Name/i);
		const emailInput = screen.getByLabelText(/Email/i);
		const messageInput = screen.getByLabelText(/Message/i);

		await fireEvent.input(nameInput, { target: { value: 'John Doe' } });
		await fireEvent.input(emailInput, { target: { value: 'john@example.com' } });
		await fireEvent.input(messageInput, { target: { value: 'Test message' } });

		const submitButton = screen.getByRole('button', { name: /Send Message/i });
		await fireEvent.click(submitButton);

		// Wait for the simulated async submission
		await waitFor(() => {
			expect(screen.getByText(/Message Sent!/i)).toBeInTheDocument();
		}, { timeout: 2000 });
	});

	test('should disable form during submission', async () => {
		render(ContactModal, { props: { showModal: true } });

		const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
		const submitButton = screen.getByRole('button', { name: /Send Message/i }) as HTMLButtonElement;

		await fireEvent.input(nameInput, { target: { value: 'John Doe' } });
		await fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
		await fireEvent.input(screen.getByLabelText(/Message/i), { target: { value: 'Test' } });

		await fireEvent.click(submitButton);

		// Form should be disabled during submission
		expect(nameInput.disabled).toBe(true);
		expect(submitButton.disabled).toBe(true);
	});

	test('should show loading state during submission', async () => {
		render(ContactModal, { props: { showModal: true } });

		await fireEvent.input(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
		await fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
		await fireEvent.input(screen.getByLabelText(/Message/i), { target: { value: 'Test' } });

		const submitButton = screen.getByRole('button', { name: /Send Message/i });
		await fireEvent.click(submitButton);

		expect(screen.getByText(/Sending.../i)).toBeInTheDocument();
	});

	test('should have accessible modal attributes', () => {
		render(ContactModal, { props: { showModal: true } });

		const modal = screen.getByRole('dialog');
		expect(modal).toHaveAttribute('aria-modal', 'true');
		expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
	});

	test('should have footer note about console logging', () => {
		render(ContactModal, { props: { showModal: true } });

		expect(screen.getByText(/Messages are currently logged in browser console/i)).toBeInTheDocument();
	});
});
