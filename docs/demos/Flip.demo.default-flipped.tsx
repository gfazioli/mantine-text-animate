import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Button, Code, Group, Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
    <TextAnimate h={200} w={400} defaultTextAnimateped={true}>

      <Paper radius="md" withBorder p="lg" shadow="md">
        <h3>Front Card</h3>
            <p>The front card</p>
            <Group justify="right">
              <TextAnimate.Typewriter>
                  <Button>TextAnimate to Back</Button>
              </TextAnimate.Typewriter>
            </Group>
      </Paper>

      <Paper radius="md" withBorder p="lg" shadow="md">
        <h3>Back Card</h3>
        <p>In this case the <Code>defaultTextAnimateped</Code> prop is set to <Code>true</Code>, and the back card is visible</p>
          <TextAnimate.Typewriter>
            <Button variant="outline">TextAnimate to Front</Button>
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
            <Button>TextAnimate to Back</Button>
          </TextAnimate.Typewriter>
        </Group>
      </Paper>

      <Paper radius="md" withBorder p="lg" shadow="md">
        <h3>Back Card</h3>
        <p>
          In this case the <Code>defaultTextAnimateped</Code> prop is set to <Code>true</Code>, and the
          back card is visible
        </p>
        <TextAnimate.Typewriter>
          <Button variant="outline">TextAnimate to Front</Button>
        </TextAnimate.Typewriter>
      </Paper>
    </TextAnimate>
  );
}

export const defaultTextAnimateped: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  defaultExpanded: false,
  centered: true,
  maxWidth: 400,
  minHeight: 220,
  dimmed: true,
};
