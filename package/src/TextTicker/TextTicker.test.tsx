import React from 'react';
import { render } from '@mantine-tests/core';
import { TextTicker } from './TextTicker';

describe('TextTicker', () => {
  it('renders without crashing', () => {
    const { container } = render(<TextTicker value="Hello" />);
    expect(container).toBeTruthy();
  });

  it('has aria-live="polite" for screen readers', () => {
    const { container } = render(<TextTicker value="Hello" />);
    const root = container.querySelector('[aria-live="polite"]');
    expect(root).toBeInTheDocument();
  });

  it('displays target text when initialText="target"', () => {
    const { container } = render(<TextTicker value="Hello" initialText="target" animate={false} />);
    const ticker = container.querySelector('[aria-live="polite"]');
    expect(ticker?.textContent).toBe('Hello');
  });

  it('displays empty text when initialText="none" and not animating', () => {
    const { container } = render(<TextTicker value="Hello" initialText="none" animate={false} />);
    const ticker = container.querySelector('[aria-live="polite"]');
    expect(ticker?.textContent).toBe('');
  });
});
