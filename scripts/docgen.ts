import path from 'path';
import { generateDeclarations } from 'mantine-docgen-script';

const getComponentPath = (componentPath: string) =>
  path.join(process.cwd(), 'package/src', componentPath);

generateDeclarations({
  componentsPaths: [
    getComponentPath('NumberTicker/NumberTicker.tsx'),
    getComponentPath('Spinner/Spinner.tsx'),
    getComponentPath('TextTicker/TextTicker.tsx'),
    getComponentPath('Typewriter/Typewriter.tsx'),
    getComponentPath('TextAnimate.tsx'),
  ],
  tsConfigPath: path.join(process.cwd(), 'tsconfig.json'),
  outputPath: path.join(process.cwd(), 'docs'),
});
