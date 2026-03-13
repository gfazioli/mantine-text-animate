import { GradientStylesApi } from './Gradient.styles-api';
import { HighlightStylesApi } from './Highlight.styles-api';
import { MorphingStylesApi } from './Morphing.styles-api';
import { NumberTickerStylesApi } from './NumberTicker.styles-api';
import { RotatingTextStylesApi } from './RotatingText.styles-api';
import { SpinnerStylesApi } from './Spinner.styles-api';
import { SplitFlapStylesApi } from './SplitFlap.styles-api';
import { TextAnimateStylesApi } from './TextAnimate.styles-api';
import { TextTickerStylesApi } from './TextTicker.styles-api';
import { TypewriterStylesApi } from './Typewriter.styles-api';

export const STYLES_API_DATA = {
  TextAnimate: TextAnimateStylesApi,
  Typewriter: TypewriterStylesApi,
  Spinner: SpinnerStylesApi,
  NumberTicker: NumberTickerStylesApi,
  TextTicker: TextTickerStylesApi,
  Gradient: GradientStylesApi,
  Highlight: HighlightStylesApi,
  SplitFlap: SplitFlapStylesApi,
  Morphing: MorphingStylesApi,
  RotatingText: RotatingTextStylesApi,
};
