import { useState } from 'react';
import { useMorphing } from '@gfazioli/mantine-text-animate';
import { Box, Button, Divider, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const words = ['Hello', 'World', 'Mantine', 'Morphing'];

function Demo() {
  const [index, setIndex] = useState(0);
  const value = words[index];
  const { characters, width, isAnimating } = useMorphing({
    value,
    speed: 1,
  });

  return (
    <Stack w="100%">
      <Text>{isAnimating ? 'Morphing...' : 'Done'}</Text>
      <Group>
        <Button size="xs" onClick={() => setIndex((i) => (i + 1) % words.length)}>
          Next Word
        </Button>
      </Group>
      <Divider />
      <Box
        style={{
          position: 'relative',
          display: 'inline-block',
          width: `${width}ch`,
          height: '1.2em',
          fontFamily: 'monospace',
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        {characters.map((char) => (
          <Text
            key={char.key}
            component="span"
            style={{
              position: 'absolute',
              left: `${char.toX}ch`,
              top: 0,
              transition: 'all 1s ease',
              opacity: char.state === 'exiting' ? 0 : 1,
            }}
          >
            {char.char}
          </Text>
        ))}
      </Box>
    </Stack>
  );
}

const code = `
import { useMorphing } from '@gfazioli/mantine-text-animate';
import { Button, Divider, Group, Stack, Text, Box } from '@mantine/core';
import { useState } from 'react';

const words = ['Hello', 'World', 'Mantine', 'Morphing'];

function Demo() {
  const [index, setIndex] = useState(0);
  const value = words[index];
  const { characters, width, isAnimating } = useMorphing({
    value,
    speed: 1,
  });

  return (
    <Stack w={'100%'}>
      <Text>{isAnimating ? 'Morphing...' : 'Done'}</Text>
      <Group>
        <Button size="xs" onClick={() => setIndex((i) => (i + 1) % words.length)}>
          Next Word
        </Button>
      </Group>
      <Divider />
      <Box
        style={{
          position: 'relative',
          display: 'inline-block',
          width: \`\${width}ch\`,
          height: '1.2em',
          fontFamily: 'monospace',
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        {characters.map((char) => (
          <Text
            key={char.key}
            component="span"
            style={{
              position: 'absolute',
              left: \`\${char.toX}ch\`,
              top: 0,
              transition: 'all 1s ease',
              opacity: char.state === 'exiting' ? 0 : 1,
            }}
          >
            {char.char}
          </Text>
        ))}
      </Box>
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
