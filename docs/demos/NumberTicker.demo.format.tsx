import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [animated, { close, toggle }] = useDisclosure();

  return (
    <Center h={400}>
      <Stack>
        <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
        <TextAnimate.NumberTicker
          fz={48}
          c="teal"
          value={1234.56}
          decimalPlaces={2}
          animate={animated}
          onCompleted={close}
          formatValue={(value) =>
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(value)
          }
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
  const [animated, { close, toggle }] = useDisclosure();

  return (
    <Stack>
      <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
      <TextAnimate.NumberTicker
        fz={48}
        c="teal"
        value={1234.56}
        decimalPlaces={2}
        animate={animated}
        onCompleted={close}
        formatValue={(value) =>
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(value)
        }
      />
    </Stack>
  );
}
`;

export const format: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code,
};
