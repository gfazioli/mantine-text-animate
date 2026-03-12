import { useSplitFlap } from '@gfazioli/mantine-text-animate';
import { Button, Divider, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const { characters, isAnimating, start, stop, reset } = useSplitFlap({
    value: 'HELLO',
    speed: 1,
    animate: false,
  });

  return (
    <Stack w="100%">
      <Text>{isAnimating ? 'Flipping...' : 'Done'}</Text>
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
      <Text fz={32} ff="monospace" fw={700}>
        {characters.map((c) => c.current).join('')}
      </Text>
    </Stack>
  );
}

const code = `
import { useSplitFlap } from '@gfazioli/mantine-text-animate';
import { Button, Divider, Group, Stack, Text } from '@mantine/core';

function Demo() {
  const { characters, isAnimating, start, stop, reset } = useSplitFlap({
    value: 'HELLO',
    speed: 1,
    animate: false,
  });

  return (
    <Stack w={'100%'}>
      <Text>{isAnimating ? 'Flipping...' : 'Done'}</Text>
      <Group>
        <Button size="xs" onClick={start}>Start</Button>
        <Button size="xs" onClick={stop}>Stop</Button>
        <Button size="xs" onClick={reset}>Reset</Button>
      </Group>
      <Divider />
      <Text fz={32} ff="monospace" fw={700}>
        {characters.map((c) => c.current).join('')}
      </Text>
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
