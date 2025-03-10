import { useTypewriter, type TypewriterProps } from '@gfazioli/mantine-text-animate';
import { Badge, Button, Center, Divider, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: TypewriterProps) {
  const { text, start, stop, reset, isTyping } = useTypewriter({
    value: ['Hello', 'From', 'Mantine useTypewriter() hook'],
  });

  return (
    <Center>
      <Stack w={'100%'}>
        <Text>{isTyping ? 'Typing...' : 'Done'}</Text>
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
      </Stack>
    </Center>
  );
}

const code = `
import { useTypewriter, type TypewriterProps } from '@gfazioli/mantine-text-animate';
import { Badge, Button, Center, Divider, Group, Stack, Text } from '@mantine/c

function Demo() {
    const { text, start, stop, reset, isTyping } = useTypewriter({
    value: ['Hello', 'From', 'Mantine useTypewriter() hook'],
  });

  return (
    <Stack>
      <Text>{isTyping ? 'Typing...' : 'Done'}</Text>
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
      <Badge color="violet" size="xl">{text}</Badge>
    </Stack>
  );
}
`;

export const hook: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  minHeight: 50,
  defaultExpanded: false,
};
