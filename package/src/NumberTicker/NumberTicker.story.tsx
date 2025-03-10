import React, { useState } from 'react';
import { Badge, Button, Center, Code, Paper, Stack, Title } from '@mantine/core';
import { NumberTicker, NumberTickerProps } from './NumberTicker';
import { NumberTickerBaseProps, useNumberTicker } from './use-number-ticker';

export default {
  title: 'NumberTicker',
  args: {
    animate: false,
    value: 100,
    startValue: 0,
    delay: 0,
    decimalPlaces: 0,
    speed: 1,
    easing: 'ease-out',
  },
  argTypes: {
    animate: { control: { type: 'boolean' } },
    value: { control: { type: 'range', min: 0, max: 1000, step: 1 } },
    startValue: { control: { type: 'range', min: 0, max: 1000, step: 1 } },
    delay: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    decimalPlaces: { control: { type: 'range', min: 0, max: 10, step: 1 } },
    speed: { control: { type: 'range', min: 0, max: 10, step: 0.1 } },
    easing: {
      control: { type: 'select' },
      options: ['linear', 'ease-in', 'ease-out', 'ease-in-out'],
    },
  },
};

export function Usage(props: NumberTickerProps) {
  return (
    <>
      <Center w="100%" h="100%">
        <Stack>
          <Paper p="xl" withBorder w="100%">
            <NumberTicker fz={64} {...props} c="red" />
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function Component(props: NumberTickerProps) {
  return (
    <>
      <Center w="100%" h="100%">
        <Stack>
          <Paper p="xl" withBorder w="100%">
            <NumberTicker component={Title} order={1} fz={64} {...props} c="red" />
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function Hook(props: NumberTickerBaseProps) {
  const [completed, setCompleted] = useState(false);

  const { text, isAnimating, start, stop, reset } = useNumberTicker({
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
