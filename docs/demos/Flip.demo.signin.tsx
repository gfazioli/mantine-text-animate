import { TextAnimate } from '@gfazioli/mantine-text-animate';
import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';
import classes from './TextAnimateDemoSignIn.module.css';

const code = `
function Demo() {

  const [flipped, setTextAnimateped] = useState(false);

  function SignIn() {
    return (
        <Paper withBorder shadow="md" p={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
    );
  }

  function SignUp() {
    return (
        <Paper withBorder shadow="md" p={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <PasswordInput label="Confirm Password" placeholder="Your password" required mt="md" />
          <Button fullWidth mt="xl">
            Sign Up
          </Button>
        </Paper>
    );
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
      {!flipped ? "Welcome back!" : "Create an account"}
      </Title>
      
      {!flipped ?
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button" onClick={()=>setTextAnimateped(true)}>
            Create account
          </Anchor>
        </Text> :
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do you already have an account?{' '}
          <Anchor size="sm" component="button" onClick={()=>setTextAnimateped(false)}>
            Sign in
          </Anchor>
        </Text>
      }
      
      <TextAnimate h={200} w={400} flipped={flipped} mt={30}>
        <SignIn />
        <SignUp />
      </TextAnimate>
      
    </Container>
  );
}
`;

function Demo() {
  const [flipped, setTextAnimateped] = useState(false);

  function SignIn() {
    return (
      <Paper withBorder shadow="md" p={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    );
  }

  function SignUp() {
    return (
      <Paper withBorder shadow="md" p={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <PasswordInput label="Confirm Password" placeholder="Your password" required mt="md" />
        <Button fullWidth mt="xl">
          Sign Up
        </Button>
      </Paper>
    );
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        {!flipped ? 'Welcome back!' : 'Create an account'}
      </Title>

      {!flipped ? (
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button" onClick={() => setTextAnimateped(true)}>
            Create account
          </Anchor>
        </Text>
      ) : (
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do you already have an account?{' '}
          <Anchor size="sm" component="button" onClick={() => setTextAnimateped(false)}>
            Sign in
          </Anchor>
        </Text>
      )}

      <TextAnimate h={200} w={400} flipped={flipped} mt={30}>
        <SignIn />
        <SignUp />
      </TextAnimate>
    </Container>
  );
}

const cssCode = `
.title {
  font-family:
    Greycliff CF,
    var(--mantine-font-family);
  font-weight: 900;
}

`;

export const signin: MantineDemo = {
  type: 'code',
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
  ],
  component: Demo,
  defaultExpanded: false,
  centered: true,
  maxWidth: 400,
  minHeight: 500,
  dimmed: true,
};
