import { useNumberTicker } from '@gfazioli/mantine-text-animate';
import { Badge, Button, Divider, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const { text, isAnimating, start, stop, reset, displayValue } = useNumberTicker({
    value: 64,
    startValue: 0,
    delay: 0,
    decimalPlaces: 0,
    speed: 0.2,
    easing: 'ease-out',
    animate: false,
  });

  return (
    <Stack w="100%">
      <Text>{isAnimating ? 'Animating...' : 'Done'}</Text>
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
      <Badge color="violet" size="xl">
        {text}
      </Badge>
      <Text>{displayValue}</Text>
    </Stack>
  );
}

const code = `
import { useNumberTicker } from '@gfazioli/mantine-text-animate';
import { Badge, Button, Divider, Group, Stack, Text } from '@mantine/core';

function Demo() {
  const { text, isAnimating, start, stop, reset, displayValue } = useNumberTicker({
    value: 64,
    startValue: 0,
    delay: 0,
    decimalPlaces: 0,
    speed: 0.2,
    easing: 'ease-out',
    animate: false,
  });

  return (
    <Stack
      <Text>{isAnimating ? 'Animating...' : 'Done'}</Text>
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
      <Badge color="violet" size="xl">
        {text}
      </Badge>
      <Text>{displayValue}</Text>
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
