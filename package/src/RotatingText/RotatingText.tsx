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
import { useRotatingText, type RotatingTextBaseProps } from './use-rotating-text';
import classes from './RotatingText.module.css';

export type RotatingTextStylesNames = 'root' | 'text' | 'entering' | 'exiting';

export type RotatingTextCssVariables = {
  root: '--text-animate-rotating-speed';
};

export type RotatingTextAnimation =
  | 'slideUp'
  | 'slideDown'
  | 'fade'
  | 'blur'
  | 'blurUp'
  | 'blurDown';

export interface RotatingTextProps
  extends BoxProps, RotatingTextBaseProps, StylesApiProps<RotatingTextFactory> {
  /**
   * Animation variant for the transition
   * @default 'slideUp'
   */
  animation?: RotatingTextAnimation;
}

export type RotatingTextFactory = PolymorphicFactory<{
  props: RotatingTextProps;
  defaultComponent: 'span';
  defaultRef: HTMLSpanElement;
  stylesNames: RotatingTextStylesNames;
  vars: RotatingTextCssVariables;
}>;

const defaultProps: Partial<RotatingTextProps> = {
  animate: true,
  interval: 3000,
  speed: 1,
  animation: 'slideUp',
};

const varsResolver = createVarsResolver<RotatingTextFactory>((_, { speed }) => ({
  root: {
    '--text-animate-rotating-speed': `${0.5 / (speed || 1)}s`,
  },
}));

/**
 * RotatingText Component
 *
 * A component that cycles through an array of text strings with smooth
 * enter/exit animations, similar to an animated text carousel.
 */
export const RotatingText = polymorphicFactory<RotatingTextFactory>((_props, ref) => {
  const props = useProps('RotatingText', defaultProps, _props);

  const {
    values,
    animate,
    interval,
    speed,
    onCycle,
    animation,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  const { currentText, nextText, isTransitioning, onTransitionEnd } = useRotatingText({
    values,
    animate,
    interval,
    speed,
    onCycle,
  });

  const getStyles = useStyles<RotatingTextFactory>({
    name: 'RotatingText',
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
    <Box ref={ref} {...getStyles('root')} component="span" aria-live="polite" {...others}>
      {isTransitioning ? (
        <>
          <Box component="span" {...getStyles('exiting')} data-rotating-text-animation={animation}>
            {currentText}
          </Box>
          <Box
            component="span"
            {...getStyles('entering')}
            data-rotating-text-animation={animation}
            onAnimationEnd={onTransitionEnd}
          >
            {nextText}
          </Box>
        </>
      ) : (
        <Box component="span" {...getStyles('text')}>
          {currentText}
        </Box>
      )}
    </Box>
  );
});

RotatingText.classes = classes;
RotatingText.displayName = 'RotatingText';
