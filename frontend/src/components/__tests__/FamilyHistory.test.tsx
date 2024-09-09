import { render, screen, fireEvent } from '@testing-library/react';
import FamilyHistory from '../FamilyHistory'; // Adjust the import path based on your project structure
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

describe('FamilyHistory Component', () => {
  it('renders all form fields in step 1', () => {
    renderWithProviders(<FamilyHistory />);

    // Check if the first step renders fields
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sex/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Who lives at home/i)).toBeInTheDocument();
  });

  it('Go to step 2', async () => {
    renderWithProviders(<FamilyHistory />);

    // Move to the next step
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(screen.getByLabelText(/Date of Visit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Who was with the child/i)).toBeInTheDocument();

  });

  it('Go to step 3', () => {
    renderWithProviders(<FamilyHistory />);
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(screen.getByLabelText(/Is the family known/i)).toBeInTheDocument();


  });

  it('Go to step 4', () => {
    renderWithProviders(<FamilyHistory />);
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(screen.getByLabelText(/Is the child normally able to walk or cruise/i)).toBeInTheDocument();
  });

  it('submits the form on successful submission', async () => {
    renderWithProviders(
      <>
        <FamilyHistory />
        <ToastContainer />
      </>
    );

    // Fill out fields for step 1
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText(/Sex/i), { target: { value: 'Male' } });

    // Move to step 2
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Fill out fields for step 2
    fireEvent.change(screen.getByLabelText(/Date of Visit/i), { target: { value: '2023-01-15' } });

    // Move to step 3
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Move to step 4 (final step)
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

  });
});
