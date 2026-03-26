import { build } from 'esbuild';
import { glob } from 'glob';

const files = await glob('build/**/*.js', {
    ignore: ['build/**/*.d.js', 'build/**/*.map', 'build/**/*.d.ts']
});

await build({
    entryPoints: files,
    outdir: 'bundle',
    outbase: 'build',       // preserves src folder structure
    bundle: false,          // no merging
    platform: 'node',
    format: 'esm',
    target: 'esnext',
    minify: true,
    // sourcemap: true,     // required only if 'bundle: true'
    // external: [          // array of packages to skip, only required when 'bundle: true'
    //     'bcrypt',
    //     'mysql2',
    //     'redis',
    //     '@ai-sdk/amazon-bedrock',
    //     'ai',
    // ],
});