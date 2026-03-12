import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Box, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Box style={{ height: 400, overflow: 'auto' }}>
      <Stack>
        <Text c="dimmed">Scroll down to see the animation trigger...</Text>
        <Box style={{ height: 500 }} />
        <TextAnimate
          fz={32}
          fw={600}
          c="violet"
          trigger="inView"
          animate="in"
          animation="slideUp"
          by="word"
          triggerOptions={{ threshold: 0.5 }}
        >
          This text animates when it enters the viewport
        </TextAnimate>
        <Box style={{ height: 200 }} />
      </Stack>
    </Box>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Box, Stack, Text } from '@mantine/core';

function Demo() {
  return (
    <Box style={{ height: 400, overflow: 'auto' }}>
      <Stack>
        <Text c="dimmed">Scroll down to see the animation trigger...</Text>
        <Box style={{ height: 500 }} />
        <TextAnimate
          fz={32}
          fw={600}
          c="violet"
          trigger="inView"
          animate="in"
          animation="slideUp"
          by="word"
          triggerOptions={{ threshold: 0.5 }}
        >
          This text animates when it enters the viewport
        </TextAnimate>
        <Box style={{ height: 200 }} />
      </Stack>
    </Box>
  );
}
`;

export const trigger: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    {
      fileName: 'Demo.tsx',
      code,
      language: 'tsx',
    },
  ],
};
