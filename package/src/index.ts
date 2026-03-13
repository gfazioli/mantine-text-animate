export { TextAnimate } from './TextAnimate';
export type {
  TextAnimateAnimationDirection,
  TextAnimateAnimationType,
  TextAnimateAnimationVariant,
  TextAnimateBaseProps,
  TextAnimateCssVariables,
  TextAnimateDirection,
  TextAnimateFactory,
  TextAnimateIn,
  TextAnimateOut,
  TextAnimateProps,
  TextAnimateStylesNames,
  TextAnimateTrigger,
  TextAnimateTriggerOptions,
} from './TextAnimate';

export type { GradientFactory, GradientProps } from './Gradient/Gradient';
export type { HighlightFactory, HighlightProps } from './Highlight/Highlight';
export type { MorphingFactory, MorphingProps } from './Morphing/Morphing';
export type { NumberTickerFactory, NumberTickerProps } from './NumberTicker/NumberTicker';
export type { RotatingTextFactory, RotatingTextProps } from './RotatingText/RotatingText';
export type { SpinnerFactory, SpinnerProps } from './Spinner/Spinner';
export type { SplitFlapFactory, SplitFlapProps } from './SplitFlap/SplitFlap';
export type { TextTickerFactory, TextTickerProps } from './TextTicker/TextTicker';
export type { TypewriterFactory, TypewriterProps } from './Typewriter/Typewriter';

export { useMorphing } from './Morphing/use-morphing';
export { useRotatingText } from './RotatingText/use-rotating-text';
export { useNumberTicker, type NumberTickerEasing } from './NumberTicker/use-number-ticker';
export { useSplitFlap } from './SplitFlap/use-split-flap';
export { useTextAnimate, type UseTextAnimateResult } from './use-text-animate';
export { useTextTicker } from './TextTicker/use-text-ticker';
export { useTypewriter } from './Typewriter/use-typewriter';
