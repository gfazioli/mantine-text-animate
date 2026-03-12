import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Center h={200}>
      <TextAnimate.Typewriter
        fz={24}
        fw={600}
        value={[
          'Click to hear the sound...',
          'Mechanical keyboard vibes!',
          'Typewriter with sound effects',
        ]}
        withSound
        soundVolume={0.3}
        speed={0.05}
      />
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';

function Demo() {
  return (
    <Center h={200}>
      <TextAnimate.Typewriter
        fz={24}
        fw={600}
        value={[
          'Click to hear the sound...',
          'Mechanical keyboard vibes!',
          'Typewriter with sound effects',
        ]}
        withSound
        soundVolume={0.3}
        speed={0.05}
      />
    </Center>
  );
}
`;

export const sound: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code,
};
