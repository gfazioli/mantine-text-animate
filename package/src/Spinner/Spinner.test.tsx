import React from 'react';
import { render } from '@mantine-tests/core';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spinner>Hello</Spinner>);
    expect(container).toBeTruthy();
  });

  it('has role="img" and aria-label for accessibility', () => {
    const { container } = render(<Spinner>Spinning Text</Spinner>);
    const root = container.querySelector('[role="img"]');
    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute('aria-label', 'Spinning Text');
  });

  it('renders one char element per character', () => {
    const { container } = render(<Spinner>ABC</Spinner>);
    const chars = container.querySelectorAll('[style*="rotate"]');
    expect(chars.length).toBe(3);
  });

  it('sets animate and direction data attributes', () => {
    const { container } = render(
      <Spinner animate direction="counterclockwise">
        Test
      </Spinner>
    );
    const spinContainer = container.querySelector(
      '[data-text-animate-spinner-animate="true"][data-text-animate-spinner-direction="counterclockwise"]'
    );
    expect(spinContainer).toBeInTheDocument();
  });

  it('stops animation when animate={false}', () => {
    const { container } = render(<Spinner animate={false}>Test</Spinner>);
    const spinContainer = container.querySelector('[data-text-animate-spinner-animate="false"]');
    expect(spinContainer).toBeInTheDocument();
  });
});
