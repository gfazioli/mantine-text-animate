import { useCallback, useEffect, useRef, useState } from 'react';

export interface RotatingTextBaseProps {
  /**
   * Array of text strings to rotate through
   */
  values: string[];

  /**
   * Whether the rotation animation is active
   * @default true
   */
  animate?: boolean;

  /**
   * Time in milliseconds each text stays visible before rotating
   * @default 3000
   */
  interval?: number;

  /**
   * Animation speed multiplier (higher = faster transition)
   * @default 1
   */
  speed?: number;

  /**
   * Callback fired when the text rotates to a new index
   */
  onCycle?: (index: number) => void;
}

export interface UseRotatingTextResult {
  /** Index of the currently displayed text */
  currentIndex: number;

  /** The currently displayed text */
  currentText: string;

  /** Index of the next text to display */
  nextIndex: number;

  /** The next text to display */
  nextText: string;

  /** Whether a transition animation is in progress */
  isTransitioning: boolean;

  /** Callback to attach to the entering element's onAnimationEnd */
  onTransitionEnd: () => void;

  /** Start the rotation */
  start: () => void;

  /** Stop the rotation */
  stop: () => void;

  /** Reset to the first text */
  reset: () => void;
}

/**
 * A hook that creates a rotating text effect, cycling through an array of strings
 */
export function useRotatingText(options: RotatingTextBaseProps): UseRotatingTextResult {
  const { values, animate = true, interval = 3000, onCycle } = options;

  const { speed = 1 } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isActive, setIsActive] = useState(animate);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const onCycleRef = useRef(onCycle);
  onCycleRef.current = onCycle;

  const nextIndex = (currentIndex + 1) % values.length;

  // Transition duration in ms (matches CSS: 0.5s / speed)
  const safeSpeed = Math.max(0.1, speed || 1);
  const transitionDuration = 500 / safeSpeed;

  const completeTransition = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    setCurrentIndex((prev) => {
      const next = (prev + 1) % values.length;
      onCycleRef.current?.(next);
      return next;
    });
    setIsTransitioning(false);
  }, [values.length]);

  // Schedule next transition
  useEffect(() => {
    if (!isActive || values.length <= 1 || isTransitioning) {
      return;
    }

    timerRef.current = setTimeout(() => {
      setIsTransitioning(true);
    }, interval);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isActive, currentIndex, interval, values.length, isTransitioning]);

  // Fallback timer: auto-complete transition if onTransitionEnd is not called by CSS
  useEffect(() => {
    if (!isTransitioning) {
      return;
    }

    fallbackTimerRef.current = setTimeout(completeTransition, transitionDuration + 50);

    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
      }
    };
  }, [isTransitioning, transitionDuration, completeTransition]);

  // Handle animate prop changes
  const prevAnimateRef = useRef(animate);
  useEffect(() => {
    if (animate && !prevAnimateRef.current) {
      setIsActive(true);
    }
    if (!animate && prevAnimateRef.current) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setIsActive(false);
      setIsTransitioning(false);
    }
    prevAnimateRef.current = animate;
  }, [animate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  // Called by the component's CSS onAnimationEnd — cancels fallback and completes immediately
  const onTransitionEnd = useCallback(() => {
    completeTransition();
  }, [completeTransition]);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setCurrentIndex(0);
    setIsTransitioning(false);
  }, []);

  return {
    currentIndex,
    currentText: values[currentIndex] ?? '',
    nextIndex,
    nextText: values[nextIndex] ?? '',
    isTransitioning,
    onTransitionEnd,
    start,
    stop,
    reset,
  };
}
