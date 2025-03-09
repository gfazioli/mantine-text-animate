import React, { useState } from 'react';
import { Center, Paper, SegmentedControl, Stack } from '@mantine/core';
import { TextAnimate, TextAnimateProps } from './TextAnimate';

export default {
  title: 'TextAnimate',
  args: {
    animation: 'fade',
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
        'blur',
        'scale',
        'slideUp',
        'slideDown',
        'slideLeft',
        'slideRight',
        'blurUp',
        'blurDown',
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
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection | string>(
    undefined
  );

  return (
    <>
      <Center h={800}>
        <Stack>
          <SegmentedControl
            value={animationDirection === undefined ? 'none' : String(animationDirection)}
            onChange={setAnimationDirection}
            data={[
              { label: 'None', value: 'none' },
              { label: 'Static', value: 'static' },
              { label: 'Animate In', value: 'in' },
              { label: 'Animate Out', value: 'out' },
            ]}
          />

          <Paper p="xl" withBorder>
            <TextAnimate animate={animationDirection as AnimationDirection} {...rest}>
              Fade in animation with slight upward movement
            </TextAnimate>
          </Paper>
        </Stack>
      </Center>
    </>
  );
}

export function MultipleLine(props: TextAnimateProps) {
  const { animate, ...rest } = props;
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection | string>(
    undefined
  );

  return (
    <>
      <Center h={800}>
        <Stack>
          <SegmentedControl
            value={animationDirection === undefined ? 'none' : String(animationDirection)}
            onChange={setAnimationDirection}
            data={[
              { label: 'None', value: 'none' },
              { label: 'Static', value: 'static' },
              { label: 'Animate In', value: 'in' },
              { label: 'Animate Out', value: 'out' },
            ]}
          />

          <Paper p="xl" withBorder>
            <TextAnimate animate={animationDirection as AnimationDirection} {...rest}>
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
  const { animate, ...rest } = props;
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection | string>(
    undefined
  );

  return (
    <>
      <Center h={800}>
        <Stack>
          <SegmentedControl
            value={animationDirection === undefined ? 'none' : String(animationDirection)}
            onChange={setAnimationDirection}
            data={[
              { label: 'None', value: 'none' },
              { label: 'Static', value: 'static' },
              { label: 'Animate In', value: 'in' },
              { label: 'Animate Out', value: 'out' },
            ]}
          />

          <Paper p="xl" withBorder>
            <TextAnimate
              animate={animationDirection as AnimationDirection}
              {...rest}
              by="line"
              segmentDelay={0.7}
            >
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
