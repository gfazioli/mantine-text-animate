import type { RotatingTextFactory } from '@gfazioli/mantine-text-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const RotatingTextStylesApi: StylesApiData<RotatingTextFactory> = {
  selectors: {
    root: 'Root element — inline container with overflow hidden',
    text: 'Static text element (visible when not transitioning)',
    entering: 'Entering text element (during transition)',
    exiting: 'Exiting text element (during transition)',
  },

  vars: {
    root: {
      '--text-animate-rotating-speed': 'Controls the transition animation `speed`',
    },
  },
};
