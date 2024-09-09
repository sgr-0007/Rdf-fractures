import { render, screen, fireEvent } from '@testing-library/react';
import ChildDetails from '../ChildDetailsCapture'; 
import { describe, it } from 'vitest';
import { RecordIdProvider } from '../../hooks/RecordIdContext';

// Mock the child components to avoid rendering them in the tests
vi.mock('../components/FamilyHistory', () => ({
  default: () => <div>Mock FamilyHistory Component</div>,
}));

vi.mock('../components/Fractures', () => ({
  default: () => <div>Mock Fractures Component</div>,
}));

describe('ChildDetails Component', () => {
  // Wrap the component in RecordIdProvider
  const renderWithProvider = (ui: React.ReactNode) => {
    return render(
      <RecordIdProvider>
        {ui}
      </RecordIdProvider>
    );
  };

  it('renders FamilyHistory component by default', () => {
    renderWithProvider(<ChildDetails />);

    // Check if the default "Patient Family History" tab is active and renders FamilyHistory component
    expect(screen.getByText(/Patient Family History/i)).toBeInTheDocument();
  });

  it('switches to the Fractures tab and renders Fractures component', () => {
    renderWithProvider(<ChildDetails />);

    // Click the "Fractures" tab
    fireEvent.click(screen.getByText(/Fractures/i));

    // Check if the "Fractures" tab is now active and renders Fractures component
    expect(screen.getByText(/Fractures/i)).toBeInTheDocument();
  });

  it('applies the correct styling to active and inactive tabs', () => {
    renderWithProvider(<ChildDetails />);

    // Check that "Patient Family History" tab is active and "Fractures" is inactive by default
    const familyTab = screen.getByText(/Patient Family History/i);
    const fracturesTab = screen.getByText(/Fractures/i);

    expect(familyTab).toHaveClass('bg-black text-white');
    expect(fracturesTab).toHaveClass('bg-gray-400');

    // Switch to the "Fractures" tab
    fireEvent.click(fracturesTab);

    // Check that "Fractures" tab is now active and "Patient Family History" is inactive
    expect(fracturesTab).toHaveClass('bg-black text-white');
    expect(familyTab).toHaveClass('bg-gray-400');
  });
});
