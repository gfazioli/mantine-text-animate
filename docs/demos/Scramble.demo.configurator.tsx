import { TextAnimate, type ScrambleProps } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: ScrambleProps) {
  const [animated, { toggle }] = useDisclosure();

  return (
    <Center h={200}>
      <Stack>
        <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
        <TextAnimate.Scramble fz={32} fw={700} ff="monospace" {...props} animate={animated} />
      </Stack>
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [animated, { toggle }] = useDisclosure();

  return (
    <Center h={200}>
      <Stack>
        <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
        <TextAnimate.Scramble{{props}}
          fz={32}
          fw={700}
          ff="monospace"
          animate={animated}
        />
      </Stack>
    </Center>
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'value',
      type: 'string',
      initialValue: 'DECRYPTING...',
      libraryValue: 'DECRYPTING...',
    },
    {
      prop: 'speed',
      type: 'number',
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: 0.1,
      max: 5,
    },
    {
      prop: 'scrambleDuration',
      type: 'number',
      initialValue: 800,
      libraryValue: 800,
      step: 100,
      min: 100,
      max: 3000,
    },
    {
      prop: 'staggerDelay',
      type: 'number',
      initialValue: 50,
      libraryValue: 50,
      step: 10,
      min: 0,
      max: 200,
    },
    {
      prop: 'revealDirection',
      type: 'select',
      data: ['left-to-right', 'right-to-left', 'center-out', 'random'],
      initialValue: 'left-to-right',
      libraryValue: 'left-to-right',
    },
    {
      prop: 'characterSet',
      type: 'select',
      data: ['alphanumeric', 'alphabetic', 'numeric', 'symbols'],
      initialValue: 'alphanumeric',
      libraryValue: 'alphanumeric',
    },
  ],
};
