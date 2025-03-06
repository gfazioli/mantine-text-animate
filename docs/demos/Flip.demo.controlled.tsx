import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Button, Group, Paper, Stack, Switch } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

const code = `
function Demo() {
  const [flipped, setTextAnimateped] = useState(false);

  return (
    <Stack>
      <Group>
        <Switch checked={flipped}
                onChange={(event) => setTextAnimateped(event.currentTarget.checked)}
                label="Show settings" />
      </Group>

    <TextAnimate h={200} w={400} flipped={flipped}>

      <Paper radius="md" withBorder p="lg" shadow="md">
        <h3>Front Card</h3>
        <p>The front card</p>
        <Group justify="right">
          <Button onClick={()=>setTextAnimateped(true)}>Show Settings</Button>
        </Group>
      </Paper>

      <Paper radius="md" withBorder p="lg" shadow="md">
        <h3>Back Card</h3>
        <Button onClick={()=>setTextAnimateped(false)} variant="outline">Back to Front</Button>
      </Paper>

    </TextAnimate>
    </Stack>
  );
}
`;

function Demo() {
  const [flipped, setTextAnimateped] = useState(false);

  return (
    <Stack>
      <Group>
        <Switch
          checked={flipped}
          onChange={(event) => setTextAnimateped(event.currentTarget.checked)}
          label="Show settings"
        />
      </Group>

      <TextAnimate h={200} w={400} flipped={flipped}>
        <Paper radius="md" withBorder p="lg" shadow="md">
          <h3>Front Card</h3>
          <p>The front card</p>
          <Group justify="right">
            <Button onClick={() => setTextAnimateped(true)}>Show Settings</Button>
          </Group>
        </Paper>

        <Paper radius="md" withBorder p="lg" shadow="md">
          <h3>Back Card</h3>
          <Button onClick={() => setTextAnimateped(false)} variant="outline">
            Back to Front
          </Button>
        </Paper>
      </TextAnimate>
    </Stack>
  );
}

export const controlled: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  defaultExpanded: false,
  centered: true,
  maxWidth: 400,
  dimmed: true,
};
