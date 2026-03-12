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
import { useScramble, type ScrambleBaseProps } from './use-scramble';
import classes from './Scramble.module.css';

export type ScrambleStylesNames = 'root';

export type ScrambleCssVariables = {
  root: '--scramble-animation-duration' | '--scramble-animation-delay';
};

export interface ScrambleProps
  extends BoxProps, ScrambleBaseProps, StylesApiProps<ScrambleFactory> {}

export type ScrambleFactory = PolymorphicFactory<{
  props: ScrambleProps;
  defaultComponent: 'p';
  defaultRef: HTMLParagraphElement;
  stylesNames: ScrambleStylesNames;
  vars: ScrambleCssVariables;
}>;

const defaultProps: Partial<ScrambleProps> = {
  animate: true,
  speed: 1,
  scrambleDuration: 800,
  revealDirection: 'left-to-right',
  characterSet: 'alphanumeric',
  customCharacters: '',
  staggerDelay: 50,
  delay: 0,
};

const varsResolver = createVarsResolver<ScrambleFactory>(
  (_, { delay, scrambleDuration, speed }) => ({
    root: {
      '--scramble-animation-duration': `${(scrambleDuration || 800) / 1000 / (speed || 1)}s`,
      '--scramble-animation-delay': `${delay || 0}s`,
    },
  })
);

/**
 * Scramble Component
 *
 * A "hacker/decryption" text animation where each character cycles through
 * random characters before settling on the target text.
 */
export const Scramble = polymorphicFactory<ScrambleFactory>((_props, ref) => {
  const props = useProps('Scramble', defaultProps, _props);

  const {
    value,
    animate,
    speed,
    scrambleDuration,
    revealDirection,
    characterSet,
    customCharacters,
    staggerDelay,
    delay,
    onCompleted,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  const { text } = useScramble({
    value,
    animate,
    speed,
    scrambleDuration,
    revealDirection,
    characterSet,
    customCharacters,
    staggerDelay,
    delay,
    onCompleted,
  });

  const getStyles = useStyles<ScrambleFactory>({
    name: 'Scramble',
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
      aria-live="polite"
      {...others}
    >
      {text}
    </Box>
  );
});

Scramble.classes = classes;
Scramble.displayName = 'Scramble';
