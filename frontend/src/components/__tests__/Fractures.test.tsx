import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Fractures from '../Fractures'; // Adjust the import path based on your project structure
import { describe, it, expect, vi } from 'vitest';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecordIdProvider } from '../../hooks/RecordIdContext';

// Mock axios to simulate API requests using Vitest's vi.mock
vi.mock('axios', async (importOriginal) => {
  const actualAxios = await importOriginal();
  return {
    actualAxios,
    default: {
      actualAxios,
      post: vi.fn(() => Promise.resolve({ data: 'Success' })),
    },
  };
});

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <RecordIdProvider>
      {ui}
    </RecordIdProvider>
  );
};

describe('Fractures Component', () => {
  it('renders all form fields in step 1', () => {
    renderWithProviders(<Fractures />);

    // Check if the first step renders all fields
    expect(screen.getByLabelText(/Where is the fracture on the skull bone/i)).toBeInTheDocument();

  });

  it('renders all form fields in step 2', async () => {
    renderWithProviders(<Fractures />);

    // Move to the next step
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Ensure step 2 field render
    await waitFor(() => {
      expect(screen.getByLabelText(/If the fracture is in the thoracic spine/i)).toBeInTheDocument();
    });
  });

  it('renders all form fields in step 3', async () => {
    renderWithProviders(<Fractures />);

    // Move to step 3
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Ensure step 3 fields render
    await waitFor(() => {
      expect(screen.getByLabelText(/If the fracture is in the left ribs/i)).toBeInTheDocument();

    });
  });

  it('renders all form fields in step 4', async () => {
    renderWithProviders(<Fractures />);

    // Move to step 4
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Ensure step 4 fields render
    await waitFor(() => {
      expect(screen.getByLabelText(/If the fracture is in the right pelvis/i)).toBeInTheDocument();

    });
  });

  it('renders all form fields in step 5', async () => {
    renderWithProviders(<Fractures />);

    // Move to step 5
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Ensure step 5 fields render
    await waitFor(() => {
      expect(screen.getByLabelText(/If the fracture is in the right shoulder girdle/i)).toBeInTheDocument();

    });
  });

  it('renders all form fields in step 6', async () => {
    renderWithProviders(<Fractures />);

    // Move to step 6
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Ensure step 6 fields render
    await waitFor(() => {
      expect(screen.getByLabelText(/If the fracture is in the left lower limb/i)).toBeInTheDocument();
    });
  });

  it('submits the form on successful submission', async () => {
    renderWithProviders(
      <>
        <Fractures />
        <ToastContainer />
      </>
    );

    // Fill out fields for step 1
    fireEvent.change(screen.getByLabelText(/Where is the fracture on the skull bone/i), { target: { value: 'Frontal bone' } });

    // Move to step 2
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.change(screen.getByLabelText(/If the fracture is in the thoracic spine/i), { target: { value: 'T1' } });

    // Move to step 3
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Move to step 4
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Move to step 5
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Move to step 6 (final step)
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
  });
});
