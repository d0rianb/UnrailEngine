import * as path from 'path'

import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'
import json from 'rollup-plugin-json'
import commonjs from '@rollup/plugin-commonjs'

const name = 'unrail-engine'

const bundle = config => ({
    ...config,
    input: 'src/index.ts',
    plugins: [
        alias({ '@': path.resolve(__dirname, './src') }),
        commonjs(),
        json(),
        ...config.plugins
    ],
    external: [],
})

// Export bundled types
export default [
    bundle({
        output: {
            file: `./dist/${name}.d.ts`,
            format: 'es',
        },
        plugins: [dts()],
    }),
]