import { useCallback, useEffect, useRef, useState } from 'react';

export interface TypewriterBaseProps {
  /**
   * The text or array of texts to display in typewriter effect
   */
  value: string | string[];

  /**
   * Controls if the animation is running (`true`) or reset (false)
   * @default true
   */
  animate?: boolean;

  /**
   * Whether to display text in multiple lines
   * @default false
   */
  multiline?: boolean;

  /**
   * The typing speed in seconds per character
   * @default 0.03
   */
  speed?: number;

  /**
   * The delay between text changes in milliseconds (when using multiple texts)
   * @default 2000
   */
  delay?: number;

  /**
   * Whether to loop through the texts
   * @default true
   */
  loop?: boolean;

  /**
   * Callback function to be called when the typing animation ends
   */
  onTypeEnd?: () => void;

  /**
   * Callback function to be called when the typing animation is looped
   * and the animation is about to start again
   */
  onTypeLoop?: () => void;
}

export interface UseTypewriterResult {
  /**
   * The current text being displayed
   * If multiline is true, this will be an array of strings
   */
  text: string | string[];

  /**
   * Whether the typewriter is currently typing
   */
  isTyping: boolean;

  /**
   * Start the typewriter animation
   */
  start: () => void;

  /**
   * Stop the typewriter animation
   */
  stop: () => void;

  /**
   * Reset the typewriter to its initial state
   */
  reset: () => void;
}

/**
 * A hook that creates a typewriter effect
 */
export function useTypewriter(options: TypewriterBaseProps): UseTypewriterResult {
  const {
    value,
    animate = true,
    multiline = false,
    speed = 0.03,
    delay = 2000,
    loop = true,
    onTypeEnd,
    onTypeLoop,
  } = options;

  // Convert single text to array if needed
  const textArray = Array.isArray(value) ? value : [value];

  // State for the current text being displayed
  const [displayText, setDisplayText] = useState('');

  // State for completed lines (used in multiline mode)
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  // State for the current text index in the array
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // States for controlling the animation
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isActive, setIsActive] = useState(animate);

  // Ref for timeout to clean up on unmount
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Previous animate value for comparison
  const prevAnimateRef = useRef(animate);

  // Current full text being typed
  const currentFullText = textArray[currentTextIndex];

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle changes to the animate prop
  useEffect(() => {
    // If animate changed from false to true
    if (!prevAnimateRef.current && animate) {
      setIsActive(true);
    }

    // If animate changed from true to false
    if (prevAnimateRef.current && !animate) {
      // Reset the animation
      setIsActive(false);
      setDisplayText('');
      setCompletedLines([]);
      setCurrentTextIndex(0);
      setIsTyping(true);
      setIsDeleting(false);
    }

    // Update the ref
    prevAnimateRef.current = animate;
  }, [animate]);

  // Reset function
  const reset = useCallback(() => {
    setDisplayText('');
    setCompletedLines([]);
    setCurrentTextIndex(0);
    setIsTyping(true);
    setIsDeleting(false);
  }, []);

  // Start function
  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  // Stop function
  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  // Main animation effect
  useEffect(() => {
    if (textArray.length === 0 || !isActive) {
      return;
    }

    // If we're typing
    if (isTyping && !isDeleting) {
      if (displayText.length < currentFullText.length) {
        // Type the next character
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentFullText.substring(0, displayText.length + 1));
        }, speed * 1000);
      } else {
        // Finished typing
        setIsTyping(false);

        // Check if we should continue to the next text
        const isLastText = currentTextIndex === textArray.length - 1;

        if (multiline) {
          timeoutRef.current = setTimeout(() => {
            // Add the completed line to the array of completed lines
            setCompletedLines((prev) => [...prev, displayText]);
            // Reset the current text for the next line
            setDisplayText('');

            if (isLastText && loop) {
              // If we are at the last line and loop is true, start over
              setCompletedLines([]);
              setCurrentTextIndex(0);
              onTypeLoop?.();
            } else if (!isLastText) {
              // Go to the next line
              setCurrentTextIndex((prev) => prev + 1);
            }

            // Continue typing if we are not on the last line or if loop is true
            if (!isLastText || loop) {
              setIsTyping(true);
            } else {
              onTypeEnd?.();
            }
          }, delay);
        } else {
          // Original behavior without multiline
          if ((!isLastText || loop) && !multiline) {
            timeoutRef.current = setTimeout(() => {
              setIsDeleting(true);
              setIsTyping(true);
            }, delay);
          }

          if (isLastText && loop) {
            onTypeLoop?.();
          }

          if (isLastText && !loop) {
            onTypeEnd?.();
          }
        }
      }
    }

    // If we're deleting (only in non-multiline mode)
    if (isTyping && isDeleting) {
      if (displayText.length > 0) {
        // Delete a character
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, speed * 500); // Deleting is faster than typing
      } else {
        // Finished deleting
        setIsDeleting(false);

        // Move to the next text, respecting the loop prop
        if (currentTextIndex === textArray.length - 1 && !loop) {
          // If we're at the last text and loop is false, go back to the first text
          // but don't start typing (this effectively stops the animation)
          setCurrentTextIndex(0);
        } else {
          // Otherwise, move to the next text normally
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        }
      }
    }
  }, [
    displayText,
    isActive,
    isTyping,
    isDeleting,
    currentFullText,
    multiline,
    textArray,
    currentTextIndex,
    speed,
    delay,
    loop,
    onTypeEnd,
    onTypeLoop,
  ]);

  // Return the appropriate text format based on multiline
  const outputText = multiline ? [...completedLines, displayText] : displayText;

  return {
    text: outputText,
    isTyping: isTyping && isActive,
    start,
    stop,
    reset,
  };
}
