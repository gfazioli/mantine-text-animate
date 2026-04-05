import React from 'react';
import {
  Box,
  createVarsResolver,
  getRadius,
  parseThemeColor,
  polymorphicFactory,
  useProps,
  useStyles,
  type BoxProps,
  type MantineColor,
  type MantineRadius,
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
    | '--text-animate-split-flap-char-height'
    | '--text-animate-split-flap-radius'
    | '--text-animate-split-flap-divider-color';
};

export interface SplitFlapProps
  extends BoxProps, SplitFlapBaseProps, StylesApiProps<SplitFlapFactory> {
  /**
   * Background color of each flap
   * @default '#1a1a2e'
   */
  bg?: MantineColor;

  /**
   * Text color
   * @default '#e0e0e0'
   */
  textColor?: MantineColor;

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

  /**
   * Border radius of each flap card
   * @default '4px'
   */
  radius?: MantineRadius;

  /**
   * Color of the horizontal divider line between top and bottom halves.
   * Set to 'transparent' to hide it.
   * @default 'rgba(0,0,0,0.3)'
   */
  dividerColor?: MantineColor;
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
  radius: '4px',
  dividerColor: 'rgba(0,0,0,0.3)',
};

const varsResolver = createVarsResolver<SplitFlapFactory>(
  (
    theme,
    { bg, textColor, gap, flipDuration, speed, charWidth, charHeight, radius, dividerColor }
  ) => ({
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
      '--text-animate-split-flap-radius': radius !== undefined ? getRadius(radius) : undefined,
      '--text-animate-split-flap-divider-color': dividerColor
        ? dividerColor === 'transparent'
          ? 'transparent'
          : parseThemeColor({ color: dividerColor, theme }).value
        : undefined,
    },
  })
);

/**
 * SplitFlap Component
 *
 * An airport departure board (split-flap display) effect that animates text
 * by cycling each character through a character set with a 3D flip animation.
 */
export const SplitFlap = polymorphicFactory<SplitFlapFactory>((_props) => {
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
    radius,
    dividerColor,

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
    <Box {...getStyles('root')} component="div" aria-live="polite" {...others}>
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
