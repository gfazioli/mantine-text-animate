import { useCallback, useRef, useState } from 'react';
import type { TextAnimateAnimationDirection } from './TextAnimate';

export interface UseTextAnimateResult {
  /**
   * The current animation direction
   */
  animate: TextAnimateAnimationDirection;

  /**
   * Set the animation direction
   */
  setAnimate: (direction: TextAnimateAnimationDirection) => void;

  /**
   * Replay the animation by forcing a remount via key change
   */
  replay: () => void;

  /**
   * Whether the animation is currently running
   */
  isAnimating: boolean;

  /**
   * Key to pass to TextAnimate for remount-based replay
   */
  key: number;

  /**
   * Callback to pass to TextAnimate's onAnimationComplete prop
   */
  onAnimationComplete: (direction: 'in' | 'out') => void;
}

/**
 * Hook that provides control over TextAnimate component
 *
 * Returns state and controls for managing TextAnimate animation direction,
 * replay capability, and animation status tracking.
 *
 * @param initialDirection - The initial animation direction
 */
export function useTextAnimate(
  initialDirection: TextAnimateAnimationDirection = undefined
): UseTextAnimateResult {
  const [animate, setAnimate] = useState<TextAnimateAnimationDirection>(initialDirection);
  const [isAnimating, setIsAnimating] = useState(false);
  const [key, setKey] = useState(0);
  const animatingRef = useRef(false);

  const replay = useCallback(() => {
    setKey((prev) => prev + 1);
    animatingRef.current = true;
    setIsAnimating(true);
  }, []);

  const handleSetAnimate = useCallback((direction: TextAnimateAnimationDirection) => {
    setAnimate(direction);
    if (direction === 'in' || direction === 'out' || direction === 'loop') {
      animatingRef.current = true;
      setIsAnimating(true);
    }
  }, []);

  const onAnimationComplete = useCallback(() => {
    animatingRef.current = false;
    setIsAnimating(false);
  }, []);

  return {
    animate,
    setAnimate: handleSetAnimate,
    replay,
    isAnimating,
    key,
    onAnimationComplete,
  };
}
