import React, { useState } from 'react';
import {
  Box,
  BoxProps,
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

// Add a new interface for AnimateProps
interface AnimateProps {
  /**
   * Controls the distance for slide animations (in pixels)
   * @default 20
   */
  translateDistance?: number;

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
  blurAmount?: number;
}

export type TextAnimateStylesNames = 'root';

export type TextAnimateCssVariables = {
  root: '';
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
   * Whether the animation is started (controlled mode)
   * When provided, the component becomes controlled and will only animate when this is true
   */
  start?: boolean;

  /**
   * Initial animation state for uncontrolled mode
   * @default false
   */
  defaultStart?: boolean;

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
  segmentDelay: 0.5,
  by: 'word',
  animation: 'fadeIn',
  animateProps: {
    translateDistance: 20,
    scaleAmount: 0.8,
    blurAmount: 10,
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

// const varsResolver = createVarsResolver<TextAnimateFactory>((_, {}) => ({
//   root: {},
// }));

export const TextAnimate = polymorphicFactory<TextAnimateFactory>((_props, ref) => {
  const props = useProps('TextAnimate', defaultProps, _props);
  const {
    delay,
    duration,
    segmentClassName,
    start,
    defaultStart,
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

  // Use start prop if provided (controlled mode), otherwise use internal state (uncontrolled)
  const [internalStart, setInternalStart] = useState(defaultStart);
  const isControlled = start !== undefined;
  const isVisible = isControlled ? start : internalStart;

  // Extract animateProps
  const { translateDistance, scaleAmount, blurAmount } = animateProps;

  // Use provided segmentDelay or default based on animation type
  const staggerTiming = segmentDelay !== undefined ? segmentDelay : defaultStaggerTimings[by];

  // Container styles
  const containerStyles: React.CSSProperties = {
    whiteSpace: 'pre-wrap',
    position: 'relative',
    display: 'block',
    minHeight: '1em',
  };

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

  // Generate animation styles for each segment
  const getSegmentStyle = (index: number) => {
    const staggerDelay = index * staggerTiming;
    const baseDelay = delay + staggerDelay;

    // Initial styles (before animation)
    const initialStyles: React.CSSProperties = {
      opacity: 0,
      transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${baseDelay}s`,
      display: by === 'line' ? 'block' : 'inline-block',
      whiteSpace: by === 'line' ? 'normal' : 'pre',
      willChange: 'opacity, transform, filter', // Optimize for animation
    };

    // Add transform/filter based on animation type with intensity controls
    switch (animation) {
      case 'fade':
        // No transform needed, just opacity animation
        break;
      case 'fadeIn':
        initialStyles.transform = `translateY(${translateDistance}px)`;
        break;
      case 'blurIn':
        initialStyles.filter = `blur(${blurAmount}px)`;
        break;
      case 'blurInUp':
        initialStyles.filter = `blur(${blurAmount}px)`;
        initialStyles.transform = `translateY(${translateDistance}px)`;
        break;
      case 'blurInDown':
        initialStyles.filter = `blur(${blurAmount}px)`;
        initialStyles.transform = `translateY(-${translateDistance}px)`;
        break;
      case 'slideUp':
        initialStyles.transform = `translateY(${translateDistance}px)`;
        break;
      case 'slideDown':
        initialStyles.transform = `translateY(-${translateDistance}px)`;
        break;
      case 'slideLeft':
        initialStyles.transform = `translateX(${translateDistance}px)`;
        break;
      case 'slideRight':
        initialStyles.transform = `translateX(-${translateDistance}px)`;
        break;
      case 'scaleUp':
        // For scaleUp, we start at a smaller scale (1 - scaleAmount)
        // e.g., if scaleAmount is 0.8, we start at 0.2
        initialStyles.transform = `scale(${Math.max(0.1, 1 - scaleAmount)})`;
        break;
      case 'scaleDown':
        // For scaleDown, we start at a larger scale (1 + scaleAmount)
        // e.g., if scaleAmount is 0.8, we start at 1.8
        initialStyles.transform = `scale(${1 + scaleAmount})`;
        break;
    }

    // Active styles (after animation)
    if (isVisible) {
      return {
        ...initialStyles,
        opacity: 1,
        filter: 'blur(0px)',
        transform: 'translate(0, 0) scale(1)',
      };
    }

    return initialStyles;
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
    //varsResolver,
  });

  return (
    <Box ref={ref} {...getStyles('root')} style={containerStyles}>
      {segments.map((segment, i) => (
        <Text
          key={`${by}-${segment}-${i}`}
          className={segmentClassName}
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
