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
import { useNumberTicker, type NumberTickerBaseProps } from './use-number-ticker';
import classes from './NumberTicker.module.css';

export type NumberTickerStylesNames = 'root';

export type NumberTickerCssVariables = {
  root: '--number-ticker-animation-duration' | '--number-ticker-animation-delay';
};

export type NumberTickerEasing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

export interface NumberTickerProps
  extends BoxProps, NumberTickerBaseProps, StylesApiProps<NumberTickerFactory> {}

export type NumberTickerFactory = PolymorphicFactory<{
  props: NumberTickerProps;
  defaultComponent: 'p';
  defaultRef: HTMLParagraphElement;
  stylesNames: NumberTickerStylesNames;
  vars: NumberTickerCssVariables;
}>;

const defaultProps: Partial<NumberTickerProps> = {
  startValue: 0,
  delay: 0,
  decimalPlaces: 0,
  speed: 1,
  easing: 'ease-out',
  animate: true,
};

const varsResolver = createVarsResolver<NumberTickerFactory>((_, { delay, speed }) => ({
  root: {
    '--number-ticker-animation-duration': `${1 / (speed || 1)}s`,
    '--number-ticker-animation-delay': `${delay || 0}s`,
  },
}));

/**
 * NumberTicker Component
 *
 * A component that animates a number counting up or down to a target value.
 * This implementation uses the useNumberTicker hook internally.
 *
 * The animation can be controlled using the `started` prop, which allows
 * you to start and stop the animation programmatically.
 */
export const NumberTicker = polymorphicFactory<NumberTickerFactory>((_props, ref) => {
  const props = useProps('NumberTicker', defaultProps, _props);

  const {
    value,
    startValue,
    delay,
    decimalPlaces,
    speed,
    easing,
    animate,
    onCompleted,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  // Use the hook with mapped props
  const { text } = useNumberTicker({
    value,
    startValue,
    delay,
    decimalPlaces,
    speed,
    easing,
    animate,
    onCompleted,
  });

  const getStyles = useStyles<NumberTickerFactory>({
    name: 'NumberTicker',
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
          display: 'inline-block',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: 'wider',
        },
      })}
      component="p"
      {...others}
    >
      {text}
    </Box>
  );
});

NumberTicker.displayName = 'NumberTicker';
