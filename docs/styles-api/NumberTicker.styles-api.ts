import type { NumberTickerFactory } from '@gfazioli/mantine-text-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const NumberTickerStylesApi: StylesApiData<NumberTickerFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--number-ticker-animation-duration': 'Controls the animation duration based on `speed`',
      '--number-ticker-animation-delay': 'Controls the animation delay based on `delay`',
    },
  },
};
