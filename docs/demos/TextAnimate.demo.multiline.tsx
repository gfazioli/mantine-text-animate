import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [animated, { toggle }] = useDisclosure();

  return (
    <Stack h={150}>
      <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
      <TextAnimate
        animate={animated ? 'in' : 'none'}
        by="line"
        animation="scale"
        duration={1}
        segmentDelay={0.5}
        animateProps={{
          scaleAmount: 2,
        }}
      >
        {`
          Mantine TextAnimate component\n
          Can be used for multiline text\n
          This is the third line\n
          That's all!
          `}
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
    <Stack h={150}>
      <Switch size="xl" checked={animated} onLabel="ON" offLabel="OFF" onChange={toggle} />
      <TextAnimate
        animate={animated ? 'in' : 'none'}
        by="line"
        animation="scale"
        duration={1}
        segmentDelay={0.5}
        animateProps={{
          scaleAmount: 2,
        }}
      >
        {\`
          Mantine TextAnimate component\\n
          Can be used for multiline text\\n
          This is the third line\\n
          That's all!
          \`}
      </TextAnimate>
    </Stack>
  );
}
`;

export const multiline: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  centered: true,
  code: [
    {
      fileName: 'Demo.tsx',
      code,
      language: 'tsx',
    },
  ],
};
