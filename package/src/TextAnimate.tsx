import React, { useEffect, useState } from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  getSize,
  MantineSize,
  PolymorphicFactory,
  polymorphicFactory,
  StylesApiProps,
  Text,
  useProps,
  useStyles,
} from '@mantine/core';
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
  | 'fade' // Simple fade in with no movement
  | 'fadeIn' // Fade in from transparent to opaque with a slight upward movement
  | 'blurIn' // Fade in with a blur effect
  | 'blurInUp' // Fade in with blur and upward movement
  | 'blurInDown' // Fade in with blur and downward movement
  | 'slideUp' // Slide in from bottom to top
  | 'slideDown' // Slide in from top to bottom
  | 'slideLeft' // Slide in from right to left
  | 'slideRight' // Slide in from left to right
  | 'scaleUp' // Scale up from smaller to normal size
  | 'scaleDown'; // Scale down from larger to normal size

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

export type TextAnimateStylesNames = 'root';

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
   * - "in": Animate elements in (appear)
   * - "out": Animate elements out (disappear)
   * - "static": Do not animate
   * - "none": Do not animate
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
  };
}>;

const defaultProps: Partial<TextAnimateProps> = {
  delay: 0,
  duration: 0.3,
  segmentDelay: 0.05,
  by: 'word',
  animation: 'fadeIn',
  animateProps: {
    translateDistance: '20' as MantineSize,
    scaleAmount: 0.8,
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

  // Get animation class for each segment
  const getSegmentClasses = (index: number) => {
    const baseClass = by === 'line' ? classes.lineSegment : classes.segment;
    const animationClass = classes[`${animation}-${animate}`];
    const durationClass =
      classes[`duration-${Math.round(duration * 1000)}`] || classes['duration-300'];
    const easingClass = classes.ease;
    const forwardsClass = classes.forwards;

    // Add initialHidden class if we're transitioning from "none" to "in"
    const initialHiddenClass = isInitialRender && animate === 'in' ? classes.initialHidden : '';

    // Combine all classes
    return `${baseClass} ${animationClass} ${durationClass} ${easingClass} ${forwardsClass} ${initialHiddenClass} ${segmentClassName || ''}`;
  };

  // Get animation delay for each segment
  const getSegmentStyle = (index: number) => {
    const staggerDelay = index * staggerTiming;
    const baseDelay = delay + staggerDelay;

    return {
      animationDelay: `${baseDelay}s`,
    };
  };

  return (
    <Box ref={ref} {...getStyles('root', { style: containerStyles })}>
      {segments.map((segment, i) => (
        <Text
          key={`${by}-${segment}-${i}`}
          className={getSegmentClasses(i)}
          component="span"
          style={getSegmentStyle(i)}
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
