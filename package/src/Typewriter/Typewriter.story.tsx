import React from 'react';
import { Center, Paper, Stack, Text } from '@mantine/core';
import { Typewriter, TypewriterProps } from './Typewriter';
import { TypewriterBaseProps, useTypewriter } from './use-typewriter';

export default {
  title: 'Typewriter',
  args: {
    animate: false,
    speed: 0.03,
    delay: 2000,
    loop: true,
    withCursor: true,
    multiline: false,
    cursorChar: '|',
    withBlink: true,
  },
  argTypes: {
    animate: { control: { type: 'boolean' } },
    speed: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    delay: { control: { type: 'range', min: 0, max: 10000, step: 100 } },
    loop: { control: { type: 'boolean' } },
    withCursor: { control: { type: 'boolean' } },
    multiline: { control: { type: 'boolean' } },
    cursorChar: { control: { type: 'text' } },
    withBlink: { control: { type: 'boolean' } },
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
              value={['Fast typing speed.', 'Quick and snappy!', 'Like a speed typist.']}
            />
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function SameLine(props: TypewriterProps) {
  return (
    <>
      <Center h={800}>
        <Stack>
          <Paper p="xl" withBorder w={500}>
            Hello{' '}
            <Typewriter
              {...props}
              c="red"
              leftSection={<Text fz={64}>🤔</Text>}
              value={['Fast typing speed.', 'Quick and snappy!', 'Like a speed typist.']}
            />
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function Events(props: TypewriterProps) {
  const [withCursor] = React.useState(true);
  const [isTypeEnd, setIsTypeEnd] = React.useState(0);
  const [isTypeLoop, setIsTypeLoop] = React.useState(0);

  return (
    <>
      <Center h={800}>
        <Stack>
          <Text>onTypeEnd: {isTypeEnd}</Text>
          <Text>onTypeLoop: {isTypeLoop}</Text>
          <Paper p="xl" withBorder w={500}>
            <Typewriter
              {...props}
              withCursor={withCursor}
              onTypeEnd={() => {
                setIsTypeEnd((prev) => prev + 1);
              }}
              onTypeLoop={() => {
                setIsTypeLoop((prev) => prev + 1);
              }}
              value={['Fast typing speed.']}
            />
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function WithMultiLine(props: TypewriterProps) {
  const [isTypeEnd, setIsTypeEnd] = React.useState(0);
  const [isTypeLoop, setIsTypeLoop] = React.useState(0);

  return (
    <>
      <Stack>
        <Text>onTypeEnd: {isTypeEnd}</Text>
        <Text>onTypeLoop: {isTypeLoop}</Text>
        <Paper p="xl" withBorder w="100%" bg="dark">
          <Typewriter
            {...props}
            c="green"
            ff="monospace"
            cursorChar="█"
            withBlink
            leftSection={
              <Text c="red" mr={16}>
                &gt;{' '}
              </Text>
            }
            onTypeEnd={() => {
              setIsTypeEnd((prev) => prev + 1);
            }}
            onTypeLoop={() => {
              setIsTypeLoop((prev) => prev + 1);
            }}
            value={[
              '$ cd /home/user/projects',
              '$ ls -la',
              'total 32',
              'drwxr-xr-x  5 user user 4096 Mar 10 14:30 .',
              'drwxr-xr-x 18 user user 4096 Mar 10 14:28 ..',
              'drwxr-xr-x  8 user user 4096 Mar 10 14:30 .git',
              '-rw-r--r--  1 user user  948 Mar 10 14:30 README.md',
              'drwxr-xr-x  2 user user 4096 Mar 10 14:30 src',
              '$ npm run build',
              '> project@1.0.0 build',
              '> webpack --mode production',
              '✓ Compiled successfully in 2.36s',
            ]}
          />
        </Paper>
      </Stack>
    </>
  );
}

export function Hook(props: TypewriterBaseProps) {
  const { text } = useTypewriter({
    ...props,
    value: 'Hello From mantine useTypewriter() hook',
  });
  return (
    <>
      <Center h={800}>
        <Stack>
          <Paper p="xl" withBorder w={500}>
            <div>{text}</div>
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function ArrayHook(props: TypewriterBaseProps) {
  const { text } = useTypewriter({ ...props, value: ['Hello', 'From', 'Mantine'] });
  return (
    <>
      <Center h={800}>
        <Stack>
          <Paper p="xl" withBorder w={500}>
            <div>{text}</div>
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function MultilineHook(props: TypewriterBaseProps) {
  const { text } = useTypewriter({
    ...props,
    multiline: true,
    value: ['Hello', 'From', 'Mantine'],
  });
  return (
    <>
      <Center h={800}>
        <Stack>
          <Paper p="xl" withBorder w={500}>
            <div>
              {(text as string[]).map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </Paper>
        </Stack>
      </Center>
    </>
  );
}
