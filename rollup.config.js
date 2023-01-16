import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import nodePolyfills from 'rollup-plugin-polyfill-node';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import babel from 'rollup-plugin-babel'

const config = [
  {
    input: './dist/src/index.js',
    output: {
      file: './vwbl.umd.js',
      format: 'umd',
      name: 'VWBL',
      sourcemap: true
    },
    external: ["aws-sdk"],
    context: "commonjsGlobal",
    treeshake: false,
    plugins: [
      resolve({
        mainFields: [ "browser", "main" ]
      }),
      commonjs(),
      globals(),
      builtins(),
      json(),
      nodePolyfills(),
      babel({
        exclude: 'node_modules/**',
      }),
    ]
  }
]
export default config;

