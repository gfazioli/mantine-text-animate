import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Button, Center, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [animated, { open, close }] = useDisclosure();

  return (
    <Center>
      <Stack>
        <TextAnimate.TextTicker
          fz="xl"
          value="Scramble Mode"
          animate={animated}
          scrambleDuration={800}
          staggerDelay={50}
          revealDirection="left-to-right"
          onCompleted={close}
        />
        <Button onClick={open}>Start</Button>
      </Stack>
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Button, Center, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [animated, { open, close }] = useDisclosure();

  return (
    <Center>
      <Stack>
        <TextAnimate.TextTicker
          fz="xl"
          value="Scramble Mode"
          animate={animated}
          scrambleDuration={800}
          staggerDelay={50}
          revealDirection="left-to-right"
          onCompleted={close}
        />
        <Button onClick={open}>Start</Button>
      </Stack>
    </Center>
  );
}
`;

export const scramble: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code,
};
