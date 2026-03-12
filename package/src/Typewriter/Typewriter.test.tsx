import React from 'react';
import { render } from '@mantine-tests/core';
import { Typewriter } from './Typewriter';

describe('Typewriter', () => {
  it('renders without crashing', () => {
    const { container } = render(<Typewriter value="Hello" />);
    expect(container).toBeTruthy();
  });

  it('has aria-live="polite" for screen readers', () => {
    const { container } = render(<Typewriter value="Hello" />);
    const root = container.querySelector('[aria-live="polite"]');
    expect(root).toBeInTheDocument();
  });

  it('renders cursor by default', () => {
    const { container } = render(<Typewriter value="Hello" />);
    const cursor = container.querySelector('[data-text-animate-typewriter-with-blink]');
    expect(cursor).toBeInTheDocument();
  });

  it('hides cursor when withCursor={false}', () => {
    const { container } = render(<Typewriter value="Hello" withCursor={false} />);
    const cursor = container.querySelector('[data-text-animate-typewriter-with-blink]');
    expect(cursor).not.toBeInTheDocument();
  });

  it('sets multiline data attribute', () => {
    const { container } = render(<Typewriter value="Hello" multiline />);
    const root = container.querySelector('[data-text-animate-typewriter-multiline="true"]');
    expect(root).toBeInTheDocument();
  });

  it('renders leftSection when provided', () => {
    const { container } = render(
      <Typewriter value="Hello" leftSection={<span data-testid="left">$</span>} />
    );
    const left = container.querySelector('[data-testid="left"]');
    expect(left).toBeInTheDocument();
  });
});
