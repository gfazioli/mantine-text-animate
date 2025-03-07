import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
  Box,
  Text,
  useProps,
  useStyles,
  type BoxProps,
  type PolymorphicFactory,
  type StylesApiProps,
} from '@mantine/core';
import classes from './typewriter.module.css';

export type TypewriterStylesNames = 'root' | 'cursor' | 'cursorBlink';

export type TypewriterCssVariables = {
  root: '';
};

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

export interface TypewriterBaseProps {
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
}

export interface TypewriterProps
  extends BoxProps,
    TypewriterBaseProps,
    StylesApiProps<TypewriterFactory> {}

export type TypewriterFactory = PolymorphicFactory<{
  props: TypewriterProps;
  defaultComponent: 'p';
  defaultRef: HTMLParagraphElement;
  stylesNames: TypewriterStylesNames;
  vars: TypewriterCssVariables;
}>;

const defaultProps: Partial<TypewriterProps> = {
  speed: 0.03,
  textDelay: 2000,
  loop: true,
  withCursor: true,
  cursorProps: { cursorChar: '|', withBlink: true },
};

/**
 * Typewriter Component
 *
 * A component that creates a typewriter effect using TextAnimate.
 */
export const Typewriter = forwardRef<HTMLDivElement, TypewriterProps>((_props, ref) => {
  const props = useProps('TextAnimate', defaultProps, _props);

  const {
    text,
    speed,
    textDelay,
    loop,
    withCursor,
    cursorProps,

    classNames,
    style,
    styles,
    unstyled,
    vars,

    className,

    ...others
  } = props;

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
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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

        // Check if we should continue to the next text
        const isLastText = currentTextIndex === textArray.length - 1;

        // Only start deleting if:
        // 1. We're not at the last text, OR
        // 2. We're at the last text but loop is true
        if (!isLastText || loop) {
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

        // Move to the next text, but respect the loop prop
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
  }, [displayText, isTyping, isDeleting, currentFullText, textArray, speed, textDelay, loop]);

  const getStyles = useStyles<TypewriterFactory>({
    name: 'Typewriter',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    //varsResolver,
  });

  return (
    <Box ref={ref} {...getStyles('root')}>
      <Text component="span" {...others}>
        {displayText}
      </Text>

      {withCursor && (
        <Text component="span" data-with-blink={withBlink} {...getStyles('cursor')} {...others}>
          {cursorChar}
        </Text>
      )}
    </Box>
  );
});

Typewriter.displayName = 'Typewriter';
