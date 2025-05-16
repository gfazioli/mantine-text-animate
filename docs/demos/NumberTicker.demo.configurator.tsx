import { TextAnimate, type NumberTickerProps } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: NumberTickerProps) {
  const [animated, { close, toggle }] = useDisclosure();

  return (
    <Center h={400}>
      <Stack>
        <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
        <TextAnimate.NumberTicker
          fz={64}
          c="violet"
          {...props}
          animate={animated}
          onCompleted={close}
        />
      </Stack>
    </Center>
  );
}

const code = `
import { TextAnimate, type NumberTickerProps } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  return (
    <Stack>
      <Switch size="xl" checked={started} onLabel="ON" offLabel="OFF" onChange={toggle} />
      <TextAnimate.NumberTicker{{props}}
        fz={64}
        c="violet"
        started={started}
        onNumberTickerCompleted={close}
      />
    </Stack>
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
      type: 'number',
      initialValue: 64,
      libraryValue: 64,
      step: 1,
      min: 0,
      max: 100,
    },
    {
      prop: 'startValue',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      step: 1,
      min: 0,
      max: 100,
    },
    {
      prop: 'delay',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      step: 1,
      min: 0,
      max: 10,
    },
    {
      prop: 'decimalPlaces',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      step: 1,
      min: 0,
      max: 5,
    },
    {
      prop: 'speed',
      type: 'number',
      initialValue: 0.2,
      libraryValue: 0.2,
      step: 0.001,
      min: 0,
      max: 1,
    },
    {
      prop: 'easing',
      type: 'select',
      data: ['linear', 'ease-in', 'ease-out', 'ease-in-out'],
      initialValue: 'ease-out',
      libraryValue: 'ease-out',
    },
  ],
};
