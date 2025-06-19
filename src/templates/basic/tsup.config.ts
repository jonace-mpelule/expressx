import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["src/app.ts"],
    format: ["esm"],
    dts: true,
    target: "es2022",
    splitting: true,
    clean: true,
    minify: true,
    treeshake: true,

})