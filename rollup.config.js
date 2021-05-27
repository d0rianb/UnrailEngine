import * as path from 'path'

import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'
import json from 'rollup-plugin-json'
import commonjs from '@rollup/plugin-commonjs'

import * as tsconfig from './tsconfig.json'


const customAlias = {}
Object.entries(tsconfig.default.compilerOptions.paths).forEach(([key, value]) => customAlias[key.replace('/*', '')] = path.resolve(__dirname, value[0].replace('*', '')))

const name = 'unrail-engine'

const bundle = config => ({
    ...config,
    input: 'src/index.ts',
    plugins: [
        alias(customAlias),
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