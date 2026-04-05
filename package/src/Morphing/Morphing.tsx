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
import { useMorphing, type MorphingBaseProps } from './use-morphing';
import classes from './Morphing.module.css';

export type MorphingStylesNames = 'root' | 'character';

export type MorphingCssVariables = {
  root: '--text-animate-morphing-speed';
};

export interface MorphingProps
  extends BoxProps, MorphingBaseProps, StylesApiProps<MorphingFactory> {}

export type MorphingFactory = PolymorphicFactory<{
  props: MorphingProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: MorphingStylesNames;
  vars: MorphingCssVariables;
}>;

const defaultProps: Partial<MorphingProps> = {
  animate: true,
  speed: 1,
};

const varsResolver = createVarsResolver<MorphingFactory>((_, { speed }) => ({
  root: {
    '--text-animate-morphing-speed': `${1 / (speed || 1)}s`,
  },
}));

/**
 * Morphing Component
 *
 * Creates fluid text transitions using LCS (Longest Common Subsequence) to
 * identify shared characters. Shared characters slide to their new positions
 * while unique characters fade in or out.
 */
export const Morphing = polymorphicFactory<MorphingFactory>((_props) => {
  const props = useProps('Morphing', defaultProps, _props);

  const {
    value,
    animate,
    speed,
    onCompleted,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  const getStyles = useStyles<MorphingFactory>({
    name: 'Morphing',
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

  const { characters, width } = useMorphing({
    value,
    animate,
    speed,
    onCompleted,
  });

  return (
    <Box
      {...getStyles('root')}
      component="div"
      aria-live="polite"
      aria-label={value}
      style={{ width: `${width}ch`, height: '1.2em' }}
      {...others}
    >
      {characters.map((char) => (
        <Box
          key={char.key}
          component="span"
          {...getStyles('character')}
          style={{ left: `${char.toX}ch` }}
          data-morph-state={char.state}
        >
          {char.char}
        </Box>
      ))}
    </Box>
  );
});

Morphing.classes = classes;
Morphing.displayName = 'Morphing';
