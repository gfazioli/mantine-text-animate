import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Text } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const { ref, inViewport } = useInViewport();

  return (
    <Center h={200} ref={ref}>
      <Stack w="100%">
        <TextAnimate.Typewriter
          animate={inViewport}
          multiline
          speed={0.05}
          leftSection={
            <Text c="red" mr={4}>
              &gt;{' '}
            </Text>
          }
          value={[
            'Hello, World! Mantine Typewriter component',
            'That was a long time ago',
            'But it was fun',
          ]}
        />

        <TextAnimate.Typewriter
          animate={inViewport}
          multiline
          leftSection={'👉'}
          value={['Another left section']}
        />
      </Stack>
    </Center>
  );
}

const code = `
import { TextAnimate, type TypewriterProps } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Text } from '@mantine/core';

function Demo() {
  return (
    <Center miw={400} h={150}>
      <Stack w="100%">
        <TextAnimate.Typewriter
          multiline
          speed={0.05}
          leftSection={
            <Text c="red" mr={4}>
              &gt;{' '}
            </Text>
          }
          value={[
            'Hello, World! Mantine Typewriter component',
            'That was a long time ago',
            'But it was fun',
          ]}
        />

        <TextAnimate.Typewriter multiline leftSection={'👉'} value={['Another left section']} />
      </Stack>
    </Center>
  );
}
`;

export const leftSection: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
