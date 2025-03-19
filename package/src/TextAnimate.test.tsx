import React from 'react';
import { render, tests } from '@mantine-tests/core';
import { TextAnimate, TextAnimateProps, TextAnimateStylesNames } from './TextAnimate';

const defaultProps: TextAnimateProps = {};

describe('@mantine/core/TextAnimate', () => {
  tests.itSupportsSystemProps<TextAnimateProps, TextAnimateStylesNames>({
    component: TextAnimate,
    props: defaultProps,
    styleProps: true,
    children: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@mantine/core/TextAnimate',
    stylesApiSelectors: ['root'],
  });

  it('supports perspective prop', () => {
    const { container } = render(<TextAnimate perspective="500px" />);
    expect(container.querySelector('.mantine-TextAnimate-root')).toHaveStyle({
      perspective: '500px',
    });
  });
});
