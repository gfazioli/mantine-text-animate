import React from 'react';
import {
  Box,
  createVarsResolver,
  parseThemeColor,
  polymorphicFactory,
  useProps,
  useStyles,
  type BoxProps,
  type MantineColor,
  type PolymorphicFactory,
  type StylesApiProps,
} from '@mantine/core';
import classes from './Highlight.module.css';

export type HighlightStylesNames = 'root';

export type HighlightCssVariables = {
  root:
    | '--text-animate-highlight-color'
    | '--text-animate-highlight-speed'
    | '--text-animate-highlight-height'
    | '--text-animate-highlight-offset';
};

export interface HighlightBaseProps {
  /**
   * The text content to display with highlight
   */
  children: React.ReactNode;

  /**
   * Highlight color
   * @default '#ffeb3b'
   */
  color?: MantineColor;

  /**
   * Whether the highlight animation is active
   * @default true
   */
  animate?: boolean;

  /**
   * Animation speed multiplier (higher = faster)
   * @default 1
   */
  speed?: number;

  /**
   * Height of the highlight bar
   * @default '40%'
   */
  highlightHeight?: string;

  /**
   * Vertical offset from top
   * @default '60%'
   */
  highlightOffset?: string;
}

export interface HighlightProps
  extends BoxProps, HighlightBaseProps, StylesApiProps<HighlightFactory> {}

export type HighlightFactory = PolymorphicFactory<{
  props: HighlightProps;
  defaultComponent: 'span';
  defaultRef: HTMLSpanElement;
  stylesNames: HighlightStylesNames;
  vars: HighlightCssVariables;
}>;

const defaultProps: Partial<HighlightProps> = {
  color: '#ffeb3b',
  animate: true,
  speed: 1,
  highlightHeight: '40%',
  highlightOffset: '60%',
};

const varsResolver = createVarsResolver<HighlightFactory>(
  (theme, { speed, highlightHeight, highlightOffset, color }) => {
    const resolvedColor = color ? parseThemeColor({ color, theme }).value : '#ffeb3b';

    return {
      root: {
        '--text-animate-highlight-speed': `${1 / (speed || 1)}s`,
        '--text-animate-highlight-height': highlightHeight || '40%',
        '--text-animate-highlight-offset': highlightOffset || '60%',
        '--text-animate-highlight-color': resolvedColor,
      },
    };
  }
);

/**
 * Highlight Component
 *
 * A component that displays text with an animated highlight (marker) effect.
 */
export const Highlight = polymorphicFactory<HighlightFactory>((_props, ref) => {
  const props = useProps('Highlight', defaultProps, _props);

  const {
    children,
    color,
    animate,
    speed,
    highlightHeight,
    highlightOffset,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  const getStyles = useStyles<HighlightFactory>({
    name: 'Highlight',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  return (
    <Box
      ref={ref}
      {...getStyles('root', {
        style: {
          backgroundImage: `linear-gradient(to right, var(--text-animate-highlight-color), var(--text-animate-highlight-color))`,
        },
      })}
      component="span"
      data-text-animate-highlight-animate={animate}
      aria-live="polite"
      {...others}
    >
      {children}
    </Box>
  );
});

Highlight.classes = classes;
Highlight.displayName = 'Highlight';
