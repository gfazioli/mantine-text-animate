import { TextAnimate, type SpinnerProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: SpinnerProps) {
  return (
    <Center>
      <TextAnimate.Spinner {...props} />
    </Center>
  );
}

const code = `
import { TextAnimate, type SpinnerProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core'

function Demo() {
  return (
    <TextAnimate.Spinner{{props}}>{{children}}</TextAnimate.Spinner>
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'children',
      type: 'string',
      initialValue: '★ SPINNING TEXT EXAMPLE ★',
      libraryValue: null,
    },
    {
      prop: 'animate',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'direction',
      type: 'segmented',
      data: [
        {
          label: 'Clockwise',
          value: 'clockwise',
        },
        { label: 'Counter Clockwise', value: 'counterclockwise' },
      ],
      initialValue: 'clockwise',
      libraryValue: 'clockwise',
    },
    {
      prop: 'speed',
      type: 'number',
      initialValue: 8,
      libraryValue: 8,
      step: 1,
      min: 0,
      max: 10,
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'charOffset',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      step: 1,
      min: 0,
      max: 400,
    },
    {
      prop: 'reverseText',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'repeatText',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'repeatCount',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      step: 1,
      min: 0,
      max: 20,
    },
  ],
};
