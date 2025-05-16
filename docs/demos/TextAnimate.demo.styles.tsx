import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { MantineSize, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [animated, { toggle }] = useDisclosure();

  return (
    <Stack>
      <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
      <TextAnimate
        fz={48}
        fw={600}
        color="violet"
        animate={animated ? 'in' : 'none'}
        by="character"
        animation="blur"
        duration={0.5}
        animateProps={{
          blurAmount: '20px' as MantineSize,
        }}
      >
        Mantine TextAnimate component
      </TextAnimate>
    </Stack>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { MantineSize, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [animated, { toggle }] = useDisclosure();

  return (
    <Stack>
      <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
      <TextAnimate
        fz={48}
        fw={600}
        color="violet"
        animate={animated ? 'in' : 'none'}
        by="character"
        animation="blur"
        duration={0.5}
        animateProps={{
          blurAmount: '20px' as MantineSize,
        }}
      >
        Mantine TextAnimate component
      </TextAnimate>
    </Stack>
  );
}
`;

export const styles: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: {
    fileName: 'Demo.tsx',
    code,
    language: 'tsx',
  },
};
