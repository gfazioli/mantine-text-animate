import type { TextAnimateFactory } from '@gfazioli/mantine-text-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const TextAnimateStylesApi: StylesApiData<TextAnimateFactory> = {
  selectors: {
    root: 'Root element',
    'text-animate-inner': 'Inner element',
    'text-animate-content': 'Content element',
  },

  vars: {
    root: {
      '--text-animate-perspective': 'Controls animation `perspective`',
      '--text-animate-transition-duration': 'Controls animation `duration`',
      '--text-animate-transition-timing-function': 'Controls animation `easing`',
    },
  },

  //modifiers: [{ modifier: 'data-centered', selector: 'root', condition: '`centered` prop is set' }],
};
