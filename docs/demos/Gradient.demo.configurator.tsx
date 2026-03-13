import { TextAnimate, type GradientProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

interface WrapperProps extends GradientProps {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
}

function Wrapper({ color1, color2, color3, color4, color5, ...props }: WrapperProps) {
  return (
    <Center>
      <TextAnimate.Gradient
        {...props}
        colors={[color1, color2, color3, color4, color5]}
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
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: 0.1,
      max: 5,
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
    {
      prop: 'color1',
      type: 'color',
      initialValue: '#ff6b6b',
      libraryValue: '#ff6b6b',
    },
    {
      prop: 'color2',
      type: 'color',
      initialValue: '#ffd93d',
      libraryValue: '#ffd93d',
    },
    {
      prop: 'color3',
      type: 'color',
      initialValue: '#6bcb77',
      libraryValue: '#6bcb77',
    },
    {
      prop: 'color4',
      type: 'color',
      initialValue: '#4d96ff',
      libraryValue: '#4d96ff',
    },
    {
      prop: 'color5',
      type: 'color',
      initialValue: '#ff6b6b',
      libraryValue: '#ff6b6b',
    },
  ],
};
