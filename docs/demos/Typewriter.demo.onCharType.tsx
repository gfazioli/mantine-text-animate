import { useMemo, useState } from 'react';
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Badge, Center, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [lastChar, setLastChar] = useState('');
  const [charCount, setCharCount] = useState(0);

  const pauseAt = useMemo(() => ({ 6: 800, 13: 1200 }), []);

  return (
    <Center h={200}>
      <Stack w="100%" gap="sm">
        <Group>
          <Badge color="blue">Chars typed: {charCount}</Badge>
          <Badge color="grape">Last char: {lastChar || '-'}</Badge>
        </Group>
        <Text size="sm" c="dimmed">
          Pauses 800ms after &quot;Hello,&quot; and 1200ms after &quot;World!&quot;
        </Text>
        <TextAnimate.Typewriter
          value="Hello, World! Welcome to Mantine"
          speed={0.04}
          loop
          onCharType={(char, index) => {
            setLastChar(char);
            setCharCount(index + 1);
          }}
          pauseAt={pauseAt}
        />
      </Stack>
    </Center>
  );
}

const code = `
import { useMemo, useState } from 'react';
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Badge, Group, Stack, Text } from '@mantine/core';

function Demo() {
  const [lastChar, setLastChar] = useState('');
  const [charCount, setCharCount] = useState(0);

  // Memoize to keep a stable reference
  const pauseAt = useMemo(() => ({ 6: 800, 13: 1200 }), []);

  return (
    <Stack gap="sm">
      <Group>
        <Badge color="blue">Chars typed: {charCount}</Badge>
        <Badge color="grape">Last char: {lastChar || '-'}</Badge>
      </Group>
      <Text size="sm" c="dimmed">
        Pauses 800ms after &quot;Hello,&quot; and 1200ms after &quot;World!&quot;
      </Text>
      <TextAnimate.Typewriter
        value="Hello, World! Welcome to Mantine"
        speed={0.04}
        loop
        onCharType={(char, index) => {
          setLastChar(char);
          setCharCount(index + 1);
        }}
        pauseAt={pauseAt}
      />
    </Stack>
  );
}
`;

export const onCharType: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
