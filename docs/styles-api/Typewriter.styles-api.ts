import type { TypewriterFactory } from '@gfazioli/mantine-text-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const TypewriterStylesApi: StylesApiData<TypewriterFactory> = {
  selectors: {
    root: 'Root element',
    cursor: 'Cursor element',
  },

  vars: {},

  //modifiers: [{ modifier: 'data-centered', selector: 'root', condition: '`centered` prop is set' }],
};
