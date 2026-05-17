import { generateDeclarations } from 'mantine-docgen-script';
import path from 'path';

const getComponentPath = (componentPath: string) =>
  path.join(process.cwd(), 'package/src', componentPath);

generateDeclarations({
  componentsPaths: [
    getComponentPath('Gradient/Gradient.tsx'),
    getComponentPath('Highlight/Highlight.tsx'),
    getComponentPath('Morphing/Morphing.tsx'),
    getComponentPath('NumberTicker/NumberTicker.tsx'),
    getComponentPath('RotatingText/RotatingText.tsx'),
    getComponentPath('Spinner/Spinner.tsx'),
    getComponentPath('SplitFlap/SplitFlap.tsx'),
    getComponentPath('TextTicker/TextTicker.tsx'),
    getComponentPath('Typewriter/Typewriter.tsx'),
    getComponentPath('TextAnimate.tsx'),
  ],
  tsConfigPath: path.join(process.cwd(), 'tsconfig.json'),
  outputPath: path.join(process.cwd(), 'docs'),
});
