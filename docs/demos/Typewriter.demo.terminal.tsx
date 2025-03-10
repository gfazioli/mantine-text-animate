import { TextAnimate, type TypewriterProps } from '@gfazioli/mantine-text-animate';
import { Center, Paper } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: TypewriterProps) {
  return (
    <Center miw={400} h={360} style={{ overflow: 'visible' }}>
      <Paper p="xl" h={350} withBorder w={'100%'} bg="dark">
        <TextAnimate.Typewriter
          multiline
          c="green"
          ff="monospace"
          cursorChar="█"
          withBlink={true}
          speed={0.02}
          delay={200}
          value={[
            '$ cd /home/user/projects',
            '$ ls -la',
            'total 32',
            'drwxr-xr-x  5 user user 4096 Mar 10 14:30 .',
            'drwxr-xr-x 18 user user 4096 Mar 10 14:28 ..',
            'drwxr-xr-x  8 user user 4096 Mar 10 14:30 .git',
            '-rw-r--r--  1 user user  948 Mar 10 14:30 README.md',
            'drwxr-xr-x  2 user user 4096 Mar 10 14:30 src',
            '$ npm run build',
            '> project@1.0.0 build',
            '> webpack --mode production',
            '✓ Compiled successfully in 2.36s',
          ]}
        />
      </Paper>
    </Center>
  );
}

const code = `
import { TextAnimate, type TypewriterProps } from '@gfazioli/mantine-text-animate';
import { Center } from '@mantine/core';

function Demo() {
  return (
      <TextAnimate.Typewriter
        multiline
        c="green"
        ff="monospace"
        cursorChar="█"
        withBlink={true}
        speed={0.02}
        delay={200}
        value={[
          '$ cd /home/user/projects',
          '$ ls -la',
          'total 32',
          'drwxr-xr-x  5 user user 4096 Mar 10 14:30 .',
          'drwxr-xr-x 18 user user 4096 Mar 10 14:28 ..',
          'drwxr-xr-x  8 user user 4096 Mar 10 14:30 .git',
          '-rw-r--r--  1 user user  948 Mar 10 14:30 README.md',
          'drwxr-xr-x  2 user user 4096 Mar 10 14:30 src',
          '$ npm run build',
          '> project@1.0.0 build',
          '> webpack --mode production',
          '✓ Compiled successfully in 2.36s',
        ]}
      />
  );
}
`;

export const terminal: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
