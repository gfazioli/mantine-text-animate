import { useState } from 'react';
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Stack, TextInput } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [text, setText] = useState('Hello World');

  return (
    <Center h={200}>
      <Stack align="center" w="100%">
        <TextInput
          label="Type to morph"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          w={300}
        />
        <TextAnimate.Morphing fz={32} fw={700} value={text} speed={1} />
      </Stack>
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center, Stack, TextInput } from '@mantine/core';
import { useState } from 'react';

function Demo() {
  const [text, setText] = useState('Hello World');

  return (
    <Center h={200}>
      <Stack align="center" w="100%">
        <TextInput
          label="Type to morph"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          w={300}
        />
        <TextAnimate.Morphing fz={32} fw={700} value={text} speed={1} />
      </Stack>
    </Center>
  );
}
`;

export const configurator: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code,
};
