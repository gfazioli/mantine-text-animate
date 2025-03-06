import { TextAnimate, useTextAnimateContext } from '@gfazioli/mantine-text-animate';
import { Button, Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
    <TextAnimate h={200} w={200}>

    <Paper radius="md" withBorder p="lg" shadow="md">
      <h3>Front Card</h3>
      <TextAnimate.Typewriter>
        <Button>TextAnimate Back</Button>
      </TextAnimate.Typewriter>
    </Paper>

    <Paper radius="md" withBorder p="lg" shadow="md">
      <h3>Back Card</h3>
      <TextAnimate.Typewriter>
        <Button>TextAnimate Front</Button>
      </TextAnimate.Typewriter>
    </Paper>

  </TextAnimate>
  );
}
`;

function Demo() {
  function CustomToggleButton() {
    const { toggleTextAnimate } = useTextAnimateContext();

    return <Button onClick={toggleTextAnimate}>TextAnimate</Button>;
  }

  return (
    <Paper radius="md" withBorder p="lg" shadow="md">
      <h3>Inner</h3>
      <TextAnimate h={200} w={200}>
        <Paper radius="md" withBorder p="lg" shadow="md">
          <h3>Front Card</h3>
          <CustomToggleButton />
        </Paper>

        <Paper radius="md" withBorder p="lg" shadow="md">
          <h3>Back Card</h3>
        </Paper>
      </TextAnimate>
    </Paper>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  defaultExpanded: false,
  centered: true,
  maxWidth: 340,
  dimmed: true,
};
