import { useScramble } from '@gfazioli/mantine-text-animate';
import { Badge, Button, Divider, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const { text, isAnimating, start, stop, reset } = useScramble({
    value: 'ACCESS GRANTED',
    speed: 1,
    scrambleDuration: 1000,
    animate: false,
  });

  return (
    <Stack w="100%">
      <Text>{isAnimating ? 'Scrambling...' : 'Done'}</Text>
      <Group>
        <Button size="xs" onClick={start}>
          Start
        </Button>
        <Button size="xs" onClick={stop}>
          Stop
        </Button>
        <Button size="xs" onClick={reset}>
          Reset
        </Button>
      </Group>
      <Divider />
      <Badge color="green" size="xl" ff="monospace">
        {text}
      </Badge>
    </Stack>
  );
}

const code = `
import { useScramble } from '@gfazioli/mantine-text-animate';
import { Badge, Button, Divider, Group, Stack, Text } from '@mantine/core';

function Demo() {
  const { text, isAnimating, start, stop, reset } = useScramble({
    value: 'ACCESS GRANTED',
    speed: 1,
    scrambleDuration: 1000,
    animate: false,
  });

  return (
    <Stack w={'100%'}>
      <Text>{isAnimating ? 'Scrambling...' : 'Done'}</Text>
      <Group>
        <Button size="xs" onClick={start}>Start</Button>
        <Button size="xs" onClick={stop}>Stop</Button>
        <Button size="xs" onClick={reset}>Reset</Button>
      </Group>
      <Divider />
      <Badge color="green" size="xl" ff="monospace">
        {text}
      </Badge>
    </Stack>
  );
}
`;

export const hook: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code,
};
