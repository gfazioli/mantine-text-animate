import { TextAnimate, type RotatingTextProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: RotatingTextProps & { values: any }) {
  const values =
    typeof props.values === 'string'
      ? props.values
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
      : props.values;

  return (
    <Center h={100}>
      <span style={{ fontSize: 32, fontWeight: 700 }}>
        I love <TextAnimate.RotatingText fz={32} fw={700} c="blue" {...props} values={values} />
      </span>
    </Center>
  );
}

function getCode(props: Record<string, any>) {
  const valuesRaw = props.values || 'React,Mantine,TypeScript';
  const animation = props.animation ?? 'slideUp';
  const interval = props.interval ?? 3000;
  const speed = props.speed ?? 1;

  const values = valuesRaw
    .split(',')
    .map((s: string) => s.trim())
    .filter(Boolean);
  const valuesStr = `{[${values.map((v: string) => `'${v}'`).join(', ')}]}`;

  const extraProps = [
    animation !== 'slideUp' ? `animation="${animation}"` : '',
    interval !== 3000 ? `interval={${interval}}` : '',
    speed !== 1 ? `speed={${speed}}` : '',
  ]
    .filter(Boolean)
    .map((p) => `\n          ${p}`)
    .join('');

  return `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';

function Demo() {
  return (
    <Center h={100}>
      <span style={{ fontSize: 32, fontWeight: 700 }}>
        I love{' '}
        <TextAnimate.RotatingText
          values=${valuesStr}${extraProps}
          fz={32}
          fw={700}
          c="blue"
        />
      </span>
    </Center>
  );
}
`;
}

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code: getCode,
  controls: [
    {
      prop: 'values',
      type: 'string',
      initialValue: 'React,Mantine,TypeScript',
      libraryValue: '',
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
