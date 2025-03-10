import React from 'react';
import { Center, Paper, Stack } from '@mantine/core';
import { Spinner, SpinnerProps } from './Spinner';

export default {
  title: 'Spinner',
  args: {
    animate: false,
    speed: 10,
    radius: 150,
    direction: 'clockwise',
    charOffset: 0,
    reverseText: false,
    repeatText: false,
    repeatCount: 1,
  },
  argTypes: {
    animate: { control: { type: 'boolean' } },
    speed: { control: { type: 'range', min: 0, max: 50, step: 0.1 } },
    radius: { control: { type: 'range', min: 0, max: 400, step: 1 } },
    direction: { control: { type: 'select' }, options: ['clockwise', 'counterclockwise'] },
    charOffset: { control: { type: 'range', min: 0, max: 360, step: 1 } },
    reverseText: { control: { type: 'boolean' } },
    repeatText: { control: { type: 'boolean' } },
    repeatCount: { control: { type: 'range', min: 1, max: 10, step: 1 } },
  },
};

export function DefaultValue(props: SpinnerProps) {
  return (
    <>
      <Center w="100%" h="100%">
        <Stack>
          <Paper p="xl" withBorder w="100%">
            <Spinner>**********</Spinner>
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function Usage(props: SpinnerProps) {
  return (
    <>
      <Center w="100%" h="100%">
        <Stack>
          <Paper p="xl" withBorder w="100%">
            <Spinner fz={64} {...props} c="red">
              **********
            </Spinner>
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function PolyButton(props: SpinnerProps) {
  return (
    <Spinner component={'a'} href="#" {...props} c="red">
      * Click here to check the docs *
    </Spinner>
  );
}

export function withText(props: SpinnerProps) {
  return (
    <>
      <Center w="100%" h="100%">
        <Stack>
          <Paper p="xl" withBorder w="100%">
            <Spinner {...props} c="red">
              ★ SPINNING TEXT EXAMPLE ★
            </Spinner>
          </Paper>
        </Stack>
      </Center>
    </>
  );
}
