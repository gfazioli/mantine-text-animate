import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [animated, { close, toggle }] = useDisclosure();

  return (
    <Center>
      <Stack align="center">
        <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
        <TextAnimate.TextTicker
          fz="xl"
          value="Scramble Mode"
          animate={animated}
          scrambleDuration={800}
          staggerDelay={50}
          revealDirection="left-to-right"
          onCompleted={close}
        />
      </Stack>
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [animated, { close, toggle }] = useDisclosure();

  return (
    <Center>
      <Stack align="center">
        <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
        <TextAnimate.TextTicker
          fz="xl"
          value="Scramble Mode"
          animate={animated}
          scrambleDuration={800}
          staggerDelay={50}
          revealDirection="left-to-right"
          onCompleted={close}
        />
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
