import type { SplitFlapFactory } from '@gfazioli/mantine-text-animate';
import type { StylesApiData } from '../components/styles-api.types';

export const SplitFlapStylesApi: StylesApiData<SplitFlapFactory> = {
  selectors: {
    root: 'Root element — flex container for all characters',
    character: 'Individual character container with perspective',
    charTop: 'Top half of the character (static)',
    charBottom: 'Bottom half of the character (static)',
    flapTop: 'Flipping top flap (animated)',
    flapBottom: 'Flipping bottom flap (animated)',
  },

  vars: {
    root: {
      '--text-animate-split-flap-bg': 'Controls the flap background color (`bg`)',
      '--text-animate-split-flap-color': 'Controls the flap text color (`textColor`)',
      '--text-animate-split-flap-gap': 'Controls the gap between characters (`gap`)',
      '--text-animate-split-flap-flip-duration':
        'Controls the flip animation duration (`flipDuration`)',
      '--text-animate-split-flap-char-width': 'Controls character width (`charWidth`)',
      '--text-animate-split-flap-char-height': 'Controls character height (`charHeight`)',
      '--text-animate-split-flap-radius': 'Controls the border radius of each flap card (`radius`)',
      '--text-animate-split-flap-divider-color':
        'Controls the color of the horizontal divider line (`dividerColor`)',
    },
  },
};
