import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Represents the state of a single character in the split-flap display
 */
export interface SplitFlapCharacter {
  /** The character currently displayed */
  current: string;
  /** The next character to flip to */
  next: string;
  /** Whether this character is currently mid-flip */
  isFlipping: boolean;
  /** Whether this character has reached its target */
  settled: boolean;
  /** Key that changes on every flip step — used to force-remount flap elements so CSS animations restart */
  flipKey: number;
}

/**
 * Base props shared between SplitFlap component and useSplitFlap hook
 */
export interface SplitFlapBaseProps {
  /**
   * The target text to display (will be uppercased)
   */
  value: string;

  /**
   * Whether the animation should be active
   * @default true
   */
  animate?: boolean;

  /**
   * Speed multiplier (higher = faster)
   * @default 1
   */
  speed?: number;

  /**
   * Character set to cycle through
   * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 '
   */
  characterSet?: string;

  /**
   * Duration of each flip in milliseconds
   * @default 300
   */
  flipDuration?: number;

  /**
   * Delay between each character starting its animation in milliseconds
   * @default 80
   */
  staggerDelay?: number;

  /**
   * Delay before the animation starts in seconds
   * @default 0
   */
  delay?: number;

  /**
   * Callback fired when all characters have settled
   */
  onCompleted?: () => void;
}

/**
 * Hook props interface extending the base props
 */
export interface UseSplitFlapProps extends SplitFlapBaseProps {}

/**
 * Return value interface for the useSplitFlap hook
 */
export interface UseSplitFlapResult {
  /** Current state of each character */
  characters: SplitFlapCharacter[];
  /** Start or restart the animation */
  start: () => void;
  /** Stop the animation, keeping current state */
  stop: () => void;
  /** Reset all characters to space */
  reset: () => void;
  /** Whether the animation is currently running */
  isAnimating: boolean;
}

/**
 * Creates the initial character state for a given length
 */
function createInitialCharacters(length: number): SplitFlapCharacter[] {
  return Array.from({ length }, () => ({
    current: ' ',
    next: ' ',
    isFlipping: false,
    settled: false,
    flipKey: 0,
  }));
}

/**
 * Hook that provides split-flap (airport departure board) animation functionality.
 *
 * Each character cycles through the characterSet in order until reaching
 * the target character, with staggered start times for a realistic effect.
 */
export function useSplitFlap({
  value,
  animate = true,
  speed: _speed = 1,
  characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ',
  flipDuration = 300,
  staggerDelay = 80,
  delay = 0,
  onCompleted,
}: UseSplitFlapProps): UseSplitFlapResult {
  const speed = Math.max(0.1, _speed);
  const targetText = value.toUpperCase();

  const [characters, setCharacters] = useState<SplitFlapCharacter[]>(() =>
    createInitialCharacters(targetText.length)
  );
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs for cleanup and state tracking
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);
  const animatePropRef = useRef(animate);
  const animationCompletedRef = useRef(false);
  const onCompletedRef = useRef(onCompleted);

  // Keep onCompleted ref up to date
  useEffect(() => {
    onCompletedRef.current = onCompleted;
  }, [onCompleted]);

  /**
   * Clears all pending timeouts
   */
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
  }, []);

  /**
   * Starts the flip animation for a single character at the given index
   */
  const animateCharacter = useCallback(
    (index: number, target: string) => {
      const effectiveFlipDuration = flipDuration / speed;

      // Find the sequence of characters to cycle through
      const spaceIndex = characterSet.indexOf(' ');
      const targetIndex = characterSet.indexOf(target);

      // Build the sequence from space to target character
      let sequence: string[] = [];

      if (target === ' ') {
        // Target is space, already there — settle immediately
        setCharacters((prev) => {
          const next = [...prev];
          next[index] = {
            current: ' ',
            next: ' ',
            isFlipping: false,
            settled: true,
            flipKey: 0,
          };
          return next;
        });
        return;
      }

      if (targetIndex === -1) {
        // Character not in set — show it directly
        setCharacters((prev) => {
          const next = [...prev];
          next[index] = {
            current: target,
            next: target,
            isFlipping: false,
            settled: true,
            flipKey: 0,
          };
          return next;
        });
        return;
      }

      // Cycle from space through character set until target
      const startIdx = spaceIndex !== -1 ? spaceIndex : 0;
      if (startIdx <= targetIndex) {
        for (let i = startIdx; i <= targetIndex; i++) {
          sequence.push(characterSet[i]);
        }
      } else {
        // Wrap around
        for (let i = startIdx; i < characterSet.length; i++) {
          sequence.push(characterSet[i]);
        }
        for (let i = 0; i <= targetIndex; i++) {
          sequence.push(characterSet[i]);
        }
      }

      // Remove the leading space (our starting point)
      if (sequence.length > 0 && sequence[0] === ' ') {
        sequence = sequence.slice(1);
      }

      // Schedule each flip — each step sets isFlipping: true with a new flipKey
      // which forces React to re-mount the flap elements, restarting CSS animations
      sequence.forEach((nextChar, stepIndex) => {
        const timeout = setTimeout(() => {
          if (!isAnimatingRef.current) {
            return;
          }
          setCharacters((prev) => {
            const updated = [...prev];
            const currentChar = stepIndex === 0 ? ' ' : sequence[stepIndex - 1];
            updated[index] = {
              current: currentChar,
              next: nextChar,
              isFlipping: true,
              settled: false,
              flipKey: stepIndex + 1,
            };
            return updated;
          });
        }, stepIndex * effectiveFlipDuration);
        timeoutsRef.current.push(timeout);
      });

      // Settle after the last flip completes
      const settleTimeout = setTimeout(() => {
        if (!isAnimatingRef.current) {
          return;
        }
        const lastChar = sequence[sequence.length - 1];
        setCharacters((prev) => {
          const updated = [...prev];
          updated[index] = {
            current: lastChar,
            next: lastChar,
            isFlipping: false,
            settled: true,
            flipKey: sequence.length + 1,
          };
          return updated;
        });
      }, sequence.length * effectiveFlipDuration);
      timeoutsRef.current.push(settleTimeout);
    },
    [characterSet, flipDuration, speed]
  );

  /**
   * Starts the split-flap animation
   */
  const start = useCallback(() => {
    // SSR guard
    if (typeof window === 'undefined') {
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show final text immediately
      setCharacters(
        targetText.split('').map((char) => ({
          current: char,
          next: char,
          isFlipping: false,
          settled: true,
          flipKey: 0,
        }))
      );
      setIsAnimating(false);
      isAnimatingRef.current = false;
      animationCompletedRef.current = true;
      onCompletedRef.current?.();
      return;
    }

    // Clear any existing animation
    clearAllTimeouts();

    // Reset characters to spaces
    setCharacters(createInitialCharacters(targetText.length));
    setIsAnimating(true);
    isAnimatingRef.current = true;
    animationCompletedRef.current = false;

    const effectiveFlipDuration = flipDuration / speed;

    // Schedule each character with stagger
    delayTimeoutRef.current = setTimeout(() => {
      targetText.split('').forEach((targetChar, index) => {
        const charStartTimeout = setTimeout(() => {
          if (!isAnimatingRef.current) {
            return;
          }
          animateCharacter(index, targetChar);
        }, staggerDelay * index);
        timeoutsRef.current.push(charStartTimeout);
      });

      // Calculate total animation duration and schedule completion
      const lastCharStart = staggerDelay * (targetText.length - 1);
      const maxFlips = characterSet.length;
      const totalDuration =
        lastCharStart + maxFlips * effectiveFlipDuration + effectiveFlipDuration;

      const completionTimeout = setTimeout(() => {
        // Final settle — ensure all characters show target
        setCharacters(
          targetText.split('').map((char) => ({
            current: char,
            next: char,
            isFlipping: false,
            settled: true,
            flipKey: 0,
          }))
        );
        setIsAnimating(false);
        isAnimatingRef.current = false;
        animationCompletedRef.current = true;
        onCompletedRef.current?.();
      }, totalDuration);
      timeoutsRef.current.push(completionTimeout);
    }, delay * 1000);
  }, [
    targetText,
    clearAllTimeouts,
    animateCharacter,
    flipDuration,
    speed,
    staggerDelay,
    delay,
    characterSet.length,
  ]);

  /**
   * Stops the animation, keeping the current character state
   */
  const stop = useCallback(() => {
    clearAllTimeouts();
    setIsAnimating(false);
    isAnimatingRef.current = false;
  }, [clearAllTimeouts]);

  /**
   * Resets all characters to space
   */
  const reset = useCallback(() => {
    clearAllTimeouts();
    setCharacters(createInitialCharacters(targetText.length));
    setIsAnimating(false);
    isAnimatingRef.current = false;
    animationCompletedRef.current = false;
  }, [clearAllTimeouts, targetText.length]);

  // Handle animate prop changes
  useEffect(() => {
    if (animate !== animatePropRef.current) {
      animatePropRef.current = animate;

      if (animate && !isAnimatingRef.current) {
        animationCompletedRef.current = false;
        start();
      } else if (!animate && isAnimatingRef.current) {
        stop();
      }
    } else if (animate && !isAnimatingRef.current && !animationCompletedRef.current) {
      start();
    }
  }, [animate, start, stop]);

  // Handle value changes
  useEffect(() => {
    if (isAnimatingRef.current) {
      // Restart with new value
      start();
    } else if (animationCompletedRef.current) {
      // Re-animate to new value
      animationCompletedRef.current = false;
      if (animate) {
        start();
      }
    } else {
      // Update character count if value length changed
      setCharacters(createInitialCharacters(targetText.length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: adding deps would cause animation loops
  }, [targetText]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  return {
    characters,
    start,
    stop,
    reset,
    isAnimating,
  };
}
