import { readFileSync } from 'node:fs';
import path from 'node:path';
import nodeExternals from 'rollup-plugin-node-externals';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import banner from 'rollup-plugin-banner2';
import { createGenerateScopedName } from 'hash-css-selector';

const outputDir = path.join(process.cwd(), './package/dist');

// hash-css-selector hashes only `<file>-<class>` and prepends the prefix, so with one prefix for the
// whole fleet two packages with the same module and class emit the same selector: the root of
// `Spinner.module.css` was `.me_50fcac36` in both mantine-spinner and mantine-text-animate, and
// whichever stylesheet loaded last won. The package's own name gives each package its namespace.
const { name } = JSON.parse(readFileSync(path.join(process.cwd(), 'package/package.json'), 'utf8'));
const cssPrefix = `me-${name.split('/').pop().replace(/^mantine-/, '')}`;

export default {
  input: path.join(process.cwd(), './package/src/index.ts'),
  output: [
    {
      format: 'es',
      entryFileNames: '[name].mjs',
      dir: path.join(outputDir, 'esm'),
      preserveModules: true,
      sourcemap: true,
    },
    {
      format: 'cjs',
      entryFileNames: '[name].cjs',
      dir: path.join(outputDir, 'cjs'),
      preserveModules: true,
      sourcemap: true,
    },
  ],
  plugins: [
    nodeExternals({
      packagePath: path.join(process.cwd(), 'package/package.json'),
    }),
    nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
    esbuild({
      sourceMap: false,
      tsconfig: path.resolve(process.cwd(), 'tsconfig.build.json'),
    }),
    replace({ preventAssignment: true }),
    postcss({
      extract: true,
      modules: { generateScopedName: createGenerateScopedName(cssPrefix) },
      minimize: true,
    }),
    banner((chunk) => {
      if (chunk.fileName !== 'index.js' && chunk.fileName !== 'index.mjs') {
        return "'use client';\n";
      }

      return undefined;
    }),
  ],
};
