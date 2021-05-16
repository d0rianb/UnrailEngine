import { resolve } from 'path'
import visualizer from 'rollup-plugin-visualizer'


/**
 * @type {import('vite').UserConfig}
 */
// build the engine
export default ({ command }) => {
    const config = {
        root: resolve(__dirname, '.'),
        plugins: [],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            }
        }
    }
    if (command == 'build') {
        const buildOptions = {
            build: {
                target: 'modules',
                outDir: resolve(__dirname, 'dist'),
                assetDist: resolve(__dirname, 'resources'),
                lib: {
                    name: 'unrail-engine',
                    entry: resolve(__dirname, 'src/index.ts'),
                    formats: ['es', 'umd']
                },
                minify: 'terser',
                sourcemap: true,
                rollupOptions: {
                    plugins: [
                        visualizer({
                            filename: resolve(__dirname, 'dist/stats/treemap.html'),
                            template: 'treemap', // sunburst|treemap|network
                            sourcemap: true
                        })
                    ]
                }
            }
        }
        return { ...config, ...buildOptions }
    }
    return config
}