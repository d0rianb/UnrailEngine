/**
 * @type {import('vite').UserConfig}
 */
// build the engine
export default ({ command }) => {
    const config = {
        plugins: []
    }
    if (command == 'build') {
        const buildOptions = {
            build: {
                target: 'modules',
                outDir: './dist/',
                assetDist: './resources/',
                lib: {
                    name: 'unrail-engine',
                    entry: 'src/index.ts',
                    formats: ['es', 'umd']
                },
                minify: 'terser'
            }
        }
        return { ...config, ...buildOptions }
    }
    return config
}