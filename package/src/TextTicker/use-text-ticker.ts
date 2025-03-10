import { useEffect, useRef, useState } from 'react';

/**
 * Available easing functions for the animation
 */
export type TextTickerEasing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

/**
 * Character sets for random characters
 */
export type TextTickerCharacterSet =
  | 'alphanumeric'
  | 'alphabetic'
  | 'numeric'
  | 'symbols'
  | 'custom';

/**
 * Direction for revealing the target text
 */
export type TextTickerRevealDirection = 'left-to-right' | 'right-to-left' | 'center-out' | 'random';

/**
 * Initial text display options
 */
export type TextTickerInitialDisplay = 'none' | 'random' | 'target';

/**
 * Base props shared between TextTicker component and useTextTicker hook
 */
export interface TextTickerBaseProps {
  /**
   * The target text to animate to
   */
  value: string;

  /**
   * Initial text display option
   * - `none`: Display nothing until animation starts
   * - `random`: Display random characters until animation starts
   * - `target`: Display the target text immediately
   * @default "random"
   */
  initialText?: TextTickerInitialDisplay;

  /**
   * Whether the animation should be active
   * @default true
   */
  animate?: boolean;

  /**
   * Character set to use for random characters
   * @default "alphanumeric"
   */
  characterSet?: TextTickerCharacterSet;

  /**
   * Custom characters to use when characterSet is `custom`
   * @default ""
   */
  customCharacters?: string;

  /**
   * Delay before starting the animation in seconds
   * @default 0
   */
  delay?: number;

  /**
   * Animation speed multiplier (higher = faster)
   * @default 1
   */
  speed?: number;

  /**
   * Easing function for the animation
   * @default "ease-out"
   */
  easing?: TextTickerEasing;

  /**
   * Speed multiplier for random character changes (higher = more frequent changes)
   * @default 1
   */
  randomChangeSpeed?: number;

  /**
   * Direction for revealing the target text
   * @default "left-to-right"
   */
  revealDirection?: TextTickerRevealDirection;

  /**
   * Callback function called when animation completes
   */
  onCompleted?: () => void;
}

/**
 * Hook props interface extending the base props
 */
export interface UseTextTickerProps extends TextTickerBaseProps {}

/**
 * Return value interface for the useTextTicker hook
 */
export interface UseTextTickerResult {
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
   * Function to reset the animation to the initial text
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
 * Easing functions for animation
 */
const easingFunctions = {
  linear: (t: number): number => t,
  'ease-in': (t: number): number => t * t,
  'ease-out': (t: number): number => 1 - Math.pow(1 - t, 2),
  'ease-in-out': (t: number): number => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
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

/**
 * Hook that provides text ticker animation functionality
 *
 * This hook powers the TextTicker component and can be used independently
 * for more advanced use cases.
 */
export function useTextTicker({
  value,
  initialText = 'random',
  animate = true,
  characterSet = 'alphanumeric',
  customCharacters = '',
  delay = 0,
  speed = 1,
  easing = 'ease-out',
  randomChangeSpeed = 1,
  revealDirection = 'left-to-right',
  onCompleted,
}: UseTextTickerProps): UseTextTickerResult {
  // State
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs
  const animationFrameRef = useRef<number | null>(null);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const charStabilityRef = useRef<boolean[]>([]);
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

  // Generate random text
  const generateRandomText = () => {
    const pool = getCharacterPool();
    let result = '';
    for (let i = 0; i < value.length; i++) {
      result += pool[Math.floor(Math.random() * pool.length)];
    }
    return result;
  };

  // Generate initial text
  const generateInitialText = () => {
    if (initialText === 'none') return '';
    if (initialText === 'target') return value;
    return generateRandomText();
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
          if (mid - i >= 0) result.push(mid - i);
          if (mid + i < value.length) result.push(mid + i);
        }

        return result;
      }

      case 'random':
        if (randomOrderRef.current.length === value.length) {
          return randomOrderRef.current;
        }

        const randomOrder = shuffleArray(indices);
        randomOrderRef.current = randomOrder;
        return randomOrder;

      case 'left-to-right':
      default:
        return indices;
    }
  };

  // Animation function
  const animateFrame = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
      charStabilityRef.current = Array(value.length).fill(false);
    }

    const elapsed = timestamp - startTimeRef.current;
    const duration = 1000 / speed;
    const progress = Math.min(elapsed / duration, 1);

    const easingFunction = easingFunctions[easing] || easingFunctions['ease-out'];
    const easedProgress = easingFunction(progress);

    let allStable = true;
    const pool = getCharacterPool();
    const changeThreshold = 1 / randomChangeSpeed;

    // Get the character indices in the desired order
    const charOrder = getCharIndexOrder();

    // Create a new text with characters in the original order
    const newTextArray = Array(value.length).fill('');

    for (let orderIndex = 0; orderIndex < charOrder.length; orderIndex++) {
      const i = charOrder[orderIndex];

      // Adjust the stability threshold based on the character's position in the reveal order
      const positionFactor = orderIndex / charOrder.length;
      const charStability = Math.min(1, easedProgress * 3 - positionFactor);

      if (charStabilityRef.current[i] || Math.random() < charStability) {
        charStabilityRef.current[i] = true;
        newTextArray[i] = value[i];
      } else {
        // Change random character if it exceeds the speed threshold
        if (Math.random() < changeThreshold) {
          newTextArray[i] = pool[Math.floor(Math.random() * pool.length)];
        } else {
          // Otherwise keep the previous character if possible
          const currentChar = displayText[i] || pool[Math.floor(Math.random() * pool.length)];
          newTextArray[i] = currentChar;
        }
        allStable = false;
      }
    }

    setDisplayText(newTextArray.join(''));

    // Check if animation is complete
    if (progress >= 1 || allStable) {
      // Set final text
      setDisplayText(value);

      // Reset animation state
      setIsAnimating(false);
      startTimeRef.current = 0;

      // Mark animation as completed
      animationCompletedRef.current = true;

      // Call completion callback
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

    // Set the manualStartRef flag only if the animation was not started by the animate prop
    if (!animatePropRef.current) {
      manualStartRef.current = true;
    } else {
      manualStartRef.current = false;
    }

    // Don't start if already animating
    if (isAnimating) return;

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
    startTimeRef.current = 0;
    charStabilityRef.current = Array(value.length).fill(false);

    // Update animation state
    setIsAnimating(true);

    // Start animation after delay
    delayTimeoutRef.current = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animateFrame);
    }, delay * 1000);
  };

  // Stop animation but keep current text
  const stop = () => {
    // Reset manual start flag
    manualStartRef.current = false;

    // Cancel animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Cancel delay timer
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }

    // Update animation state
    setIsAnimating(false);

    // Keep the current text (don't reset)
  };

  // Reset animation to initial state
  const reset = () => {
    // Stop the animation
    stop();

    // Reset to initial text
    setDisplayText(generateInitialText());

    // Reset animation state
    startTimeRef.current = 0;
    charStabilityRef.current = Array(value.length).fill(false);
    animationCompletedRef.current = false;
  };

  // Initialize text on mount
  useEffect(() => {
    if (isFirstRenderRef.current) {
      setDisplayText(generateInitialText());
      isFirstRenderRef.current = false;
    }
  }, []);

  // Handle animate prop changes
  useEffect(() => {
    // If the animate value has changed from the last stored value
    if (animate !== animatePropRef.current) {
      animatePropRef.current = animate;

      if (animate && !isAnimating) {
        // If animate became true and animation is not running, start it
        animationCompletedRef.current = false;
        start();
      } else if (!animate && isAnimating) {
        // If animate became false and animation is running, stop it without reset
        stop();
      }
    } else if (animate && !isAnimating && !animationCompletedRef.current) {
      // If animate is still true, but animation is not running and has not been completed
      // (this handles the initial case or when other props change)
      start();
    }
  }, [isAnimating, animate]);

  // Handle value text changes
  useEffect(() => {
    if (!isAnimating) {
      setDisplayText(generateInitialText());
    }
  }, [value, initialText, characterSet, customCharacters]);

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
