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
    },
  },
};
