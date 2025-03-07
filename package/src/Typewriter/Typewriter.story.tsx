import React from 'react';
import { Center, Paper, Stack } from '@mantine/core';
import { Typewriter, TypewriterProps } from './Typewriter';

export default {
  title: 'Typewriter',
  args: {
    speed: 0.03,
    textDelay: 2000,
    loop: true,
    cursor: true,
    cursorChar: '|',
  },
  argTypes: {
    speed: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    textDelay: { control: { type: 'range', min: 0, max: 10000, step: 100 } },
    loop: { control: { type: 'boolean' } },
    cursor: { control: { type: 'boolean' } },
    cursorChar: { control: { type: 'text' } },
  },
};

export function Usage(props: TypewriterProps) {
  return (
    <>
      <Center h={800}>
        <Stack>
          <Paper p="xl" withBorder w={500}>
            <Typewriter
              {...props}
              c="red"
              text={['Fast typing speed.', 'Quick and snappy!', 'Like a speed typist.']}
            />
          </Paper>
        </Stack>
      </Center>
    </>
  );
}
