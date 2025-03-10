import React, { useEffect, useState } from 'react';
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
   * The text content to animate
   */
  children: string;

  /**
   * The radius of the circle in pixels or Mantine size
   * @default "md"
   */
  radius?: MantineSize | number | string;

  /**
   * The rotation speed in seconds per full rotation
   * @default 10
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
  speed: 10,
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
      radius !== undefined ? getSize(radius, 'text-animate-spinner-radius') : 'md',
    '--text-animate-spinner-speed': `${speed}s`,
    '--text-animate-spinner-char-offset': `${charOffset}deg`,
  },
}));

/**
 * Spinner Component
 *
 * A component that displays text in a circle and rotates it.
 */
export const Spinner = polymorphicFactory<SpinnerFactory>((_props, ref) => {
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

  const [displayText, setDisplayText] = useState('');

  // Process text for repetition if needed
  useEffect(() => {
    if (repeatText && repeatCount && repeatCount > 1) {
      setDisplayText(children.repeat(repeatCount));
    } else {
      setDisplayText(children);
    }
  }, [children, repeatText, repeatCount]);

  // Prepare the text for display
  const processedText = reverseText ? displayText.split('').reverse().join('') : displayText;
  const characters = processedText.split('');

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
    <Box ref={ref} {...getStyles('root')} {...others}>
      <Box
        className={classes.container}
        data-text-animate-spinner-animate={animate}
        data-text-animate-spinner-direction={direction}
      >
        {characters.map((char, index) => {
          const angle = (360 / characters.length) * index + (charOffset || 0);
          return (
            <Box
              key={`${char}-${direction}-${speed}-${radius}-${index}`}
              className={classes.char}
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              {char}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

Spinner.displayName = 'Spinner';
