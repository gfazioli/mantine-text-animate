import { TextAnimate, type RotatingTextProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: RotatingTextProps & { values: any }) {
  const values = typeof props.values === 'string' ? props.values.split(',') : props.values;

  return (
    <Center h={100}>
      <span style={{ fontSize: 32, fontWeight: 700 }}>
        I love <TextAnimate.RotatingText fz={32} fw={700} c="blue" {...props} values={values} />
      </span>
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';

function Demo() {
  return (
    <Center h={100}>
      <span style={{ fontSize: 32, fontWeight: 700 }}>
        I love{' '}
        <TextAnimate.RotatingText
          values={['React', 'Mantine', 'TypeScript']}{{props}}
          fz={32}
          fw={700}
          c="blue"
        />
      </span>
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
      prop: 'values',
      type: 'string',
      initialValue: 'React,Mantine,TypeScript',
      libraryValue: 'React,Mantine,TypeScript',
    },
    {
      prop: 'animation',
      type: 'select',
      data: ['slideUp', 'slideDown', 'fade', 'blur', 'blurUp', 'blurDown'],
      initialValue: 'slideUp',
      libraryValue: 'slideUp',
    },
    {
      prop: 'interval',
      type: 'number',
      initialValue: 3000,
      libraryValue: 3000,
      step: 500,
      min: 500,
      max: 10000,
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
  ],
};
