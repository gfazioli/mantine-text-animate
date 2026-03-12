import { TextAnimate, type HighlightProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: HighlightProps) {
  return (
    <Center>
      <TextAnimate.Highlight fz={48} fw={700} {...props}>
        Highlighted Text
      </TextAnimate.Highlight>
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';

function Demo() {
  return (
    <Center>
      <TextAnimate.Highlight{{props}}
        fz={48}
        fw={700}
      >
        Highlighted Text
      </TextAnimate.Highlight>
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
      prop: 'animate',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: '#ffeb3b',
      libraryValue: '#ffeb3b',
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
      prop: 'highlightHeight',
      type: 'string',
      initialValue: '40%',
      libraryValue: '40%',
    },
    {
      prop: 'highlightOffset',
      type: 'string',
      initialValue: '60%',
      libraryValue: '60%',
    },
  ],
};
