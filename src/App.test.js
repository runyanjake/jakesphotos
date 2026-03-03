import { render, screen } from '@testing-library/react';
import App from './App';

// masonry-layout requires DOM layout APIs not available in jsdom
jest.mock('masonry-layout', () => {
    return jest.fn().mockImplementation(() => ({
        layout: jest.fn(),
        destroy: jest.fn(),
    }));
});

test('renders site title in navbar', () => {
    render(<App />);
    expect(screen.getByText(/Jake Runyan Photography/i)).toBeInTheDocument();
});

test('renders navigation links', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
});
