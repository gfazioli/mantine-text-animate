import { useTypewriter } from '@gfazioli/mantine-text-animate';
import { Badge, Center, Group, Stack } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const { ref, inViewport } = useInViewport();

  const { text } = useTypewriter({
    value: ['Hello', 'From', 'Mantine useTypewriter()'],
    multiline: true,
    animate: inViewport,
  });

  return (
    <Center h={200} ref={ref}>
      <Stack w="100%">
        <Stack>
          {(text as string[]).map((line) => (
            <Badge size="xl" key={line}>
              {line}
            </Badge>
          ))}
        </Stack>
        <Group>
          {(text as string[]).map((line) => (
            <Badge size="md" color="lime" key={line}>
              {line}
            </Badge>
          ))}
        </Group>
      </Stack>
    </Center>
  );
}

const code = `
import { useTypewriter, type TypewriterProps } from '@gfazioli/mantine-text-animate';
import { Badge, Center, Group, Stack } from '@mantine/core';

function Demo() {
  const { text } = useTypewriter({
    value: ['Hello', 'From', 'Mantine useTypewriter()'],
    multiline: true,
  });

  return (
    <Center h={200}>
      <Stack w="100%">
        <Stack>
          {(text as string[]).map((line) => (
            <Badge size="xl" key={line}>
              {line}
            </Badge>
          ))}
        </Stack>
        <Group>
          {(text as string[]).map((line) => (
            <Badge size="md" color="lime" key={line}>
              {line}
            </Badge>
          ))}
        </Group>
      </Stack>
    </Center>
  );
}
`;

export const hookMultiLine: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
