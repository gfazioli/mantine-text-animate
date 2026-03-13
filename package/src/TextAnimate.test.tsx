import React from 'react';
import { render } from '@mantine-tests/core';
import { TextAnimate } from './TextAnimate';

describe('TextAnimate', () => {
  it('renders without crashing', () => {
    const { container } = render(<TextAnimate>Hello</TextAnimate>);
    expect(container).toBeTruthy();
  });

  it('renders text content when animate="static"', () => {
    const { container } = render(<TextAnimate animate="static">Hello World</TextAnimate>);
    expect(container.textContent).toContain('Hello World');
  });

  it('splits text by word when by="word"', () => {
    const { container } = render(
      <TextAnimate animate="in" by="word">
        Hello World
      </TextAnimate>
    );
    const segments = container.querySelectorAll('[data-text-animate="in"]');
    // "Hello", " ", "World" = 3 segments (split by /(\s+)/ keeps separators)
    expect(segments.length).toBe(3);
  });

  it('splits text by character when by="character"', () => {
    const { container } = render(
      <TextAnimate animate="in" by="character">
        Hi
      </TextAnimate>
    );
    const segments = container.querySelectorAll('[data-text-animate="in"]');
    expect(segments.length).toBe(2);
  });

  it('splits text by line when by="line"', () => {
    const { container } = render(
      <TextAnimate animate="in" by="line">
        {'Line1\nLine2\nLine3'}
      </TextAnimate>
    );
    const segments = container.querySelectorAll('[data-text-animate="in"]');
    expect(segments.length).toBe(3);
  });

  it('renders as single segment when by="text"', () => {
    const { container } = render(
      <TextAnimate animate="in" by="text">
        Hello World
      </TextAnimate>
    );
    const segments = container.querySelectorAll('[data-text-animate="in"]');
    expect(segments.length).toBe(1);
  });

  it('sets correct animation variant attribute', () => {
    const { container } = render(
      <TextAnimate animate="in" animation="scale" by="text">
        Hello
      </TextAnimate>
    );
    const segment = container.querySelector('[data-text-animate-animation="scale"]');
    expect(segment).toBeInTheDocument();
  });

  it('hides content when animate is undefined', () => {
    const { container } = render(<TextAnimate>Hello</TextAnimate>);
    const hidden = container.querySelector('span[style*="visibility: hidden"]');
    expect(hidden).toBeInTheDocument();
  });

  it('sets animationDirection to reverse for animate="out"', () => {
    const { container } = render(
      <TextAnimate animate="out" by="text">
        Hello
      </TextAnimate>
    );
    const segment = container.querySelector('[data-text-animate="out"]');
    expect(segment).toBeInTheDocument();
    expect(segment).toHaveStyle({ animationDirection: 'reverse' });
  });

  it('sets animationDirection to normal for animate="in"', () => {
    const { container } = render(
      <TextAnimate animate="in" by="text">
        Hello
      </TextAnimate>
    );
    const segment = container.querySelector('[data-text-animate="in"]');
    expect(segment).toHaveStyle({ animationDirection: 'normal' });
  });

  it('has aria-live="polite" on root element', () => {
    const { container } = render(
      <TextAnimate animate="in" by="text">
        Hello
      </TextAnimate>
    );
    const root = container.querySelector('[aria-live="polite"]');
    expect(root).toBeInTheDocument();
  });

  it('has aria-live="polite" when hidden', () => {
    const { container } = render(<TextAnimate>Hello</TextAnimate>);
    const root = container.querySelector('[aria-live="polite"]');
    expect(root).toBeInTheDocument();
  });

  it('applies custom delay and duration', () => {
    const { container } = render(
      <TextAnimate animate="in" by="text" delay={0.5} duration={1}>
        Hello
      </TextAnimate>
    );
    const segment = container.querySelector('[data-text-animate="in"]');
    expect(segment).toHaveStyle({ animationDelay: '0.5s', animationDuration: '1s' });
  });

  it('renders hidden when trigger="inView" and not yet in view', () => {
    const { container } = render(<TextAnimate trigger="inView">Hello</TextAnimate>);
    const hidden = container.querySelector('span[style*="visibility: hidden"]');
    expect(hidden).toBeInTheDocument();
  });

  it('renders hidden when trigger="manual" and animate is undefined', () => {
    const { container } = render(<TextAnimate trigger="manual">Hello</TextAnimate>);
    const hidden = container.querySelector('span[style*="visibility: hidden"]');
    expect(hidden).toBeInTheDocument();
  });

  it('renders animated when trigger="manual" and animate="in"', () => {
    const { container } = render(
      <TextAnimate trigger="manual" animate="in" by="text">
        Hello
      </TextAnimate>
    );
    const segment = container.querySelector('[data-text-animate="in"]');
    expect(segment).toBeInTheDocument();
  });
});

describe('TextAnimate.NumberTicker', () => {
  it('renders prefix and suffix', () => {
    const { container } = render(
      <TextAnimate.NumberTicker value={42} prefix="$" suffix="%" animate={false} />
    );
    expect(container.textContent).toContain('$');
    expect(container.textContent).toContain('%');
  });
});

describe('TextAnimate.Spinner', () => {
  it('renders string children as characters', () => {
    const { container } = render(<TextAnimate.Spinner>ABC</TextAnimate.Spinner>);
    expect(container.textContent).toContain('A');
    expect(container.textContent).toContain('B');
    expect(container.textContent).toContain('C');
  });

  it('renders ReactNode array children', () => {
    const { container } = render(
      <TextAnimate.Spinner aria-label="icons">
        {[<span key="1">X</span>, <span key="2">Y</span>]}
      </TextAnimate.Spinner>
    );
    expect(container.textContent).toContain('X');
    expect(container.textContent).toContain('Y');
  });

  it('does not set role="img" for ReactNode array without aria-label', () => {
    const { container } = render(
      <TextAnimate.Spinner>{[<span key="1">X</span>]}</TextAnimate.Spinner>
    );
    const root = container.firstChild;
    expect(root).not.toHaveAttribute('role');
    expect(root).not.toHaveAttribute('aria-label');
  });
});

describe('TextAnimate.Gradient', () => {
  it('renders children with gradient', () => {
    const { container } = render(
      <TextAnimate.Gradient colors={['red', 'blue']}>Hello</TextAnimate.Gradient>
    );
    expect(container.textContent).toContain('Hello');
  });

  it('sets animate data attribute', () => {
    const { container } = render(
      <TextAnimate.Gradient colors={['red', 'blue']} animate>
        Hello
      </TextAnimate.Gradient>
    );
    const el = container.querySelector('[data-text-animate-gradient-animate="true"]');
    expect(el).toBeInTheDocument();
  });

  it('does not animate when animate is false', () => {
    const { container } = render(
      <TextAnimate.Gradient colors={['red', 'blue']} animate={false}>
        Hello
      </TextAnimate.Gradient>
    );
    const el = container.querySelector('[data-text-animate-gradient-animate="false"]');
    expect(el).toBeInTheDocument();
  });
});
