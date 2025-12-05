import React from 'react';
import {
  Box,
  Flex,
  polymorphicFactory,
  Stack,
  Text,
  useProps,
  useStyles,
  type BoxProps,
  type PolymorphicFactory,
  type StylesApiProps,
} from '@mantine/core';
import { useTypewriter, type TypewriterBaseProps } from './use-typewriter';
import classes from './Typewriter.module.css';

export type TypewriterStylesNames = 'root' | 'cursor';

export type TypewriterCssVariables = {
  // root: '';
  // cursor: '';
};
export interface TypewriterComponentProps extends TypewriterBaseProps {
  /**
   * The left section to display before the text
   */
  leftSection?: React.ReactNode;

  /**
   * Whether to show a cursor
   * @default true
   */
  withCursor?: boolean;

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

export interface TypewriterProps
  extends BoxProps, TypewriterComponentProps, StylesApiProps<TypewriterFactory> {}

export type TypewriterFactory = PolymorphicFactory<{
  props: TypewriterProps;
  defaultComponent: 'p';
  defaultRef: HTMLParagraphElement;
  stylesNames: TypewriterStylesNames;
  vars: TypewriterCssVariables;
}>;

const defaultProps: Partial<TypewriterProps> = {
  speed: 0.03,
  delay: 2000,
  loop: true,
  withCursor: true,
  multiline: false,
  cursorChar: '|',
  withBlink: true,
  leftSection: null,
  animate: true,
};

/**
 * Typewriter Component
 *
 * A component that creates a typewriter effect using TextAnimate.
 */
export const Typewriter = polymorphicFactory<TypewriterFactory>((_props, ref) => {
  const props = useProps('TextAnimate', defaultProps, _props);

  const {
    animate,
    value,
    speed,
    delay,
    loop,
    withCursor,
    multiline,
    cursorChar,
    withBlink,
    onTypeEnd,
    onTypeLoop,
    leftSection,

    classNames,
    style,
    styles,
    unstyled,
    vars,

    className,

    ...others
  } = props;

  // Use the useTypewriter hook to handle the animation logic
  const { text: displayText } = useTypewriter({
    value,
    animate,
    multiline,
    speed,
    delay,
    loop,
    onTypeEnd,
    onTypeLoop,
  });

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
  });

  return (
    <Box ref={ref} {...getStyles('root')} data-text-animate-typewriter-multiline={multiline}>
      {multiline ? (
        <Stack gap={0}>
          {/* Render completed lines */}
          {Array.isArray(displayText) &&
            displayText.slice(0, -1).map((line, index) => (
              <Flex key={`line-${index}`} align="center">
                {leftSection}
                <Text {...others}>{line}</Text>
              </Flex>
            ))}
          {/* Render current line with cursor */}
          <Flex align="center">
            {leftSection}
            <Text span {...others}>
              {Array.isArray(displayText) ? displayText[displayText.length - 1] : ''}
            </Text>
            {withCursor && (
              <Text
                span
                data-text-animate-typewriter-with-blink={withBlink}
                {...getStyles('cursor')}
                {...others}
              >
                {cursorChar}
              </Text>
            )}
          </Flex>
        </Stack>
      ) : (
        <>
          {leftSection}
          <Text {...others}>{displayText}</Text>
          {withCursor && (
            <Text
              span
              data-text-animate-typewriter-with-blink={withBlink}
              {...getStyles('cursor')}
              {...others}
            >
              {cursorChar}
            </Text>
          )}
        </>
      )}
    </Box>
  );
});

Typewriter.displayName = 'Typewriter';
