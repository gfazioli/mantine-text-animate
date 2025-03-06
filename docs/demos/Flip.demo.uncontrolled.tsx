import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Button, Group, Paper } from '@mantine/core';
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
  return (
    <TextAnimate h={200} w={400} defaultTextAnimateped={true}>
      <Paper radius="md" withBorder p="lg" shadow="md">
        <h3>Front Card</h3>
        <p>The front card</p>
        <Group justify="right">
          <TextAnimate.Typewriter>
            <Button>Show Back</Button>
          </TextAnimate.Typewriter>
        </Group>
      </Paper>

      <Paper radius="md" withBorder p="lg" shadow="md">
        <h3>Back Card</h3>
        <TextAnimate.Typewriter>
          <Button variant="outline">Back to Front</Button>
        </TextAnimate.Typewriter>
      </Paper>
    </TextAnimate>
  );
}

export const uncontrolled: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  defaultExpanded: false,
  centered: true,
  maxWidth: 400,
  dimmed: true,
};
