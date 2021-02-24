import { createVuePlugin } from 'vite-plugin-vue2'

/**
 * @type {import('vite').UserConfig}
 */
// build the engine
export default ({ command }) => {
    const config = {
        plugins: [createVuePlugin()]
    }
    if (command == 'build') {
        const buildOptions = {
            build: {
                target: 'modules',
                outDir: './dist/',
                assetDist: './resources/',
                lib: {
                    name: 'unrail-engine',
                    entry: './src/index.ts',
                    formats: ['es']
                },
                minify: 'terser'
            }
        }
        return { ...config, ...buildOptions }
    }
    return config
}