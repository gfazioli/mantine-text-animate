import type { TextTickerFactory } from '@gfazioli/mantine-text-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const TextTickerStylesApi: StylesApiData<TextTickerFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--text-ticker-animation-duration': 'Controls the animation duration based on `speed`',
      '--text-ticker-animation-delay': 'Controls the animation delay based on `delay`',
    },
  },
};
