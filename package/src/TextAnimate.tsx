import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  type TextProps,
  type TextStylesNames,
  type TextVariant,
} from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import { Gradient } from './Gradient/Gradient';
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
export type TextAnimateAnimationType = 'text' | 'word' | 'character' | 'line';

/**
 * Available animation variants
 */
export type TextAnimateAnimationVariant =
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
export type TextAnimateAnimationDirection = 'in' | 'out' | 'static' | 'none' | false | undefined;

// Add a new interface for AnimateProps
interface TextAnimateAnimateProps {
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

/**
 * Trigger mode for TextAnimate animation
 * - `mount`: Animate on mount (default behavior)
 * - `inView`: Animate when the element enters the viewport
 * - `manual`: Do not auto-animate; control via `animate` prop only
 */
export type TextAnimateTrigger = 'mount' | 'inView' | 'manual';

/**
 * Options for the IntersectionObserver when trigger is "inView"
 */
export interface TextAnimateTriggerOptions {
  /**
   * IntersectionObserver threshold (0-1)
   * @default 0.1
   */
  threshold?: number;

  /**
   * IntersectionObserver root margin
   * @default "0px"
   */
  rootMargin?: string;
}

export type TextAnimateStylesNames = 'root' | 'segment' | TextStylesNames;

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
  by?: TextAnimateAnimationType;

  /**
   * Controls the animation direction
   * - `in`: Animate elements in (appear)
   * - `out`: Animate elements out (disappear)
   * - `static`: Do not animate
   * - `none`: Do not animate
   * @default undefined (no animation)
   */
  animate?: TextAnimateAnimationDirection;

  /**
   * The animation preset to use
   * @default "fade"
   */
  animation?: TextAnimateAnimationVariant;

  /**
   * The delay between each segment's animation (in seconds)
   * This controls the staggered timing between segments
   * @default Based on animation type (0.03-0.06)
   */
  segmentDelay?: number;

  /**
   * Animation properties to control intensity of animations
   * @default Values are chosen to match the selected animation variant.
   */
  animateProps?: TextAnimateAnimateProps;

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

  /**
   * Callback function called when all segments have completed their animation
   * @param animate The direction of the animation
   */
  onAnimationComplete?: (animate: 'in' | 'out') => void;

  /**
   * Trigger mode for animation
   * - `mount`: Animate on mount (default, preserves v2 behavior)
   * - `inView`: Animate when element enters the viewport via IntersectionObserver
   * - `manual`: Do not auto-animate; control via `animate` prop only
   * @default "mount"
   */
  trigger?: TextAnimateTrigger;

  /**
   * Options for IntersectionObserver when trigger is "inView"
   */
  triggerOptions?: TextAnimateTriggerOptions;
}

export interface TextAnimateProps
  extends
    BoxProps,
    Omit<TextProps, 'classNames' | 'styles' | 'unstyled' | 'vars' | 'attributes'>,
    TextAnimateBaseProps,
    StylesApiProps<TextAnimateFactory> {}

export type TextAnimateFactory = PolymorphicFactory<{
  props: TextAnimateProps;
  defaultComponent: 'p';
  defaultRef: HTMLParagraphElement;
  stylesNames: TextAnimateStylesNames;
  vars: TextAnimateCssVariables;
  variant: TextVariant;
  staticComponents: {
    Typewriter: typeof Typewriter;
    Spinner: typeof Spinner;
    NumberTicker: typeof NumberTicker;
    TextTicker: typeof TextTicker;
    Gradient: typeof Gradient;
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
const defaultStaggerTimings: Record<TextAnimateAnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const containerStyles: React.CSSProperties = {
  whiteSpace: 'pre-wrap',
  position: 'relative',
  display: 'block',
  minHeight: '1em',
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
    onAnimationComplete,
    trigger,
    triggerOptions,

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

  // Track completed segment animations and will-change lifecycle
  const completedCountRef = useRef(0);
  const prevAnimateRef = useRef(animate);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset counter when animate direction changes
  if (animate !== prevAnimateRef.current) {
    completedCountRef.current = 0;
    setIsAnimating(true);
    prevAnimateRef.current = animate;
  }

  // IntersectionObserver for trigger="inView"
  const inViewRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (trigger !== 'inView' || !inViewRef.current || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: triggerOptions?.threshold ?? 0.1,
        rootMargin: triggerOptions?.rootMargin ?? '0px',
      }
    );

    observer.observe(inViewRef.current);
    return () => observer.disconnect();
  }, [trigger, triggerOptions?.threshold, triggerOptions?.rootMargin]);

  const mergedRef = useMergedRef(ref, inViewRef);

  // Resolve effective animate value based on trigger mode
  let effectiveAnimate = animate;
  if (trigger === 'inView') {
    effectiveAnimate = inView ? animate || 'in' : undefined;
  }

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

  // Split text based on the 'by' prop — must be before early returns to keep hook order stable
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

  // Handle animation events — hooks must be called before early returns
  const handleOnAnimationStart = useCallback(() => {
    setIsAnimating(true);
    onAnimationStart?.(effectiveAnimate as 'in' | 'out');
  }, [onAnimationStart, effectiveAnimate]);

  const handleOnAnimationEnd = useCallback(() => {
    onAnimationEnd?.(effectiveAnimate as 'in' | 'out');
    completedCountRef.current += 1;
    if (completedCountRef.current === segments.length) {
      setIsAnimating(false);
      onAnimationComplete?.(effectiveAnimate as 'in' | 'out');
    }
  }, [onAnimationEnd, onAnimationComplete, effectiveAnimate, segments.length]);

  // If animate is "none" or false, render hidden text (preserves layout space)
  if (effectiveAnimate === 'none' || effectiveAnimate === false || effectiveAnimate === undefined) {
    return (
      <Box ref={mergedRef} {...getStyles('root')} style={containerStyles} aria-live="polite">
        <Text component="span" {...others} style={{ visibility: 'hidden' }}>
          {children}
        </Text>
      </Box>
    );
  }

  // If animate is "static", render the text directly without animation
  if (effectiveAnimate === 'static') {
    return (
      <Box ref={mergedRef} {...getStyles('root')} style={containerStyles} aria-live="polite">
        <Text component="span" {...others}>
          {children}
        </Text>
      </Box>
    );
  }

  return (
    <Box ref={mergedRef} {...getStyles('root', { style: containerStyles })} aria-live="polite">
      {segments.map((segment, i) => (
        <Text
          data-text-animate={effectiveAnimate}
          data-text-animate-animation={animation}
          data-animating={isAnimating || undefined}
          key={`${by}-${effectiveAnimate}-${i}`}
          {...getStyles('segment', {
            style: {
              ...(by === 'line' ? { display: 'block', whiteSpace: 'normal' } : {}),
              animationDelay: `${delay + i * staggerTiming}s`,
              animationDuration: `${duration}s`,
              animationFillMode: 'forwards',
              animationDirection: effectiveAnimate === 'in' ? 'normal' : 'reverse',
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
TextAnimate.Gradient = Gradient;
