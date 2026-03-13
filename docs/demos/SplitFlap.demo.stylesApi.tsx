import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';
import { SplitFlapStylesApi } from '../styles-api/SplitFlap.styles-api';

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [animated, { toggle }] = useDisclosure();

  return (
    <Center h={200}>
      <Stack align="center">
        <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
        <TextAnimate.SplitFlap{{props}} fz={32} value="HELLO" animate={animated} />
      </Stack>
    </Center>
  );
}
`;

function Demo(props: any) {
  const [animated, { toggle }] = useDisclosure();

  return (
    <Center h={200}>
      <Stack align="center">
        <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
        <TextAnimate.SplitFlap fz={32} value="HELLO" animate={animated} {...props} />
      </Stack>
    </Center>
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: SplitFlapStylesApi,
  component: Demo,
  code,
  centered: true,
};
