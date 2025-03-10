import type { TextAnimateFactory } from '@gfazioli/mantine-text-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const TextAnimateStylesApi: StylesApiData<TextAnimateFactory> = {
  selectors: {
    root: 'Root element',
    segment: 'Segment element',
  },

  vars: {
    root: {
      '--text-animate-translation-distance': 'Controls animation `translateDistance`',
      '--text-animate-blur-amount': 'Controls animation `blurAmount`',
      '--text-animate-scale-amount': 'Controls animation `scaleAmount`',
    },
  },

  //modifiers: [{ modifier: 'data-centered', selector: 'root', condition: '`centered` prop is set' }],
};
