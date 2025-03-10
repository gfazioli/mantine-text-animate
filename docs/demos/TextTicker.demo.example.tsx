import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Stack, Title } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const { ref, inViewport } = useInViewport();

  return (
    <Stack w={'100%'} align="center" ref={ref}>
      <Title order={1}>Welcome</Title>
      <TextAnimate.TextTicker
        fs="italic"
        c="violet"
        style={{
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
        }}
        initialText="random"
        speed={0.05}
        characterSet="custom"
        customCharacters="*"
        revealDirection="center-out"
        value="Amazing TextTicker component for Mantine UI Library"
        animate={inViewport}
      />
    </Stack>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Stack, Title } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';

function Demo() {
  const { ref, inViewport } = useInViewport();

  return (
    <Stack w={'100%'} align="center" ref={ref}>
      <Title order={1}>Welcome</Title>
      <TextAnimate.TextTicker
        fs="italic"
        delay={1}
        c="violet"
        style={{
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
        }}
        speed={0.05}
        characterSet="custom"
        customCharacters="*"
        revealDirection="center-out"
        value="Amazing TextTicker component for Mantine UI Library"
        animate={inViewport}
      />
    </Stack>
  );
}
`;

export const example: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code,
};
