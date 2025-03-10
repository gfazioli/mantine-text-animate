import { useState } from 'react';
import { TextAnimate, type TypewriterProps } from '@gfazioli/mantine-text-animate';
import { Badge, Center, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: TypewriterProps) {
  const [isTypeEnd, setIsTypeEnd] = useState(0);
  const [isTypeLoop, setIsTypeLoop] = useState(0);

  return (
    <Center miw={400} h={100}>
      <Stack w="100%" h={100}>
        <Badge color="red">onTypeEnd: {isTypeEnd}</Badge>
        <Badge color="lime">onTypeLoop: {isTypeLoop}</Badge>
        <TextAnimate.Typewriter
          onTypeEnd={() => {
            setIsTypeEnd((prev) => prev + 1);
          }}
          onTypeLoop={() => {
            setIsTypeLoop((prev) => prev + 1);
          }}
          value={[
            'Hello, World! Mantine Typewriter component',
            'That was a long time ago',
            'But it was fun',
          ]}
        />
      </Stack>
    </Center>
  );
}

const code = `
import { useState } from 'react';
import { TextAnimate, type TypewriterProps } from '@gfazioli/mantine-text-animate';
import { Badge, Center, Stack } from '@mantine/core'

function Demo() {

  const [isTypeEnd, setIsTypeEnd] = useState(0);
  const [isTypeLoop, setIsTypeLoop] = useState(0);

  return (
    <Stack>
      <Badge color="red">onTypeEnd: {isTypeEnd}</Badge>
      <Badge color="lime">onTypeLoop: {isTypeLoop}</Badge>
      <TextAnimate.Typewriter
        onTypeEnd={() => {
          setIsTypeEnd((prev) => prev + 1);
        }}
        onTypeLoop={() => {
          setIsTypeLoop((prev) => prev + 1);
        }}
        value={[
          'Hello, World! Mantine Typewriter component',
          'That was a long time ago',
          'But it was fun',
        ]}
      />
    </Stack>
  );
}
`;

export const events: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
