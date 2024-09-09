import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for Link rendering
import Header from '../Header'; // Adjust the import path as necessary

describe('Header Component', () => {
  it('renders the header with title and links', () => {
    // Render the component wrapped in BrowserRouter for Link to work properly
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText(/Fracture Log/i)).toBeInTheDocument();

    // Check if the links are rendered
    const recordLink = screen.getByText(/Record/i);
    const viewLink = screen.getByText(/View/i);

    expect(recordLink).toBeInTheDocument();
    expect(viewLink).toBeInTheDocument();

    // Ensure the links point to the correct routes
    expect(recordLink.closest('a')).toHaveAttribute('href', '/childdetails');
    expect(viewLink.closest('a')).toHaveAttribute('href', '/rdfdatarender');
  });

  it('applies the correct styling to title and navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Check if title has correct classes
    const title = screen.getByText(/Fracture Log/i);
    expect(title).toHaveClass('text-xl', 'font-bold', 'text-white');

    // Check if the links have correct classes
    const recordLink = screen.getByText(/Record/i);
    const viewLink = screen.getByText(/View/i);

    expect(recordLink).toHaveClass('text-white', 'hover:text-gray-400');
    expect(viewLink).toHaveClass('text-white', 'hover:text-gray-400');
  });
});
