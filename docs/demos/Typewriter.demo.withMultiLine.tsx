import { TextAnimate, type TypewriterProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: TypewriterProps) {
  return (
    <Center miw={400} h={150} style={{ overflow: 'visible' }}>
      <TextAnimate.Typewriter
        multiline
        value={[
          'Hello, World! Mantine Typewriter component',
          'That was a long time ago',
          'But it was fun',
        ]}
      />
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
    <TextAnimate.Typewriter
      multiline
      value={[
        'Hello, World! Mantine Typewriter component',
        'That was a long time ago',
        'But it was fun',
      ]}
    />
  );
}
`;

export const withMultiLine: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
