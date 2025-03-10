import { TextAnimate, type TypewriterProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: TypewriterProps) {
  return (
    <Center miw={400} h={400} style={{ overflow: 'visible' }}>
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
      initialValue: 'Hello, World! Mantine Typewriter component',
      libraryValue: 'Hello',
    },
    {
      prop: 'animate',
      type: 'boolean',
      initialValue: true,
      libraryValue: false,
    },
    {
      prop: 'loop',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'delay',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      step: 500,
      min: 0,
      max: 10000,
    },
    {
      prop: 'speed',
      type: 'number',
      initialValue: 0.05,
      libraryValue: 0.05,
      step: 0.01,
      min: 0,
      max: 1,
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
      initialValue: '▌',
      libraryValue: '▌',
    },
  ],
};
