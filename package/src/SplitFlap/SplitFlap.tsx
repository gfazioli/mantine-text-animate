import React from 'react';
import {
  Box,
  createVarsResolver,
  parseThemeColor,
  polymorphicFactory,
  useProps,
  useStyles,
  type BoxProps,
  type PolymorphicFactory,
  type StylesApiProps,
} from '@mantine/core';
import { useSplitFlap, type SplitFlapBaseProps } from './use-split-flap';
import classes from './SplitFlap.module.css';

export type SplitFlapStylesNames =
  | 'root'
  | 'character'
  | 'charTop'
  | 'charBottom'
  | 'flapTop'
  | 'flapBottom';

export type SplitFlapCssVariables = {
  root:
    | '--text-animate-split-flap-bg'
    | '--text-animate-split-flap-color'
    | '--text-animate-split-flap-gap'
    | '--text-animate-split-flap-flip-duration'
    | '--text-animate-split-flap-char-width'
    | '--text-animate-split-flap-char-height';
};

export interface SplitFlapProps
  extends BoxProps, SplitFlapBaseProps, StylesApiProps<SplitFlapFactory> {
  /**
   * Background color of each flap
   * @default '#1a1a2e'
   */
  bg?: string;

  /**
   * Text color
   * @default '#e0e0e0'
   */
  textColor?: string;

  /**
   * Gap between characters in px
   * @default 4
   */
  gap?: number;

  /**
   * Width of each character cell
   * @default '1.2em'
   */
  charWidth?: string;

  /**
   * Height of each character cell
   * @default '1.8em'
   */
  charHeight?: string;
}

export type SplitFlapFactory = PolymorphicFactory<{
  props: SplitFlapProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: SplitFlapStylesNames;
  vars: SplitFlapCssVariables;
}>;

const defaultProps: Partial<SplitFlapProps> = {
  animate: true,
  speed: 1,
  characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ',
  flipDuration: 300,
  staggerDelay: 80,
  delay: 0,
  bg: '#1a1a2e',
  textColor: '#e0e0e0',
  gap: 4,
  charWidth: '1.2em',
  charHeight: '1.8em',
};

const varsResolver = createVarsResolver<SplitFlapFactory>(
  (theme, { bg, textColor, gap, flipDuration, speed, charWidth, charHeight }) => ({
    root: {
      '--text-animate-split-flap-bg': bg ? parseThemeColor({ color: bg, theme }).value : undefined,
      '--text-animate-split-flap-color': textColor
        ? parseThemeColor({ color: textColor, theme }).value
        : undefined,
      '--text-animate-split-flap-gap': gap !== undefined ? `${gap}px` : undefined,
      '--text-animate-split-flap-flip-duration':
        flipDuration !== undefined && speed !== undefined
          ? `${flipDuration / speed}ms`
          : flipDuration !== undefined
            ? `${flipDuration}ms`
            : undefined,
      '--text-animate-split-flap-char-width': charWidth,
      '--text-animate-split-flap-char-height': charHeight,
    },
  })
);

/**
 * SplitFlap Component
 *
 * An airport departure board (split-flap display) effect that animates text
 * by cycling each character through a character set with a 3D flip animation.
 */
export const SplitFlap = polymorphicFactory<SplitFlapFactory>((_props, ref) => {
  const props = useProps('SplitFlap', defaultProps, _props);

  const {
    value,
    animate,
    speed,
    characterSet,
    flipDuration,
    staggerDelay,
    delay,
    onCompleted,
    bg,
    textColor,
    gap,
    charWidth,
    charHeight,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  const { characters } = useSplitFlap({
    value,
    animate,
    speed,
    characterSet,
    flipDuration,
    staggerDelay,
    delay,
    onCompleted,
  });

  const getStyles = useStyles<SplitFlapFactory>({
    name: 'SplitFlap',
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
    <Box ref={ref} {...getStyles('root')} component="div" aria-live="polite" {...others}>
      {characters.map((char, i) => (
        <Box {...getStyles('character')} key={i}>
          {/* Top half: shows NEXT char during flip (revealed behind flapTop),
              otherwise shows current char */}
          <Box {...getStyles('charTop')}>
            <span className={classes.charInner}>{char.isFlipping ? char.next : char.current}</span>
          </Box>

          {/* Bottom half: shows current (old) char — visible until flapBottom covers it */}
          <Box {...getStyles('charBottom')}>
            <span className={classes.charInner}>{char.current}</span>
          </Box>

          {/* Animated flaps — key changes on each flip step to restart CSS animations */}
          {char.isFlipping && (
            <React.Fragment key={char.flipKey}>
              <Box {...getStyles('flapTop')}>
                <span className={classes.charInner}>{char.current}</span>
              </Box>
              <Box {...getStyles('flapBottom')}>
                <span className={classes.charInner}>{char.next}</span>
              </Box>
            </React.Fragment>
          )}
        </Box>
      ))}
    </Box>
  );
});

SplitFlap.classes = classes;
SplitFlap.displayName = 'SplitFlap';
