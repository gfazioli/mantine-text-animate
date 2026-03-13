import { useRotatingText } from '@gfazioli/mantine-text-animate';
import { Button, Center, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const values = ['Hello', 'Bonjour', 'Ciao', 'Hola', 'Hallo'];

function Wrapper() {
  const { currentText, currentIndex, isTransitioning, start, stop, reset } = useRotatingText({
    values,
    interval: 2000,
    animate: false,
  });

  return (
    <Center h={120}>
      <Stack align="center">
        <Group>
          <Button onClick={start}>Start</Button>
          <Button onClick={stop}>Stop</Button>
          <Button onClick={reset}>Reset</Button>
        </Group>
        <Text fz={32} fw={700}>
          {currentText}
        </Text>
        <Text size="sm" c="dimmed">
          Index: {currentIndex} | Transitioning: {isTransitioning ? 'yes' : 'no'}
        </Text>
      </Stack>
    </Center>
  );
}

const code = `
import { useRotatingText } from '@gfazioli/mantine-text-animate';
import { Button, Center, Group, Stack, Text } from '@mantine/core';

const values = ['Hello', 'Bonjour', 'Ciao', 'Hola', 'Hallo'];

function Demo() {
  const { currentText, currentIndex, isTransitioning, start, stop, reset } = useRotatingText({
    values,
    interval: 2000,
    animate: false,
  });

  return (
    <Center h={120}>
      <Stack align="center">
        <Group>
          <Button onClick={start}>Start</Button>
          <Button onClick={stop}>Stop</Button>
          <Button onClick={reset}>Reset</Button>
        </Group>
        <Text fz={32} fw={700}>
          {currentText}
        </Text>
        <Text size="sm" c="dimmed">
          Index: {currentIndex} | Transitioning: {isTransitioning ? 'yes' : 'no'}
        </Text>
      </Stack>
    </Center>
  );
}
`;

export const hook: MantineDemo = {
  type: 'code',
  component: Wrapper,
  code,
};
