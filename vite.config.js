import * as path from 'path'
import visualizer from 'rollup-plugin-visualizer'

/**
 * @type {import('vite').UserConfig}
 */
export default ({ command }) => {
    const config = {
        root: '.',
        plugins: [],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
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