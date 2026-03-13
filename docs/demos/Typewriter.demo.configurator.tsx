import { TextAnimate, type TypewriterProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: TypewriterProps) {
  return (
    <Center h={200}>
      <TextAnimate.Typewriter {...props} />
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
    <TextAnimate.Typewriter{{props}} />
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
      initialValue: 'Hello, World! Say Hello to Mantine Typewriter component',
      libraryValue: 'Hello',
    },
    {
      prop: 'animate',
      type: 'boolean',
      initialValue: false,
      libraryValue: true,
    },
    {
      prop: 'loop',
      type: 'boolean',
      initialValue: false,
      libraryValue: true,
    },
    {
      prop: 'delay',
      type: 'number',
      initialValue: 2000,
      libraryValue: 2000,
      step: 500,
      min: 0,
      max: 10000,
    },
    {
      prop: 'speed',
      type: 'number',
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: 0.1,
      max: 10,
    },
    {
      prop: 'withCursor',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withBlink',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'cursorChar',
      type: 'string',
      initialValue: '|',
      libraryValue: '|',
    },
  ],
};
