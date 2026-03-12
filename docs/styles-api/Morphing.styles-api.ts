import type { MorphingFactory } from '@gfazioli/mantine-text-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const MorphingStylesApi: StylesApiData<MorphingFactory> = {
  selectors: {
    root: 'Root element — positioned container for morphing characters',
    character: 'Individual character span with absolute positioning',
  },

  vars: {
    root: {
      '--text-animate-morphing-speed': 'Controls the transition `speed`',
    },
  },
};
