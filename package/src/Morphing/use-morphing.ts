import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * State of a character during morphing transition
 */
export type MorphingCharState = 'static' | 'moving' | 'entering' | 'exiting';

/**
 * Represents a single character in the morphing animation
 */
export interface MorphingCharacter {
  /** The character */
  char: string;
  /** Unique key for React reconciliation */
  key: string;
  /** Current animation state */
  state: MorphingCharState;
  /** Starting X position in ch units */
  fromX: number;
  /** Target X position in ch units */
  toX: number;
}

/**
 * Base props shared between Morphing component and useMorphing hook
 */
export interface MorphingBaseProps {
  /**
   * The current target text to morph to
   */
  value: string;

  /**
   * Whether the morphing animation is active
   * @default true
   */
  animate?: boolean;

  /**
   * Transition speed multiplier (higher = faster)
   * @default 1
   */
  speed?: number;

  /**
   * Callback fired when the morphing transition completes
   */
  onCompleted?: () => void;
}

/**
 * Hook props interface extending the base props
 */
export interface UseMorphingProps extends MorphingBaseProps {}

/**
 * Return value interface for the useMorphing hook
 */
export interface UseMorphingResult {
  /** Array of characters with their animation states and positions */
  characters: MorphingCharacter[];
  /** Width of the current value in ch units */
  width: number;
  /** Start or restart the morphing animation */
  start: () => void;
  /** Stop the current animation */
  stop: () => void;
  /** Reset to the current value without animation */
  reset: () => void;
  /** Whether a morphing transition is currently in progress */
  isAnimating: boolean;
}

/**
 * Compute the Longest Common Subsequence of two strings
 */
function lcs(a: string, b: string): string {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find the LCS string
  let result = '';
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result = a[i - 1] + result;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  return result;
}

/**
 * Build the characters array by comparing old and new strings via LCS
 */
function buildCharacters(
  prevValue: string,
  nextValue: string,
  counterRef: { current: number }
): MorphingCharacter[] {
  const common = lcs(prevValue, nextValue);
  const characters: MorphingCharacter[] = [];

  // Track which positions in prevValue and nextValue are matched to LCS
  let ci = 0; // index into common (LCS)
  let pi = 0; // index into prevValue
  let ni = 0; // index into nextValue

  // Map LCS chars to their positions in prevValue
  const lcsOldPositions: number[] = [];
  let tempPi = 0;
  let tempCi = 0;
  while (tempCi < common.length && tempPi < prevValue.length) {
    if (prevValue[tempPi] === common[tempCi]) {
      lcsOldPositions.push(tempPi);
      tempCi++;
    }
    tempPi++;
  }

  // Map LCS chars to their positions in nextValue
  const lcsNewPositions: number[] = [];
  let tempNi = 0;
  tempCi = 0;
  while (tempCi < common.length && tempNi < nextValue.length) {
    if (nextValue[tempNi] === common[tempCi]) {
      lcsNewPositions.push(tempNi);
      tempCi++;
    }
    tempNi++;
  }

  // Add LCS characters as static or moving
  for (let k = 0; k < common.length; k++) {
    const fromX = lcsOldPositions[k];
    const toX = lcsNewPositions[k];
    const state: MorphingCharState = fromX === toX ? 'static' : 'moving';

    characters.push({
      char: common[k],
      key: `${common[k]}-lcs-${k}-${counterRef.current++}`,
      state,
      fromX,
      toX,
    });
  }

  // Find exiting characters (in prevValue but not in LCS)
  ci = 0;
  pi = 0;
  while (pi < prevValue.length) {
    if (ci < common.length && prevValue[pi] === common[ci] && pi === lcsOldPositions[ci]) {
      ci++;
    } else {
      characters.push({
        char: prevValue[pi],
        key: `${prevValue[pi]}-exit-${pi}-${counterRef.current++}`,
        state: 'exiting',
        fromX: pi,
        toX: pi,
      });
    }
    pi++;
  }

  // Find entering characters (in nextValue but not in LCS)
  ci = 0;
  ni = 0;
  while (ni < nextValue.length) {
    if (ci < common.length && nextValue[ni] === common[ci] && ni === lcsNewPositions[ci]) {
      ci++;
    } else {
      characters.push({
        char: nextValue[ni],
        key: `${nextValue[ni]}-enter-${ni}-${counterRef.current++}`,
        state: 'entering',
        fromX: ni,
        toX: ni,
      });
    }
    ni++;
  }

  return characters;
}

/**
 * Hook that provides text morphing animation functionality.
 *
 * Uses LCS (Longest Common Subsequence) to identify shared characters
 * between the previous and next text values, creating fluid transitions
 * where shared characters slide to their new positions while unique
 * characters fade in or out.
 */
export function useMorphing({
  value,
  animate = true,
  speed = 1,
  onCompleted,
}: UseMorphingProps): UseMorphingResult {
  const [characters, setCharacters] = useState<MorphingCharacter[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevValueRef = useRef('');
  const counterRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(false);

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const completeTransition = useCallback(() => {
    prevValueRef.current = value;

    // Remove exiting characters, keep only final state
    setCharacters((prev) =>
      prev
        .filter((c) => c.state !== 'exiting')
        .map((c) => ({
          ...c,
          state: 'static' as MorphingCharState,
          fromX: c.toX,
        }))
    );

    setIsAnimating(false);
    onCompleted?.();
  }, [value, onCompleted]);

  const startTransition = useCallback(() => {
    // SSR guard
    if (typeof window === 'undefined') {
      return;
    }

    // Skip animation if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Set final state immediately
      const finalChars = value.split('').map((char, i) => ({
        char,
        key: `${char}-static-${i}-${counterRef.current++}`,
        state: 'static' as MorphingCharState,
        fromX: i,
        toX: i,
      }));
      setCharacters(finalChars);
      prevValueRef.current = value;
      onCompleted?.();
      return;
    }

    cleanup();

    const chars = buildCharacters(prevValueRef.current, value, counterRef);
    setCharacters(chars);
    setIsAnimating(true);

    const duration = 1000 / (speed || 1);
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        completeTransition();
      }
    }, duration);
  }, [value, speed, cleanup, completeTransition, onCompleted]);

  const start = useCallback(() => {
    startTransition();
  }, [startTransition]);

  const stop = useCallback(() => {
    cleanup();
    setIsAnimating(false);
  }, [cleanup]);

  const reset = useCallback(() => {
    cleanup();
    setIsAnimating(false);
    prevValueRef.current = '';

    const chars = value.split('').map((char, i) => ({
      char,
      key: `${char}-static-${i}-${counterRef.current++}`,
      state: 'static' as MorphingCharState,
      fromX: i,
      toX: i,
    }));
    setCharacters(chars);
    prevValueRef.current = value;
  }, [cleanup, value]);

  // Track mount state
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Handle value changes
  useEffect(() => {
    if (!mountedRef.current) {
      // Initial mount: show the value without animation
      const chars = value.split('').map((char, i) => ({
        char,
        key: `${char}-static-${i}-${counterRef.current++}`,
        state: 'static' as MorphingCharState,
        fromX: i,
        toX: i,
      }));
      setCharacters(chars);
      prevValueRef.current = value;
      mountedRef.current = true;
      return;
    }

    if (value === prevValueRef.current) {
      return;
    }

    if (animate) {
      startTransition();
    } else {
      // No animation: jump to final state
      const chars = value.split('').map((char, i) => ({
        char,
        key: `${char}-static-${i}-${counterRef.current++}`,
        state: 'static' as MorphingCharState,
        fromX: i,
        toX: i,
      }));
      setCharacters(chars);
      prevValueRef.current = value;
    }
  }, [value, animate, startTransition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    characters,
    width: value.length,
    start,
    stop,
    reset,
    isAnimating,
  };
}
