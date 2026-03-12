import type { GradientFactory } from '@gfazioli/mantine-text-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const GradientStylesApi: StylesApiData<GradientFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--text-animate-gradient-speed': 'Controls animation `speed`',
      '--text-animate-gradient-direction': 'Controls gradient `direction` in degrees',
      '--text-animate-gradient-end-x':
        'Computed X end position for the animation based on `direction`',
      '--text-animate-gradient-end-y':
        'Computed Y end position for the animation based on `direction`',
    },
  },
};
