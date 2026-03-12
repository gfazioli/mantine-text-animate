import { TextAnimate, type GradientProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: GradientProps) {
  return (
    <Center>
      <TextAnimate.Gradient
        {...props}
        colors={['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6b6b']}
        fz={48}
        fw={700}
      >
        Mantine Gradient Text
      </TextAnimate.Gradient>
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';

function Demo() {
  return (
    <Center>
      <TextAnimate.Gradient{{props}}
        colors={['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6b6b']}
        fz={48}
        fw={700}
      >
        Mantine Gradient Text
      </TextAnimate.Gradient>
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
      prop: 'speed',
      type: 'number',
      initialValue: 3,
      libraryValue: 3,
      step: 0.5,
      min: 0.5,
      max: 10,
    },
    {
      prop: 'direction',
      type: 'number',
      initialValue: 90,
      libraryValue: 90,
      step: 15,
      min: 0,
      max: 360,
    },
  ],
};
