import { useEffect, useRef, useState } from 'react';

/**
 * Available easing functions for the animation
 */
export type NumberTickerEasing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

/**
 * Base props shared between NumberTicker component and useNumberTicker hook
 */
export interface NumberTickerBaseProps {
  /**
   * The target value to animate to
   */
  value: number;

  /**
   * The initial value to start from
   * @default 0
   */
  startValue?: number;

  /**
   * Delay before starting the animation in seconds
   * @default 0
   */
  delay?: number;

  /**
   * Number of decimal places to display
   * @default 0
   */
  decimalPlaces?: number;

  /**
   * Animation speed multiplier (higher = faster)
   * @default 1
   */
  speed?: number;

  /**
   * Easing function for the animation
   * @default "ease-out"
   */
  easing?: NumberTickerEasing;

  /**
   * Whether the animation should be active
   * @default true
   */
  animate?: boolean;
  /**
   * Callback function called when animation completes
   */
  onCompleted?: () => void;
}

/**
 * Hook props interface extending the base props
 */
export interface UseNumberTickerProps extends NumberTickerBaseProps {}

/**
 * Return value interface for the useNumberTicker hook
 */
export interface UseNumberTickerResult {
  /**
   * The formatted text representation of the current value
   */
  text: string;

  /**
   * The current numeric value (not formatted)
   */
  displayValue: number;

  /**
   * Function to start the animation
   */
  start: () => void;

  /**
   * Function to stop the animation while keeping the current value
   */
  stop: () => void;

  /**
   * Function to reset the animation to the initial value
   */
  reset: () => void;

  /**
   * Whether the animation is currently running
   */
  isAnimating: boolean;
}

/**
 * Easing functions for animation
 */
const easingFunctions = {
  // No easing, no acceleration
  linear: (t: number): number => t,

  // Accelerating from zero velocity
  'ease-in': (t: number): number => t * t,

  // Decelerating to zero velocity
  'ease-out': (t: number): number => 1 - (1 - t) ** 2,

  // Acceleration until halfway, then deceleration
  'ease-in-out': (t: number): number => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
};

/**
 * Hook that provides number ticker animation functionality
 *
 * This hook powers the NumberTicker component and can be used independently
 * for more advanced use cases.
 */
export function useNumberTicker({
  value,
  startValue = 0,
  delay = 0,
  decimalPlaces = 0,
  speed = 1,
  easing = 'ease-out',
  animate = true,
  onCompleted,
}: UseNumberTickerProps): UseNumberTickerResult {
  // State for current display value and animation status
  const [displayValue, setDisplayValue] = useState(startValue);
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs to track animation state
  const animationRef = useRef<number | null>(null);
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef(0);
  const animationCompletedRef = useRef(false);
  const animateRef = useRef(animate);
  const isFirstRenderRef = useRef(true);

  // Refs to track value changes
  const prevValueRef = useRef(value);
  const prevStartValueRef = useRef(startValue);

  // Format the number with proper decimal places
  const formatNumber = (num: number) => {
    return Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(num);
  };

  // Animation function
  const animateFrame = (timestamp: number, from: number, to: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    // Calculate elapsed time and progress
    const elapsed = timestamp - startTimeRef.current;
    const duration = 1000 / speed; // Duration in ms, adjusted by speed
    const progress = Math.min(elapsed / duration, 1);

    // Apply easing function
    const easingFunction = easingFunctions[easing] || easingFunctions['ease-out'];
    const easedProgress = easingFunction(progress);

    // Calculate current value
    const valueRange = to - from;
    const currentValue = from + valueRange * easedProgress;

    // Update display value
    setDisplayValue(currentValue);

    // Continue animation if not complete
    if (progress < 1) {
      animationRef.current = requestAnimationFrame((time) => animateFrame(time, from, to));
    } else {
      // Animation complete
      setDisplayValue(to);
      setIsAnimating(false);
      startTimeRef.current = 0;
      animationCompletedRef.current = true;

      // Call completion callback
      if (onCompleted) {
        onCompleted();
      }
    }
  };

  // Clean up any running animations
  const cleanupAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }
  };

  // Start animation from a specific value to a target
  const startAnimationFrom = (fromValue: number, toValue: number) => {
    // Don't restart if already animating to the same target
    if (isAnimating && toValue === value && fromValue === displayValue) {
      return;
    }

    // Clean up any running animations
    cleanupAnimation();

    // Reset animation state
    startTimeRef.current = 0;
    animationCompletedRef.current = false;
    setIsAnimating(true);

    // Start animation after delay
    delayTimerRef.current = setTimeout(() => {
      animationRef.current = requestAnimationFrame((time) =>
        animateFrame(time, fromValue, toValue)
      );
    }, delay * 1000);
  };

  // Start animation from initial value
  const start = () => {
    animationCompletedRef.current = false;
    startAnimationFrom(startValue, value);
  };

  // Stop animation but keep current value
  const stop = () => {
    cleanupAnimation();
    setIsAnimating(false);
  };

  // Reset animation to initial state
  const reset = () => {
    stop();
    setDisplayValue(startValue);
    animationCompletedRef.current = false;
  };

  // Initialize on mount
  useEffect(() => {
    if (isFirstRenderRef.current) {
      setDisplayValue(startValue);
      isFirstRenderRef.current = false;

      // Start animation if animate is true
      if (animate) {
        startAnimationFrom(startValue, value);
      }
    }
  }, []);

  // Replace the useEffect that handles changes to started with this corrected version
  // Handle animate prop changes
  useEffect(() => {
    // If the value of animate has changed
    if (animate !== animateRef.current) {
      // Update the reference
      animateRef.current = animate;

      if (animate) {
        // If animate has become true, restart the animation from the initial value (startValue)
        // regardless of the current state
        animationCompletedRef.current = false;

        // Important: restart the animation always when animate becomes true
        cleanupAnimation();
        setDisplayValue(startValue); // Reset to the initial value
        startAnimationFrom(startValue, value);
      } else if (isAnimating) {
        // If animate has become false and the animation is in progress, stop it
        stop();
      }
    }
  }, [animate, value, startValue, isAnimating]);

  // Handle value or startValue changes
  useEffect(() => {
    const valueChanged = value !== prevValueRef.current;
    const startValueChanged = startValue !== prevStartValueRef.current;

    // Update refs
    prevValueRef.current = value;
    prevStartValueRef.current = startValue;

    if (valueChanged || startValueChanged) {
      if (isAnimating) {
        // If already animating, animate from current value to new target
        startAnimationFrom(displayValue, value);
      } else if (animationCompletedRef.current && valueChanged) {
        // If animation was completed and value changed, start from current to new target
        if (animate) {
          startAnimationFrom(displayValue, value);
        }
      } else if (animate) {
        // If not animating but animation is enabled, start from startValue to value
        startAnimationFrom(startValue, value);
      } else {
        // If not animating and not started, just update the display value to startValue
        setDisplayValue(startValue);
      }
    }
  }, [value, startValue, animate, isAnimating, displayValue]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAnimation();
    };
  }, []);

  // Return formatted text and animation controls
  return {
    text: formatNumber(displayValue),
    displayValue,
    start,
    stop,
    reset,
    isAnimating,
  };
}
