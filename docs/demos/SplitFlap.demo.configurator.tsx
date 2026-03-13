import { TextAnimate, type SplitFlapProps } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: SplitFlapProps) {
  const [animated, { toggle }] = useDisclosure();

  return (
    <Center h={200}>
      <Stack align="center">
        <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
        <TextAnimate.SplitFlap fz={32} {...props} animate={animated} />
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
      <Stack align="center">
        <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
        <TextAnimate.SplitFlap{{props}}
          fz={32}
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
      initialValue: 'FLIGHT 42',
      libraryValue: 'FLIGHT 42',
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
      prop: 'flipDuration',
      type: 'number',
      initialValue: 300,
      libraryValue: 300,
      step: 50,
      min: 50,
      max: 1000,
    },
    {
      prop: 'staggerDelay',
      type: 'number',
      initialValue: 80,
      libraryValue: 80,
      step: 10,
      min: 0,
      max: 300,
    },
    {
      prop: 'bg',
      type: 'color',
      initialValue: '#1a1a2e',
      libraryValue: '#1a1a2e',
    },
    {
      prop: 'textColor',
      type: 'color',
      initialValue: '#e0e0e0',
      libraryValue: '#e0e0e0',
    },
    {
      prop: 'dividerColor',
      type: 'color',
      initialValue: 'rgba(0,0,0,0.3)',
      libraryValue: 'rgba(0,0,0,0.3)',
    },
    {
      prop: 'radius',
      type: 'number',
      initialValue: 4,
      libraryValue: 4,
      step: 1,
      min: 0,
      max: 16,
    },
  ],
};
