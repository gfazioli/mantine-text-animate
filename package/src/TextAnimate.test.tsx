import React from 'react';
import { render } from '@mantine-tests/core';
import { TextAnimate } from './TextAnimate';

describe('TextAnimate', () => {
  it('renders without crashing', () => {
    const { container } = render(<TextAnimate>Hello</TextAnimate>);
    expect(container).toBeTruthy();
  });
});
