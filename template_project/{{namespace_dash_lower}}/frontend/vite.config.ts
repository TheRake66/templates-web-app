import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import rollupYaml from '@rollup/plugin-yaml';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path'

const yaml = rollupYaml as unknown as () => any;
const find = (path: string): string => resolve(import.meta.dirname, path);
const padd = (int: number, char: string): string => String(int).padStart(2, '0') + char;

const now = new Date();
const dateTime =
  now.getFullYear() + '-' +
  padd(now.getMonth() + 1, '-') +
  padd(now.getDate(), '_') +
  padd(now.getHours(), 'h') +
  padd(now.getMinutes(), 'm') +
  padd(now.getSeconds(), 's');

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr(), 
    yaml(),
    babel({ presets: [ reactCompilerPreset() ] })
  ],
  root: find('sources'),
  cacheDir: find('node_modules/.vite'),
  publicDir: find('public'),
  build: {
    outDir: find(`builds/${dateTime}`),
    emptyOutDir: true,
  },
  resolve: { alias: {
    '@': find('sources')
  } },
  css: { preprocessorOptions: { scss: { 
    silenceDeprecations: [ 'import' ]
  } } }
})
