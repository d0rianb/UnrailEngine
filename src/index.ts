import { version } from '../package.json'

// Core exports
export * from './core/math'
export * from './core/geometry'
export * from './helpers/utils'
export { Game } from './core/game'
export { Env as GameEnvironement } from './core/env'
export { GameObject, PlayerObject } from './core/objects'
export { Particle, ParticuleGenerator } from './core/particles'
export { Grid, Cell } from './core/grid'


// Modules exports
export * from './events'
export * from './render'
export * from './config'
export * from './animation'
export * from './audio/sound'

export const VERSION: string = version

console.log('Unrail Engine v' + version.toString())
