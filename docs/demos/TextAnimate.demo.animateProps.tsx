import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [animated, { toggle }] = useDisclosure();

  return (
    <Stack>
      <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
      <TextAnimate
        animate={animated ? 'in' : 'static'}
        by="character"
        animation="scale"
        animateProps={{
          scaleAmount: 34,
        }}
      >
        Mantine TextAnimate component
      </TextAnimate>
    </Stack>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [animated, { toggle }] = useDisclosure();

  return (
    <Stack>
      <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
      <TextAnimate
        animate={animated ? 'in' : 'static'}
        by="character"
        animation="scale"
        animateProps={{
          scaleAmount: 34,
        }}
      >
        Mantine TextAnimate component
      </TextAnimate>
    </Stack>
  );
}
`;

export const animateProps: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  centered: true,
  minHeight: 150,
  code: [
    {
      fileName: 'Demo.tsx',
      code,
      language: 'tsx',
    },
  ],
};
