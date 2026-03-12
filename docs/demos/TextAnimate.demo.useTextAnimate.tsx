import { TextAnimate, useTextAnimate } from '@gfazioli/mantine-text-animate';
import { Button, Group, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const { animate, setAnimate, replay, isAnimating, key, onAnimationComplete } = useTextAnimate();

  return (
    <Stack>
      <Group>
        <Button onClick={() => setAnimate('in')} disabled={isAnimating}>
          Animate In
        </Button>
        <Button onClick={() => setAnimate('out')} disabled={isAnimating}>
          Animate Out
        </Button>
        <Button onClick={replay} variant="outline">
          Replay
        </Button>
      </Group>
      <TextAnimate
        key={key}
        fz={32}
        fw={600}
        animate={animate}
        animation="blur"
        by="character"
        onAnimationComplete={onAnimationComplete}
      >
        Hello World
      </TextAnimate>
    </Stack>
  );
}

const code = `
import { TextAnimate, useTextAnimate } from '@gfazioli/mantine-text-animate';
import { Button, Group, Stack } from '@mantine/core';

function Demo() {
  const { animate, setAnimate, replay, isAnimating, key, onAnimationComplete } = useTextAnimate();

  return (
    <Stack>
      <Group>
        <Button onClick={() => setAnimate('in')} disabled={isAnimating}>
          Animate In
        </Button>
        <Button onClick={() => setAnimate('out')} disabled={isAnimating}>
          Animate Out
        </Button>
        <Button onClick={replay} variant="outline">
          Replay
        </Button>
      </Group>
      <TextAnimate
        key={key}
        fz={32}
        fw={600}
        animate={animate}
        animation="blur"
        by="character"
        onAnimationComplete={onAnimationComplete}
      >
        Hello World
      </TextAnimate>
    </Stack>
  );
}
`;

export const useTextAnimateDemo: MantineDemo = {
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
