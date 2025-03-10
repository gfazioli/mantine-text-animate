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
import { useTextTicker, type TextTickerBaseProps } from './use-text-ticker';
import classes from './TextTicker.module.css';

export type TextTickerStylesNames = 'root';

export type TextTickerCssVariables = {
  root: '--text-ticker-animation-duration' | '--text-ticker-animation-delay';
};

export interface TextTickerProps
  extends BoxProps,
    TextTickerBaseProps,
    StylesApiProps<TextTickerFactory> {}

export type TextTickerFactory = PolymorphicFactory<{
  props: TextTickerProps;
  defaultComponent: 'p';
  defaultRef: HTMLParagraphElement;
  stylesNames: TextTickerStylesNames;
  vars: TextTickerCssVariables;
}>;

const defaultProps: Partial<TextTickerProps> = {
  characterSet: 'alphanumeric',
  customCharacters: '',
  delay: 0,
  speed: 1,
  easing: 'ease-out',
  randomChangeSpeed: 1,
  revealDirection: 'left-to-right',
  initialText: 'random',
  animate: true,
};

const varsResolver = createVarsResolver<TextTickerFactory>((_, { delay, speed }) => ({
  root: {
    '--text-ticker-animation-duration': `${1 / (speed || 1)}s`,
    '--text-ticker-animation-delay': `${delay || 0}s`,
  },
}));

/**
 * TextTicker Component
 *
 * A component that animates text from random characters to a target string.
 * This implementation uses the useTextTicker hook internally.
 */
export const TextTicker = polymorphicFactory<TextTickerFactory>((_props, ref) => {
  const props = useProps('TextTicker', defaultProps, _props);

  const {
    value,
    initialText,
    animate,
    characterSet,
    customCharacters,
    delay,
    speed,
    easing,
    randomChangeSpeed,
    revealDirection,
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
  const { text } = useTextTicker({
    value,
    initialText,
    animate,
    characterSet,
    customCharacters,
    delay,
    speed,
    easing,
    randomChangeSpeed,
    revealDirection,
    onCompleted,
  });

  const getStyles = useStyles<TextTickerFactory>({
    name: 'TextTicker',
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
          fontFamily: 'monospace',
          whiteSpace: 'pre',
        },
      })}
      component="p"
      {...others}
    >
      {text}
    </Box>
  );
});

TextTicker.displayName = 'TextTicker';
