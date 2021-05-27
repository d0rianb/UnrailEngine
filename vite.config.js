import * as path from 'path'
import visualizer from 'rollup-plugin-visualizer'

import * as tsconfig from './tsconfig.json'

const customAlias = {}
Object.entries(tsconfig.default.compilerOptions.paths).forEach(([key, value]) => customAlias[key.replace('/*', '')] = path.resolve(__dirname, value[0].replace('*', '')))

/**
 * @type {import('vite').UserConfig}
 */
export default ({ command }) => {
    const config = {
        root: '.',
        plugins: [],
        resolve: {
            alias: customAlias
        }
    }
    if (command == 'build') {
        const buildOptions = {
            build: {
                target: 'modules',
                outDir: './dist',
                assetDist: './resources',
                lib: {
                    name: 'unrail-engine',
                    entry: './src/index.ts',
                    formats: ['es', 'umd']
                },
                minify: 'terser',
                rollupOptions: {
                    manualChunks: {},
                    plugins: [
                        visualizer({
                            filename: './dist/stats/treemap.html',
                            template: 'treemap', // sunburst|treemap|network
                            sourcemap: false
                        })
                    ]
                }
            }
        }
        return { ...config, ...buildOptions }
    }
    return config
}