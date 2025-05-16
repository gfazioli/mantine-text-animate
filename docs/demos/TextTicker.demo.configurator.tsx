import { TextAnimate, type TextTickerProps } from '@gfazioli/mantine-text-animate';
import { Button, Center, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: TextTickerProps) {
  const [animated, { open, close }] = useDisclosure();

  return (
    <Center>
      <Stack>
        <TextAnimate.TextTicker fz="xl" {...props} animate={animated} onCompleted={close} />
        <Button onClick={open}>Start</Button>
      </Stack>
    </Center>
  );
}

const code = `
import { TextAnimate, type TextTickerProps } from '@gfazioli/mantine-text-animate';
import { Button, Center, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [animated, { open, close }] = useDisclosure();

  return (
    <Center>
      <Stack>
        <TextAnimate.TextTicker fz="xl" {...props} animate={animated} onCompleted={close} />
        <Button onClick={open}>Start</Button>
      </Stack>
    </Center>
  );
}
`;

export const textTickerConfigurator: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code,
  controls: [
    {
      prop: 'value',
      type: 'string',
      initialValue: 'Mantine Text Ticker',
      libraryValue: '',
    },
    {
      prop: 'initialText',
      type: 'select',
      data: ['none', 'random', 'target'],
      initialValue: 'random',
      libraryValue: 'random',
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
      data: ['alphanumeric', 'alphabetic', 'numeric', 'symbols', 'custom'],
      initialValue: 'alphanumeric',
      libraryValue: 'alphanumeric',
    },
    {
      prop: 'customCharacters',
      type: 'string',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'delay',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      step: 0.1,
      min: 0,
      max: 10,
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
      prop: 'randomChangeSpeed',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      step: 0.1,
      min: 0,
      max: 10,
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
