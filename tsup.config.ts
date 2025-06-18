import { defineConfig } from "tsup"

export default defineConfig({
    entry: ['./src/cli/index.ts'],
    splitting: false,
    sourcemap: true,
    format: ['esm'],
    clean: true,
    minify: true,
    target: 'es2022',
    outDir: './dist'
})