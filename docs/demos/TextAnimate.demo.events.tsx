import { useState } from 'react';
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Badge, Group, MantineSize, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [animated, { open, close, toggle }] = useDisclosure();
  const [event, setEvent] = useState('');

  return (
    <Stack>
      <Group>
        <Switch size="xl" checked={animated} onLabel="OUT" offLabel="IN" onChange={toggle} />
        <Badge color="lime" size="xl">
          {event}
        </Badge>
      </Group>
      <TextAnimate
        fz={48}
        fw={600}
        color="violet"
        animate={animated ? 'in' : 'out'}
        by="character"
        animation="slideRight"
        onAnimationStart={(animate) => setEvent(`Start ${animate}`)}
        onAnimationEnd={(animate) => setEvent(`End ${animate}`)}
        duration={0.5}
        animateProps={{
          translateDistance: '820px' as MantineSize,
        }}
      >
        Mantine TextAnimate component
      </TextAnimate>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Badge, Group, MantineSize, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [animated, { open, close, toggle }] = useDisclosure();

  return (
    <Stack>
      <Group>
        <Switch size="xl" checked={started} onLabel="OUT" offLabel="IN" onChange={toggle} />
        <Badge color="lime" size="xl">
          {event}
        </Badge>
      </Group>
      <TextAnimate
        fz={48}
        fw={600}
        color="violet"
        animate={started ? 'in' : 'out'}
        by="character"
        animation="slideRight"
        onAnimationStart={(animate) => setEvent(\`Start \${animate}\`)}
        onAnimationEnd={(animate) => setEvent(\`End \${animate}\`)}
        duration={0.5}
        animateProps={{
          translateDistance: '820px' as MantineSize,
        }}
      >
        Mantine TextAnimate component
      </TextAnimate>
    </Stack>
  );
}
`;

export const events: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: {
    fileName: 'Demo.tsx',
    code,
    language: 'tsx',
  },
};
