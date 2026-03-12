import React from 'react';
import { render } from '@mantine-tests/core';
import { NumberTicker } from './NumberTicker';

describe('NumberTicker', () => {
  it('renders without crashing', () => {
    const { container } = render(<NumberTicker value={100} />);
    expect(container).toBeTruthy();
  });

  it('has aria-live="polite" for screen readers', () => {
    const { container } = render(<NumberTicker value={100} />);
    const root = container.querySelector('[aria-live="polite"]');
    expect(root).toBeInTheDocument();
  });

  it('displays start value when animate={false}', () => {
    const { container } = render(<NumberTicker value={100} startValue={0} animate={false} />);
    const ticker = container.querySelector('[aria-live="polite"]');
    expect(ticker?.textContent).toBe('0');
  });

  it('displays formatted number with decimal places', () => {
    const { container } = render(
      <NumberTicker value={42.5} startValue={42.5} animate={false} decimalPlaces={2} />
    );
    const ticker = container.querySelector('[aria-live="polite"]');
    expect(ticker?.textContent).toBe('42.50');
  });
});
