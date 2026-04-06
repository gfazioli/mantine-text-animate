import { useState } from 'react';
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Group, Slider, Stack, Switch, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [playing, { toggle }] = useDisclosure(false);
  const [speed, setSpeed] = useState(0.25);
  const [volume, setVolume] = useState(0.3);
  const [mono, { toggle: toggleMono }] = useDisclosure(false);

  return (
    <Center h={300}>
      <Stack align="center" w={550} gap="lg">
        <Group>
          <Switch size="xl" checked={playing} onLabel="ON" offLabel="OFF" onChange={toggle} />
          <Switch size="sm" checked={mono} label="Monospace" onChange={toggleMono} />
        </Group>
        <TextAnimate.Typewriter
          fz={24}
          fw={600}
          ff={mono ? 'monospace' : undefined}
          value={[
            'Click to hear the sound...',
            'Mechanical keyboard vibes!',
            'Typewriter with sound effects',
          ]}
          animate={playing}
          withSound
          soundVolume={volume}
          speed={speed}
        />
        <Group w="100%" gap="xl">
          <Stack gap={4} style={{ flex: 1 }}>
            <Text size="xs" c="dimmed">
              Speed: {speed.toFixed(2)}
            </Text>
            <Slider
              min={0.05}
              max={1}
              step={0.05}
              value={speed}
              onChange={setSpeed}
              label={(v) => v.toFixed(2)}
            />
          </Stack>
          <Stack gap={4} style={{ flex: 1 }}>
            <Text size="xs" c="dimmed">
              Volume: {volume.toFixed(2)}
            </Text>
            <Slider
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={setVolume}
              label={(v) => v.toFixed(2)}
            />
          </Stack>
        </Group>
      </Stack>
    </Center>
  );
}

const code = `
import { useState } from 'react';
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Group, Slider, Stack, Switch, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [playing, { toggle }] = useDisclosure(false);
  const [speed, setSpeed] = useState(0.25);
  const [volume, setVolume] = useState(0.3);
  const [mono, { toggle: toggleMono }] = useDisclosure(false);

  return (
    <Center h={300}>
      <Stack align="center" w={550} gap="lg">
        <Group>
          <Switch size="xl" checked={playing} onLabel="ON" offLabel="OFF" onChange={toggle} />
          <Switch size="sm" checked={mono} label="Monospace" onChange={toggleMono} />
        </Group>
        <TextAnimate.Typewriter
          fz={24}
          fw={600}
          ff={mono ? 'monospace' : undefined}
          value={[
            'Click to hear the sound...',
            'Mechanical keyboard vibes!',
            'Typewriter with sound effects',
          ]}
          animate={playing}
          withSound
          soundVolume={volume}
          speed={speed}
        />
        <Group w="100%" gap="xl">
          <Stack gap={4} style={{ flex: 1 }}>
            <Text size="xs" c="dimmed">Speed: {speed.toFixed(2)}</Text>
            <Slider min={0.05} max={1} step={0.05} value={speed} onChange={setSpeed} />
          </Stack>
          <Stack gap={4} style={{ flex: 1 }}>
            <Text size="xs" c="dimmed">Volume: {volume.toFixed(2)}</Text>
            <Slider min={0} max={1} step={0.05} value={volume} onChange={setVolume} />
          </Stack>
        </Group>
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
