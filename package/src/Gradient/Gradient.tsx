import React from 'react';
import {
  Box,
  createVarsResolver,
  polymorphicFactory,
  useProps,
  useStyles,
  type BoxProps,
  type PolymorphicFactory,
  type StylesApiProps,
} from '@mantine/core';
import classes from './Gradient.module.css';

export type GradientStylesNames = 'root';

export type GradientCssVariables = {
  root:
    | '--text-animate-gradient-speed'
    | '--text-animate-gradient-direction'
    | '--text-animate-gradient-end-x'
    | '--text-animate-gradient-end-y';
};

export interface GradientBaseProps {
  /**
   * Array of CSS color values for the gradient
   * @example ['#ff0000', '#00ff00', '#0000ff']
   */
  colors: string[];

  /**
   * Animation speed in seconds (lower = faster)
   * @default 3
   */
  speed?: number;

  /**
   * Gradient direction in degrees
   * @default 90
   */
  direction?: number;

  /**
   * Whether the gradient animation is active
   * @default true
   */
  animate?: boolean;

  /**
   * The text content to display with gradient
   */
  children: React.ReactNode;
}

export interface GradientProps
  extends BoxProps, GradientBaseProps, StylesApiProps<GradientFactory> {}

export type GradientFactory = PolymorphicFactory<{
  props: GradientProps;
  defaultComponent: 'span';
  defaultRef: HTMLSpanElement;
  stylesNames: GradientStylesNames;
  vars: GradientCssVariables;
}>;

const defaultProps: Partial<GradientProps> = {
  speed: 3,
  direction: 90,
  animate: true,
};

const varsResolver = createVarsResolver<GradientFactory>((_, { speed, direction }) => {
  const d = direction ?? 90;
  const rad = (d * Math.PI) / 180;
  // CSS gradient angles: 0deg=up, 90deg=right → sin for x, -cos for y
  const endX = Math.round(Math.sin(rad) * 200);
  const endY = Math.round(-Math.cos(rad) * 200);

  return {
    root: {
      '--text-animate-gradient-speed': `${speed || 3}s`,
      '--text-animate-gradient-direction': `${d}deg`,
      '--text-animate-gradient-end-x': `${endX}%`,
      '--text-animate-gradient-end-y': `${endY}%`,
    },
  };
});

/**
 * Gradient Component
 *
 * A component that displays text with an animated gradient background.
 */
export const Gradient = polymorphicFactory<GradientFactory>((_props, ref) => {
  const props = useProps('Gradient', defaultProps, _props);

  const {
    colors,
    speed,
    direction,
    animate,
    children,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  const getStyles = useStyles<GradientFactory>({
    name: 'Gradient',
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

  // Build the gradient string from colors array
  const gradientColors = colors.length > 0 ? colors.join(', ') : '#000, #fff';
  const backgroundImage = `linear-gradient(${direction ?? 90}deg, ${gradientColors}, ${colors[0] || '#000'})`;

  return (
    <Box
      ref={ref}
      {...getStyles('root', {
        style: {
          backgroundImage,
        },
      })}
      component="span"
      data-text-animate-gradient-animate={animate}
      aria-live="polite"
      {...others}
    >
      {children}
    </Box>
  );
});

Gradient.classes = classes;
Gradient.displayName = 'Gradient';
