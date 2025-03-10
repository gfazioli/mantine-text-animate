import { TextAnimate, type TextAnimateProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: TextAnimateProps) {
  return (
    <Center>
      <TextAnimate {...props} />
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
    <TextAnimate{{props}}>
      {{children}}
    </TextAnimate>
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
      initialValue: 'Mantine TextAnimate component',
      libraryValue: null,
    },
    {
      prop: 'animate',
      type: 'select',
      data: [
        { label: 'None', value: 'none' },
        { label: 'Static', value: 'static' },
        { label: 'Animate In', value: 'in' },
        { label: 'Animate Out', value: 'out' },
      ],
      initialValue: 'in',
      libraryValue: 'none',
    },
    {
      prop: 'animation',
      type: 'select',
      data: [
        'fade',
        'blur',
        'scale',
        'slideUp',
        'slideDown',
        'slideUpElastic',
        'slideDownElastic',
        'slideLeft',
        'slideRight',
        'slideLeftElastic',
        'slideRightElastic',
        'blurUp',
        'blurDown',
      ],
      initialValue: 'slideUp',
      libraryValue: 'fade',
    },
    {
      prop: 'by',
      type: 'select',
      data: ['text', 'word', 'character', 'line'],
      initialValue: 'character',
      libraryValue: 'word',
    },

    {
      prop: 'duration',
      type: 'number',
      initialValue: 0.8,
      libraryValue: 0.8,
      step: 0.1,
      min: 0,
      max: 10,
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
      prop: 'segmentDelay',
      type: 'number',
      initialValue: 0.05,
      libraryValue: 0.05,
      step: 0.01,
      min: 0,
      max: 1,
    },
  ],
};
