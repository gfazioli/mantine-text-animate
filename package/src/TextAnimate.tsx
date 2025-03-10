import React, { useEffect, useState } from 'react';
import {
  Box,
  createVarsResolver,
  getSize,
  polymorphicFactory,
  Text,
  useProps,
  useStyles,
  type BoxProps,
  type MantineSize,
  type PolymorphicFactory,
  type StylesApiProps,
} from '@mantine/core';
import { NumberTicker } from './NumberTicker/NumberTicker';
import { Spinner } from './Spinner/Spinner';
import { TextTicker } from './TextTicker/TextTicker';
import { Typewriter } from './Typewriter/Typewriter';
import classes from './TextAnimate.module.css';

/**
 * Type defining how text should be split for animation
 * - text: Animate the entire text as one unit
 * - word: Animate each word separately
 * - character: Animate each character separately
 * - line: Animate each line separately (split by newlines)
 */
export type AnimationType = 'text' | 'word' | 'character' | 'line';

/**
 * Available animation variants
 */
export type AnimationVariant =
  | 'fade'
  | 'blur'
  | 'scale'
  | 'slideUp'
  | 'slideDown'
  | 'slideUpElastic'
  | 'slideDownElastic'
  | 'slideLeft'
  | 'slideRight'
  | 'slideLeftElastic'
  | 'slideRightElastic'
  | 'blurUp'
  | 'blurDown';

/**
 * Animation direction
 */
type AnimationDirection = 'in' | 'out' | 'static' | 'none' | false | undefined;

// Add a new interface for AnimateProps
interface AnimateProps {
  /**
   * Controls the distance for slide animations (in pixels)
   * @default 20
   */
  translateDistance?: MantineSize;

  /**
   * Controls the scale factor for scale animations
   * For scaleUp: initial scale = 1 - scaleAmount (e.g., 0.8 means start at 0.2)
   * For scaleDown: initial scale = 1 + scaleAmount (e.g., 0.8 means start at 1.8)
   * @default 0.8
   */
  scaleAmount?: number;

  /**
   * Controls the blur amount for blur animations (in pixels)
   * @default 10
   */
  blurAmount?: MantineSize;
}

export type TextAnimateStylesNames = 'root' | 'segment';

export type TextAnimateCssVariables = {
  root:
    | '--text-animate-translation-distance'
    | '--text-animate-blur-amount'
    | '--text-animate-scale-amount';
};

export type TextAnimateDirection = 'horizontal' | 'vertical';

export type TextAnimateIn = 'positive' | 'negative';

export type TextAnimateOut = TextAnimateIn;

export interface TextAnimateBaseProps {
  /**
   * The text content to animate
   */
  children: string;

  /**
   * The class name to be applied to each segment
   */
  segmentClassName?: string;

  /**
   * The delay before the animation starts (in seconds)
   * @default 0
   */
  delay?: number;

  /**
   * The duration of the animation (in seconds)
   * @default 0.3
   */
  duration?: number;

  /**
   * How to split the text for animation
   * @default "word"
   */
  by?: AnimationType;

  /**
   * Controls the animation direction
   * - `in`: Animate elements in (appear)
   * - `out`: Animate elements out (disappear)
   * - `static`: Do not animate
   * - `none`: Do not animate
   * @default undefined (no animation)
   */
  animate?: AnimationDirection;

  /**
   * The animation preset to use
   * @default "fadeIn"
   */
  animation?: AnimationVariant;

  /**
   * The delay between each segment's animation (in seconds)
   * This controls the staggered timing between segments
   * @default Based on animation type (0.03-0.06)
   */
  segmentDelay?: number;

  /**
   * Animation properties to control intensity of animations
   * @default { translateDistance: 20, scaleAmount: 0.8, blurAmount: 10 }
   */
  animateProps?: AnimateProps;

  /**
   *  Callback function to be called when the animation starts
   * @param animate The direction of the animation
   */
  onAnimationStart?: (animate: 'in' | 'out') => void;

  /**
   * Callback function to be called when the animation ends
   * @param animate The direction of the animation
   */
  onAnimationEnd?: (animate: 'in' | 'out') => void;
}

export interface TextAnimateProps
  extends BoxProps,
    TextAnimateBaseProps,
    StylesApiProps<TextAnimateFactory> {}

export type TextAnimateFactory = PolymorphicFactory<{
  props: TextAnimateProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: TextAnimateStylesNames;
  vars: TextAnimateCssVariables;
  staticComponents: {
    Typewriter: typeof Typewriter;
    Spinner: typeof Spinner;
    NumberTicker: typeof NumberTicker;
    TextTicker: typeof TextTicker;
  };
}>;

const defaultProps: Partial<TextAnimateProps> = {
  delay: 0,
  duration: 0.3,
  segmentDelay: 0.05,
  by: 'word',
  animation: 'fade',
  animateProps: {
    translateDistance: '20' as MantineSize,
    scaleAmount: 2,
    blurAmount: '10' as MantineSize,
  },
};

/**
 * Default stagger timing values for different animation types (in seconds)
 * Controls the delay between animating each segment
 */
const defaultStaggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const varsResolver = createVarsResolver<TextAnimateFactory>(
  (_, { animateProps: { translateDistance, blurAmount, scaleAmount } }) => ({
    root: {
      '--text-animate-translation-distance': translateDistance
        ? getSize(translateDistance, 'translate-distance')
        : '20px',
      '--text-animate-blur-amount': blurAmount ? getSize(blurAmount, 'blur-amount') : '10px',
      '--text-animate-scale-amount': scaleAmount ? scaleAmount.toString() : '0.8',
    },
  })
);

export const TextAnimate = polymorphicFactory<TextAnimateFactory>((_props, ref) => {
  const props = useProps('TextAnimate', defaultProps, _props);
  const {
    delay,
    duration,
    segmentClassName,
    animate,
    by,
    animation,
    segmentDelay,
    animateProps,
    onAnimationStart,
    onAnimationEnd,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    children,
    className,

    ...others
  } = props;

  // Use provided segmentDelay or default based on animation type
  const staggerTiming = segmentDelay !== undefined ? segmentDelay : defaultStaggerTimings[by];

  // Add state to track if we're transitioning from "none" to "in"
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Use useEffect to handle the transition
  useEffect(() => {
    if (animate === 'in') {
      // If we're animating in, we're no longer in initial render state
      setIsInitialRender(false);
    }
  }, [animate]);

  // Container styles
  const containerStyles: React.CSSProperties = {
    whiteSpace: 'pre-wrap',
    position: 'relative',
    display: 'block',
    minHeight: '1em',
  };

  const getStyles = useStyles<TextAnimateFactory>({
    name: 'TextAnimate',
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

  // If animate is "none" or false, return null (don't render anything)
  if (animate === 'none' || animate === false || animate === undefined) {
    // Reset the initial render state when we hide the component
    if (!isInitialRender) {
      setIsInitialRender(true);
    }
    return (
      <Box ref={ref} {...getStyles('root')} style={containerStyles}>
        <Text component="span" {...others} style={{ visibility: 'hidden' }}>
          {children}
        </Text>
      </Box>
    );
  }

  // If animate is "static", render the text directly without animation
  if (animate === 'static') {
    return (
      <Box ref={ref} {...getStyles('root')} style={containerStyles}>
        <Text component="span" {...others}>
          {children}
        </Text>
      </Box>
    );
  }

  // Handle animation events
  function handleOnAnimationStart() {
    onAnimationStart?.(animate as 'in' | 'out');
  }

  // Handle animation end event
  function handleOnAnimationEnd() {
    onAnimationEnd?.(animate as 'in' | 'out');
  }

  // Split text based on the 'by' prop
  let segments: string[] = [];
  switch (by) {
    case 'word':
      segments = children.split(/(\s+)/);
      break;
    case 'character':
      segments = children.split('');
      break;
    case 'line':
      segments = children.split('\n');
      break;
    case 'text':
    default:
      segments = [children];
      break;
  }

  return (
    <Box ref={ref} {...getStyles('root', { style: containerStyles })}>
      {segments.map((segment, i) => (
        <Text
          data-text-animate={animate}
          data-text-animate-animation={animation}
          key={`${by}-${segment}-${delay}-${animate}-${duration}-${JSON.stringify(animateProps)}-${i}`}
          {...getStyles('segment', {
            style: {
              ...(by === 'line' ? { display: 'block', whiteSpace: 'normal' } : {}),
              animationDelay: `${delay + i * staggerTiming}s`,
              animationDuration: `${duration}s`,
              animationFillMode: 'forwards',
              animationDirection: animate === 'in' ? 'normal' : 'reverse',
            },
          })}
          component="span"
          onAnimationStart={handleOnAnimationStart}
          onAnimationEnd={handleOnAnimationEnd}
          {...others}
        >
          {segment}
        </Text>
      ))}
    </Box>
  );
});

TextAnimate.classes = classes;
TextAnimate.displayName = 'TextAnimate';
TextAnimate.Typewriter = Typewriter;
TextAnimate.Spinner = Spinner;
TextAnimate.NumberTicker = NumberTicker;
TextAnimate.TextTicker = TextTicker;
