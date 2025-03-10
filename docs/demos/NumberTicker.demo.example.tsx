import { useEffect, useRef, useState } from 'react';
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const { ref, inViewport } = useInViewport();

  const [downloadCount, setDownloadCount] = useState<number>(1266);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inViewport) {
      timerRef.current = setTimeout(() => {
        setDownloadCount((prev) => prev + Math.floor(Math.random() * 10));
      }, 3000);
    }
  });

  return (
    <Group grow ref={ref}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Norway Fjord Adventures</Text>
          <Badge color="pink">
            On Sale{' '}
            <TextAnimate.NumberTicker
              animate={inViewport}
              startValue={100.99}
              value={88.99}
              speed={0.15}
              decimalPlaces={2}
            />
            $
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          With Mountain Expeditions, you can immerse yourself in the breathtaking mountain scenery
          through tours and activities in and around the majestic peaks
        </Text>

        <Text span size="md" ml="auto" mt={8}>
          Download{' '}
          <TextAnimate.NumberTicker
            animate={inViewport}
            fw={900}
            value={downloadCount}
            speed={0.2}
          />
        </Text>

        <Button color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Norway Fjord Adventures</Text>
          <Badge color="pink">
            On Sale{' '}
            <TextAnimate.NumberTicker
              animate={inViewport}
              startValue={200}
              value={99.99}
              speed={0.15}
              decimalPlaces={2}
            />
            $
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway
        </Text>

        <Text span size="md" ml="auto" mt={8}>
          Download{' '}
          <TextAnimate.NumberTicker animate={inViewport} fw={900} value={984777} speed={0.12} />
        </Text>

        <Button color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button>
      </Card>
    </Group>
  );
}

const code = `
import { useEffect, useRef, useState } from 'react';
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';


function Demo() {
  const { ref, inViewport } = useInViewport();

  const [downloadCount, setDownloadCount] = useState<number>(1266);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inViewport) {
      timerRef.current = setTimeout(() => {
        setDownloadCount((prev) => prev + Math.floor(Math.random() * 10));
      }, 3000);
    }
  });

  return (
    <Group grow ref={ref}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Norway Fjord Adventures</Text>
          <Badge color="pink">
            On Sale{' '}
            <TextAnimate.NumberTicker
              animate={inViewport}
              startValue={100.99}
              value={88.99}
              speed={0.15}
              decimalPlaces={2}
            />
            $
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          With Mountain Expeditions, you can immerse yourself in the breathtaking mountain scenery
          through tours and activities in and around the majestic peaks
        </Text>

        <Text size="md" ml="auto" mt={8}>
          Download{' '}
          <TextAnimate.NumberTicker
            animate={inViewport}
            fw={900}
            value={downloadCount}
            speed={0.2}
          />
        </Text>

        <Button color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Norway Fjord Adventures</Text>
          <Badge color="pink">
            On Sale{' '}
            <TextAnimate.NumberTicker
              animate={inViewport}
              startValue={200}
              value={99.99}
              speed={0.15}
              decimalPlaces={2}
            />
            $
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway
        </Text>

        <Text size="md" ml="auto" mt={8}>
          Download{' '}
          <TextAnimate.NumberTicker animate={inViewport} fw={900} value={984777} speed={0.12} />
        </Text>

        <Button color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button>
      </Card>
    </Group>
  );
`;

export const example: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code,
};
