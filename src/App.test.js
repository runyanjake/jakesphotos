import { render, screen } from '@testing-library/react';
import App from './App';

// masonry-layout requires DOM layout APIs not available in jsdom
jest.mock('masonry-layout', () => {
    const MockMasonry = function () {};
    MockMasonry.prototype.layout = jest.fn();
    MockMasonry.prototype.destroy = jest.fn();
    return MockMasonry;
});

test('renders site title in navbar', () => {
    render(<App />);
    // Use getAllByText since the title also appears in the homepage hero
    const matches = screen.getAllByText(/Jake Runyan Photography/i);
    expect(matches.length).toBeGreaterThan(0);
});

test('renders navigation links', () => {
    render(<App />);
    // Use getAllByRole to handle multiple matching links (navbar + footer)
    const contactLinks = screen.getAllByRole('link', { name: /^contact$/i });
    const aboutLinks = screen.getAllByRole('link', { name: /^about$/i });
    expect(contactLinks.length).toBeGreaterThan(0);
    expect(aboutLinks.length).toBeGreaterThan(0);
});
