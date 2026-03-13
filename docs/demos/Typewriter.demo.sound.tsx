import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [playing, { toggle }] = useDisclosure(false);

  return (
    <Center h={200}>
      <Stack align="center">
        <Switch size="xl" checked={playing} onLabel="ON" offLabel="OFF" onChange={toggle} />
        <TextAnimate.Typewriter
          fz={24}
          fw={600}
          value={[
            'Click to hear the sound...',
            'Mechanical keyboard vibes!',
            'Typewriter with sound effects',
          ]}
          animate={playing}
          withSound
          soundVolume={0.3}
          speed={0.1}
        />
      </Stack>
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [playing, { toggle }] = useDisclosure(false);

  return (
    <Center h={200}>
      <Stack align="center">
        <Switch size="xl" checked={playing} onLabel="ON" offLabel="OFF" onChange={toggle} />
        <TextAnimate.Typewriter
          fz={24}
          fw={600}
          value={[
            'Click to hear the sound...',
            'Mechanical keyboard vibes!',
            'Typewriter with sound effects',
          ]}
          animate={playing}
          withSound
          soundVolume={0.3}
          speed={0.1}
        />
      </Stack>
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
