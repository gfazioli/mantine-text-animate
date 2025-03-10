import type { SpinnerFactory } from '@gfazioli/mantine-text-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const SpinnerStylesApi: StylesApiData<SpinnerFactory> = {
  selectors: {
    root: 'Root element',
    char: 'Character element',
    container: 'Container element',
  },

  vars: {
    root: {
      '--text-animate-spinner-radius': 'Controls animation `radius`',
      '--text-animate-spinner-speed': 'Controls animation `speed`',
      '--text-animate-spinner-char-offset': 'Controls animation `charOffset`',
    },
  },

  //modifiers: [{ modifier: 'data-centered', selector: 'root', condition: '`centered` prop is set' }],
};
