import { useEffect, useRef, useState } from 'react';

/**
 * Character sets for random characters
 */
export type ScrambleCharacterSet = 'alphanumeric' | 'alphabetic' | 'numeric' | 'symbols' | 'custom';

/**
 * Direction for revealing the target text
 */
export type ScrambleRevealDirection = 'left-to-right' | 'right-to-left' | 'center-out' | 'random';

/**
 * Base props shared between Scramble component and useScramble hook
 */
export interface ScrambleBaseProps {
  /**
   * The target text to animate to
   */
  value: string;

  /**
   * Whether the animation should be active
   * @default true
   */
  animate?: boolean;

  /**
   * Animation speed multiplier (higher = faster character cycling)
   * @default 1
   */
  speed?: number;

  /**
   * Duration in milliseconds each character scrambles before settling
   * @default 800
   */
  scrambleDuration?: number;

  /**
   * Direction for revealing the target text
   * @default "left-to-right"
   */
  revealDirection?: ScrambleRevealDirection;

  /**
   * Character set to use for scramble characters
   * @default "alphanumeric"
   */
  characterSet?: ScrambleCharacterSet;

  /**
   * Custom characters to use when characterSet is `custom`
   * @default ""
   */
  customCharacters?: string;

  /**
   * Delay in milliseconds between each character starting to scramble
   * @default 50
   */
  staggerDelay?: number;

  /**
   * Delay before starting the animation in seconds
   * @default 0
   */
  delay?: number;

  /**
   * Callback function called when animation completes
   */
  onCompleted?: () => void;
}

/**
 * Hook props interface extending the base props
 */
export interface UseScrambleProps extends ScrambleBaseProps {}

/**
 * Return value interface for the useScramble hook
 */
export interface UseScrambleResult {
  /**
   * The current text being displayed
   */
  text: string;

  /**
   * Function to start the animation
   */
  start: () => void;

  /**
   * Function to stop the animation while keeping the current text
   */
  stop: () => void;

  /**
   * Function to reset the animation to the initial state
   */
  reset: () => void;

  /**
   * Whether the animation is currently running
   */
  isAnimating: boolean;
}

/**
 * Character sets for random text generation
 */
const characterSets = {
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  alphabetic: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  numeric: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?/',
};

/**
 * Fisher-Yates (Knuth) shuffle algorithm
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

interface CharState {
  startTime: number;
  settled: boolean;
}

/**
 * Hook that provides scramble/decryption text animation functionality
 *
 * Each character cycles through random characters before settling on the target,
 * creating a "hacker/decryption" effect.
 */
export function useScramble({
  value,
  animate = true,
  speed = 1,
  scrambleDuration = 800,
  revealDirection = 'left-to-right',
  characterSet = 'alphanumeric',
  customCharacters = '',
  staggerDelay = 50,
  delay = 0,
  onCompleted,
}: UseScrambleProps): UseScrambleResult {
  // State
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs
  const animationFrameRef = useRef<number | null>(null);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationStartTimeRef = useRef<number>(0);
  const charStatesRef = useRef<CharState[]>([]);
  const randomOrderRef = useRef<number[]>([]);
  const isFirstRenderRef = useRef(true);
  const manualStartRef = useRef(false);
  const animatePropRef = useRef(animate);
  const animationCompletedRef = useRef(false);

  // Get character pool
  const getCharacterPool = () => {
    if (characterSet === 'custom' && customCharacters && customCharacters.length > 0) {
      return customCharacters;
    }
    return characterSets[characterSet === 'custom' ? 'alphanumeric' : characterSet];
  };

  // Get a random character from the pool
  const getRandomChar = () => {
    const pool = getCharacterPool();
    return pool[Math.floor(Math.random() * pool.length)];
  };

  // Get character index order based on reveal direction
  const getCharIndexOrder = () => {
    const indices = Array.from({ length: value.length }, (_, i) => i);

    switch (revealDirection) {
      case 'right-to-left':
        return indices.reverse();

      case 'center-out': {
        const result: number[] = [];
        const mid = Math.floor(value.length / 2);

        result.push(mid);

        for (let i = 1; i <= mid; i++) {
          if (mid - i >= 0) {
            result.push(mid - i);
          }
          if (mid + i < value.length) {
            result.push(mid + i);
          }
        }

        return result;
      }

      case 'random': {
        if (randomOrderRef.current.length === value.length) {
          return randomOrderRef.current;
        }

        const randomOrder = shuffleArray(indices);
        randomOrderRef.current = randomOrder;
        return randomOrder;
      }

      case 'left-to-right':
      default:
        return indices;
    }
  };

  // Build a map from character index to its order position
  const getOrderMap = () => {
    const order = getCharIndexOrder();
    const map = new Map<number, number>();
    order.forEach((charIndex, orderPosition) => {
      map.set(charIndex, orderPosition);
    });
    return map;
  };

  // Animation function
  const animateFrame = (timestamp: number) => {
    if (!animationStartTimeRef.current) {
      animationStartTimeRef.current = timestamp;

      // Initialize per-character states
      const orderMap = getOrderMap();
      charStatesRef.current = Array.from({ length: value.length }, (_, i) => ({
        startTime: timestamp + (orderMap.get(i) || 0) * staggerDelay,
        settled: false,
      }));
    }

    const pool = getCharacterPool();
    const cycleInterval = 50 / speed; // ms between character changes
    const newTextArray: string[] = [];
    let allSettled = true;

    for (let i = 0; i < value.length; i++) {
      const charState = charStatesRef.current[i];

      if (charState.settled) {
        // Already settled, show target character
        newTextArray.push(value[i]);
        continue;
      }

      if (timestamp < charState.startTime) {
        // Not started yet, show a random character (or space if target is space)
        if (value[i] === ' ') {
          newTextArray.push(' ');
        } else {
          newTextArray.push(getRandomChar());
        }
        allSettled = false;
        continue;
      }

      const charElapsed = timestamp - charState.startTime;

      if (charElapsed >= scrambleDuration) {
        // Character has scrambled long enough, settle it
        charState.settled = true;
        newTextArray.push(value[i]);
        continue;
      }

      // Character is actively scrambling
      // Cycle through random characters at the given speed
      if (value[i] === ' ') {
        newTextArray.push(' ');
      } else {
        // Change character based on cycle interval
        const cycleCount = Math.floor(charElapsed / cycleInterval);
        // Use a deterministic-ish approach: change on each cycle
        if (cycleCount % 1 === 0) {
          newTextArray.push(pool[Math.floor(Math.random() * pool.length)]);
        } else {
          newTextArray.push(getRandomChar());
        }
      }
      allSettled = false;
    }

    setDisplayText(newTextArray.join(''));

    if (allSettled) {
      // All characters have settled, animation is complete
      setDisplayText(value);
      setIsAnimating(false);
      animationStartTimeRef.current = 0;
      animationCompletedRef.current = true;

      if (onCompleted) {
        onCompleted();
      }

      return;
    }

    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animateFrame);
  };

  // Start animation
  const start = () => {
    animationCompletedRef.current = false;

    if (!animatePropRef.current) {
      manualStartRef.current = true;
    } else {
      manualStartRef.current = false;
    }

    // Don't start if already animating
    if (isAnimating) {
      return;
    }

    // Cancel any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Cancel any existing delay timer
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }

    // Reset animation state
    animationStartTimeRef.current = 0;
    charStatesRef.current = [];

    // Update animation state
    setIsAnimating(true);

    // Start animation after delay
    delayTimeoutRef.current = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animateFrame);
    }, delay * 1000);
  };

  // Stop animation but keep current text
  const stop = () => {
    manualStartRef.current = false;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }

    setIsAnimating(false);
  };

  // Reset animation to initial state
  const reset = () => {
    stop();

    // Show random characters as initial state
    let initial = '';
    for (let i = 0; i < value.length; i++) {
      if (value[i] === ' ') {
        initial += ' ';
      } else {
        initial += getRandomChar();
      }
    }
    setDisplayText(initial);

    // Reset animation state
    animationStartTimeRef.current = 0;
    charStatesRef.current = [];
    animationCompletedRef.current = false;
  };

  // Initialize text on mount
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;

      // Skip animation if user prefers reduced motion
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion && animate) {
        setDisplayText(value);
        animationCompletedRef.current = true;
        onCompleted?.();
        return;
      }

      // Show random characters initially
      let initial = '';
      for (let i = 0; i < value.length; i++) {
        if (value[i] === ' ') {
          initial += ' ';
        } else {
          initial += getRandomChar();
        }
      }
      setDisplayText(initial);
    }
  }, []);

  // Handle animate prop changes
  useEffect(() => {
    if (animate !== animatePropRef.current) {
      animatePropRef.current = animate;

      if (animate && !isAnimating) {
        animationCompletedRef.current = false;
        start();
      } else if (!animate && isAnimating) {
        stop();
      }
    } else if (animate && !isAnimating && !animationCompletedRef.current) {
      start();
    }
  }, [isAnimating, animate]);

  // Handle value text changes
  useEffect(() => {
    // Invalidate random order cache when value length changes
    if (randomOrderRef.current.length !== value.length) {
      randomOrderRef.current = [];
    }

    if (isAnimating) {
      // Restart animation with new value
      stop();
      animationStartTimeRef.current = 0;
      charStatesRef.current = [];
      animationCompletedRef.current = false;

      let initial = '';
      for (let i = 0; i < value.length; i++) {
        if (value[i] === ' ') {
          initial += ' ';
        } else {
          initial += getRandomChar();
        }
      }
      setDisplayText(initial);

      // Re-start on next tick so that stop() state updates are applied
      delayTimeoutRef.current = setTimeout(() => start(), 0);
    } else {
      let initial = '';
      for (let i = 0; i < value.length; i++) {
        if (value[i] === ' ') {
          initial += ' ';
        } else {
          initial += getRandomChar();
        }
      }
      setDisplayText(initial);
    }
  }, [value, characterSet, customCharacters]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
    };
  }, []);

  return {
    text: displayText,
    start,
    stop,
    reset,
    isAnimating,
  };
}
