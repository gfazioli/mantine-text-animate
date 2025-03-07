import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Box, Text, TextProps } from '@mantine/core';

/**
 * Props for the Typewriter component
 */
export interface TypewriterCursorProps {
  /**
   * The cursor character or ReactNode
   * @default "|"
   */
  cursorChar?: React.ReactNode | string;

  /**
   * Whether the cursor should blink
   * @default true
   */
  withBlink?: boolean;
}

export interface TypewriterProps extends Omit<TextProps, 'children'> {
  /**
   * The text or array of texts to display in typewriter effect
   */
  text: string | string[];

  /**
   * The typing speed in seconds per character
   * @default 0.03
   */
  speed?: number;

  /**
   * The delay between text changes in milliseconds (when using multiple texts)
   * @default 2000
   */
  textDelay?: number;

  /**
   * Whether to loop through the texts
   * @default true
   */
  loop?: boolean;

  /**
   * Whether to show a cursor
   * @default true
   */
  withCursor?: boolean;

  /**
   * Custom properties for the cursor
   */
  cursorProps?: TypewriterCursorProps;

  /**
   * Custom styles for the cursor
   */
  cursorStyle?: React.CSSProperties;
}

const defaultProps: Partial<TypewriterProps> = {
  speed: 0.03,
  textDelay: 2000,
  loop: true,
};

/**
 * Typewriter Component
 *
 * A component that creates a typewriter effect using TextAnimate.
 */
export const Typewriter = forwardRef<HTMLDivElement, TypewriterProps>(
  (
    {
      text,
      speed = 0.03,
      textDelay = 2000,
      loop = true,
      withCursor = true,
      cursorProps = { cursorChar: '|', withBlink: true },
      cursorStyle,
      ...textProps
    },
    ref
  ) => {
    const [displayText, setDisplayText] = useState('');
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Set default values for cursorProps
    const { cursorChar = '|', withBlink = true } = cursorProps;

    // Convert single text to array if needed
    const textArray = Array.isArray(text) ? text : [text];
    const currentFullText = textArray[currentTextIndex];

    // Clear any existing timeouts when component unmounts
    useEffect(() => {
      // Add the keyframe animation to the document head only if withBlink is true
      if (withBlink) {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
          @keyframes blinkCaret {
            from, to { opacity: 1; }
            50% { opacity: 0; }
          }
        `;
        document.head.appendChild(styleElement);

        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          // Clean up the style element when component unmounts
          document.head.removeChild(styleElement);
        };
      } else {
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      }
    }, [withBlink]);

    // Handle the typewriter animation
    useEffect(() => {
      if (textArray.length === 0) return;

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

          // If we have multiple texts, start deleting after a delay
          if (textArray.length > 1 || loop) {
            timeoutRef.current = setTimeout(() => {
              setIsDeleting(true);
              setIsTyping(true);
            }, textDelay);
          }
        }
      }

      // If we're deleting
      if (isTyping && isDeleting) {
        if (displayText.length > 0) {
          // Delete a character
          timeoutRef.current = setTimeout(() => {
            setDisplayText(displayText.substring(0, displayText.length - 1));
          }, speed * 500); // Deleting is faster than typing
        } else {
          // Finished deleting
          setIsDeleting(false);

          // Move to the next text
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        }
      }
    }, [displayText, isTyping, isDeleting, currentFullText, textArray, speed, textDelay, loop]);

    // Container styles for inline cursor
    const containerStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'baseline',
      flexWrap: 'nowrap',
      position: 'relative',
      minHeight: '1.5em',
    };

    // Default cursor styles
    const defaultCursorStyle: React.CSSProperties = {
      display: 'inline-block',
      fontWeight: 'normal',
      animation: withBlink ? 'blinkCaret 0.75s step-end infinite' : undefined,
      marginLeft: '1px',
    };

    // Combine default and custom cursor styles
    const finalCursorStyle = { ...defaultCursorStyle, ...cursorStyle };

    return (
      <Box ref={ref} style={containerStyles}>
        <Text component="span" {...textProps}>
          {displayText}
        </Text>

        {withCursor && (
          <Text component="span" style={finalCursorStyle} {...textProps}>
            {cursorChar}
          </Text>
        )}
      </Box>
    );
  }
);

Typewriter.displayName = 'Typewriter';
