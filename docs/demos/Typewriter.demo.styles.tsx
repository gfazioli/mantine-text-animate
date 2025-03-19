import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const { ref, inViewport } = useInViewport();

  return (
    <Center h={200} ref={ref}>
      <TextAnimate.Typewriter
        animate={inViewport}
        multiline
        fz={24}
        c="red"
        ff="monospace"
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
      fz={24}
      c="red"
      ff="monospace"
      value={[
        'Hello, World! Mantine Typewriter component',
        'That was a long time ago',
        'But it was fun',
      ]}
    />
  );
}
`;

export const styles: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
