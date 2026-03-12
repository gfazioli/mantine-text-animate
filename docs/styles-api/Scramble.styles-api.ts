import type { ScrambleFactory } from '@gfazioli/mantine-text-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const ScrambleStylesApi: StylesApiData<ScrambleFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--scramble-animation-duration': 'Controls animation `duration` based on speed',
      '--scramble-animation-delay': 'Controls animation `delay`',
    },
  },
};
