import React, { useState } from 'react';
import { Badge, Button, Center, Code, Paper, Stack } from '@mantine/core';
import { TextTicker, TextTickerProps } from './TextTicker';
import { TextTickerBaseProps, useTextTicker } from './use-text-ticker';

export default {
  title: 'TextTicker',
  args: {
    animate: false,
    value: 'Mantine TextTicker',
    initialText: 'random',
    characterSet: 'alphanumeric',
    customCharacters: '',
    revealDirection: 'left-to-right',
    randomChangeSpeed: 1,
    delay: 0,
    speed: 0.01,
    easing: 'ease-out',
  },
  argTypes: {
    animate: { control: { type: 'boolean' } },
    value: { control: { type: 'text' } },
    initialText: {
      control: { type: 'select' },
      options: ['none', 'random', 'target'],
    },
    characterSet: {
      control: { type: 'select' },
      options: ['alphanumeric', 'alphabetic', 'numeric', 'symbols', 'custom'],
    },
    customCharacters: { control: { type: 'text' } },
    delay: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    speed: { control: { type: 'range', min: 0, max: 10, step: 0.01 } },
    easing: {
      control: { type: 'select' },
      options: ['linear', 'ease-in', 'ease-out', 'ease-in-out'],
    },
    randomChangeSpeed: { control: { type: 'range', min: 0, max: 10, step: 0.1 } },
    revealDirection: {
      control: { type: 'select' },
      options: ['left-to-right', 'right-to-left', 'center-out', 'random'],
    },
  },
};

export function Usage(props: TextTickerProps) {
  return (
    <>
      <Center w="100%" h="100%">
        <Stack>
          <Paper p="xl" withBorder w="100%">
            <TextTicker fz={64} {...props} />
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function Hook(props: TextTickerBaseProps) {
  const [completed, setCompleted] = useState(false);

  const { text, isAnimating, start, stop, reset } = useTextTicker({
    ...props,
    onCompleted: () => {
      setCompleted(true);
    },
  });

  return (
    <>
      <Center w="100%" h="100%">
        <Stack>
          <Badge color="red" ff="monospace" size="xl">
            {completed ? 'Completed' : 'Not completed'}
          </Badge>
          <Button onClick={start}>Start</Button>
          <Button onClick={stop}>Stop</Button>
          <Button onClick={reset}>Reset</Button>
          <Code>{isAnimating ? 'Animating' : 'Not animating'}</Code>
          <Paper p="xl" withBorder w="100%">
            <Code>{text}</Code>
          </Paper>
          <Badge ff="monospace" size="xl">
            {text}
          </Badge>
        </Stack>
      </Center>
    </>
  );
}
