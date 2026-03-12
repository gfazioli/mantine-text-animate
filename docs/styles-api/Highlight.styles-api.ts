import type { HighlightFactory } from '@gfazioli/mantine-text-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const HighlightStylesApi: StylesApiData<HighlightFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--text-animate-highlight-color': 'Controls the highlight `color`',
      '--text-animate-highlight-speed': 'Controls the animation `speed`',
      '--text-animate-highlight-height': 'Controls the highlight bar `highlightHeight`',
      '--text-animate-highlight-offset': 'Controls the vertical `highlightOffset` from top',
    },
  },
};
