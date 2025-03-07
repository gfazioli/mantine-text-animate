import React, { useState } from 'react';
import { Center, Paper, SegmentedControl, Stack, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TextAnimate, TextAnimateProps } from './TextAnimate';

export default {
  title: 'TextAnimate',
  args: {
    animation: 'fadeIn',
    by: 'word',
    delay: 0,
    duration: 0.3,
    segmentDelay: 0.01,

    animateProps: {
      translateDistance: 20,
      scaleAmount: 0.8,
      blurAmount: 10,
    },
  },
  argTypes: {
    animation: {
      control: {
        type: 'select',
      },
      options: [
        'fade',
        'fadeIn',
        'blurIn',
        'blurInUp',
        'blurInDown',
        'slideUp',
        'slideDown',
        'slideLeft',
        'slideRight',
        'scaleUp',
        'scaleDown',
      ],
    },
    by: {
      control: {
        type: 'select',
      },
      options: ['text', 'word', 'character', 'line'],
    },
    delay: { control: { type: 'range', min: 0, max: 20, step: 0.1 } },
    duration: { control: { type: 'range', min: 0, max: 20, step: 0.1 } },
    segmentDelay: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },

    animateProps: {
      translateDistance: { control: { type: 'range', min: 0, max: 100, step: 1 } },
      scaleAmount: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
      blurAmount: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    },
  },
};

type AnimationDirection = 'in' | 'out' | 'none' | 'static' | undefined;

export function Usage(props: TextAnimateProps) {
  const { animate, ...rest } = props;
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>(undefined);

  // Update the handleAnimationDirectionChange function to handle the new values
  const handleAnimationDirectionChange = (value: string) => {
    if (value === 'none') {
      setAnimationDirection('none' as AnimationDirection);
    } else if (value === 'static') {
      setAnimationDirection('static' as AnimationDirection);
    } else {
      setAnimationDirection(value as 'in' | 'out');
    }
  };

  return (
    <>
      <Center h={800}>
        <Stack>
          <SegmentedControl
            value={animationDirection === undefined ? 'none' : String(animationDirection)}
            onChange={handleAnimationDirectionChange}
            data={[
              { label: 'None', value: 'none' },
              { label: 'Static', value: 'static' },
              { label: 'Animate In', value: 'in' },
              { label: 'Animate Out', value: 'out' },
            ]}
          />

          <Paper p="xl" withBorder>
            <TextAnimate animate={animationDirection} {...rest}>
              Fade in animation with slight upward movement
            </TextAnimate>
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function MultipleLine(props: TextAnimateProps) {
  const { ...rest } = props;

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Center h={800}>
        <Stack>
          <Switch
            checked={opened}
            onChange={opened ? close : open}
            label={opened ? 'Back' : 'Start animation'}
          />

          <Paper p="xl" withBorder>
            <TextAnimate {...rest}>
              {
                'This is the first line\nThis is the second line\nThis is the third line\nEach line can animate separately or together.'
              }
            </TextAnimate>
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function MultipleLineSlow(props: TextAnimateProps) {
  const { segmentDelay, ...rest } = props;

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Center h={800}>
        <Stack>
          <Switch
            checked={opened}
            onChange={opened ? close : open}
            label={opened ? 'Back' : 'Start animation'}
          />

          <Paper p="xl" withBorder>
            <TextAnimate {...rest} segmentDelay={2}>
              {
                'This is the first line\nThis is the second line\nThis is the third line\nEach line can animate separately or together.'
              }
            </TextAnimate>
          </Paper>
        </Stack>
      </Center>
    </>
  );
}
