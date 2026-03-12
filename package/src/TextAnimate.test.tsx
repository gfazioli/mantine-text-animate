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

  it('applies custom delay and duration', () => {
    const { container } = render(
      <TextAnimate animate="in" by="text" delay={0.5} duration={1}>
        Hello
      </TextAnimate>
    );
    const segment = container.querySelector('[data-text-animate="in"]');
    expect(segment).toHaveStyle({ animationDelay: '0.5s', animationDuration: '1s' });
  });
});
