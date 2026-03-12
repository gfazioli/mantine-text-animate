import { TextAnimate, type TextAnimateProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: TextAnimateProps) {
  return (
    <Center h={200}>
      <TextAnimate fz={32} fw={700} {...props} />
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';

function Demo() {
  return (
    <Center h={200}>
      <TextAnimate{{props}}
        fz={32}
        fw={700}
      >
        Hello World!
      </TextAnimate>
    </Center>
  );
}
`;

export const loop: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'children',
      type: 'string',
      initialValue: 'Hello World!',
      libraryValue: 'Hello World!',
    },
    {
      prop: 'animate',
      type: 'select',
      data: ['in', 'out', 'loop', 'static', 'none'],
      initialValue: 'loop',
      libraryValue: 'loop',
    },
    {
      prop: 'loopDelay',
      type: 'number',
      initialValue: 2000,
      libraryValue: 2000,
      step: 500,
      min: 0,
      max: 10000,
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
        'slideLeft',
        'slideRight',
        'blurUp',
        'blurDown',
      ],
      initialValue: 'fade',
      libraryValue: 'fade',
    },
    {
      prop: 'by',
      type: 'select',
      data: ['text', 'word', 'character', 'line'],
      initialValue: 'word',
      libraryValue: 'word',
    },
  ],
};
