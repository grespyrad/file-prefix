// build.js
require('esbuild').build({
    entryPoints: ['main.ts'],
    bundle: true,
    outfile: 'main.js',
    platform: 'browser',
    target: 'es2020',
    format: 'cjs',
    external: ['obsidian'],
  }).catch(() => process.exit(1));