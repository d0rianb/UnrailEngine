import * as path from 'path'
import * as fs from 'fs'

import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import json from 'rollup-plugin-json'
import commonjs from '@rollup/plugin-commonjs'

import * as tsconfig from './tsconfig.json'


const customAlias = {}
Object.entries(tsconfig.default.compilerOptions.paths).forEach(([key, value]) => customAlias[key.replace('/*', '')] = path.resolve(__dirname, value[0].replace('*', '')))

const name = 'unrail-engine'

/* Build the examples */
const examples = []

for (let example of fs.readdirSync(path.resolve(__dirname, 'examples'))) {
    const tsFile = fs.readdirSync(path.resolve(__dirname, 'examples', example)).find(file => path.extname(file) === '.ts')
    examples.push({
        input: `./examples/${example}/${tsFile}`,
        output: {
            file: `./examples/${example}/${tsFile.replace('ts', 'js')}`,
            format: 'es'
        },
        plugins: [
            alias(customAlias),
            esbuild(),
            commonjs(),
            json()
        ],
        external: [],
    })
}


const bundle = config => ({
    ...config,
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
    /* Build the types */
    bundle({
        input: 'src/index.ts',
        output: {
            file: `./dist/${name}.d.ts`,
            format: 'es',
        },
        plugins: [dts()],
    }),
    ...examples
]