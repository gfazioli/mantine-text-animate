import React, { useMemo } from 'react';
import {
  Box,
  createVarsResolver,
  getSize,
  polymorphicFactory,
  useProps,
  useStyles,
  type BoxProps,
  type MantineSize,
  type PolymorphicFactory,
  type StylesApiProps,
} from '@mantine/core';
import classes from './Spinner.module.css';

export type SpinnerStylesNames = 'root' | 'char' | 'container';

export type SpinnerCssVariables = {
  root:
    | '--text-animate-spinner-radius'
    | '--text-animate-spinner-speed'
    | '--text-animate-spinner-char-offset';
};

export interface SpinnerBaseProps {
  /**
   * The text content to animate.
   * Pass a string for text processing (repeat/reverse), or an array of ReactNode
   * for custom content (repeat/reverse will be skipped).
   * When passing ReactNode[], you must provide an explicit `aria-label`.
   */
  children: string | React.ReactNode[];

  /**
   * The radius of the circle in pixels or Mantine size
   * @default "md"
   */
  radius?: MantineSize | number | string;

  /**
   * The rotation speed multiplier (higher = faster)
   * @default 2
   */
  speed?: number;

  /**
   * The rotation direction
   * @default "clockwise"
   */
  direction?: 'clockwise' | 'counterclockwise';

  /**
   * Whether the spinner is currently rotating
   * @default true
   */
  animate?: boolean;

  /**
   * Character offset in degrees (0-360)
   * @default 0
   */
  charOffset?: number;

  /**
   * Whether to reverse the text direction
   * @default false
   */
  reverseText?: boolean;

  /**
   * Whether to repeat the text to fill the circle
   * @default false
   */
  repeatText?: boolean;

  /**
   * Number of times to repeat the text (only used if repeatText is true)
   * @default 1
   */
  repeatCount?: number;
}

export interface SpinnerProps extends BoxProps, SpinnerBaseProps, StylesApiProps<SpinnerFactory> {}

export type SpinnerFactory = PolymorphicFactory<{
  props: SpinnerProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: SpinnerStylesNames;
  vars: SpinnerCssVariables;
}>;

const defaultProps: Partial<SpinnerProps> = {
  radius: 'md',
  speed: 2,
  direction: 'clockwise',
  animate: true,
  charOffset: 0,
  reverseText: false,
  repeatText: false,
  repeatCount: 1,
};

const varsResolver = createVarsResolver<SpinnerFactory>((_, { radius, speed, charOffset }) => ({
  root: {
    '--text-animate-spinner-radius':
      radius != null ? getSize(radius, 'text-animate-spinner-radius') : 'md',
    '--text-animate-spinner-speed': `${Math.max(0.1, 20 / (speed || 1))}s`,
    '--text-animate-spinner-char-offset': `${charOffset}deg`,
  },
}));

/**
 * Spinner Component
 *
 * A component that displays text in a circle and rotates it.
 */
export const Spinner = polymorphicFactory<SpinnerFactory>((_props) => {
  const props = useProps('Spinner', defaultProps, _props);

  const {
    children,
    radius,
    speed,
    direction,
    animate,
    charOffset,
    reverseText,
    repeatText,
    repeatCount,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  // If children is a ReactNode array, use it directly (skip text processing)
  const isNodeArray = Array.isArray(children);

  // Process text: repeat if needed, reverse if needed, split into characters
  const items: React.ReactNode[] = useMemo(() => {
    if (isNodeArray) {
      return children;
    }
    const text = children as string;
    const base = repeatText && repeatCount && repeatCount > 1 ? text.repeat(repeatCount) : text;
    const processed = reverseText ? base.split('').reverse().join('') : base;
    return processed.split('');
  }, [children, isNodeArray, repeatText, repeatCount, reverseText]);

  const getStyles = useStyles<SpinnerFactory>({
    name: 'Spinner',
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
      {...getStyles('root')}
      role={isNodeArray && !(others as Record<string, unknown>)['aria-label'] ? undefined : 'img'}
      aria-label={
        isNodeArray
          ? ((others as Record<string, unknown>)['aria-label'] as string)
          : (children as string)
      }
      {...others}
    >
      <Box
        className={classes.container}
        data-text-animate-spinner-animate={animate}
        data-text-animate-spinner-direction={direction}
      >
        {items.map((item, index) => {
          const angle = (360 / items.length) * index + (charOffset || 0);
          return (
            <Box
              key={index}
              className={classes.char}
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              {item}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

Spinner.classes = classes;
Spinner.displayName = 'Spinner';
