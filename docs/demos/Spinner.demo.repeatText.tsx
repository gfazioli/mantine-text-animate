import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Center miw={400} h={200}>
      <TextAnimate.Spinner repeatText repeatCount={3}>
        Hello *
      </TextAnimate.Spinner>
    </Center>
  );
}

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
    <TextAnimate.Spinner repeatText={true} repeatCount={3}>
      Hello *
    </TextAnimate.Spinner>
  );
}
`;

export const repeatText: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
