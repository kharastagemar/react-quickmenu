import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import image from "@rollup/plugin-image";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";

export default [
  {
    input: {
      index: "src/index.ts"
    },
    output: {
      dir: "dist",
      format: "cjs",
      name: "react-quickmenu"
    },
    global: {
      external: ["classnames"]
    },
    plugins: [
      image(),
      terser(),
      postcss(),
      typescript({
        exclude: "**/__tests__/**",
        clean: true
      }),
      json()
    ]
  }
];
