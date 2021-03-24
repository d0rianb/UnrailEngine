import { version } from '../package.json'

// Core exports
export * from './core/math'
export { Game } from './core/game'
export { Env as GameEnvironement } from './core/env'
export { GameObject, PlayerObject } from './core/objects'
export { getWindowDimensions, createCanvas } from './core/geometry'
export { Particle, ParticuleGenerator } from './core/particles'
export { Grid, Cell } from './core/grid'


// Modules exports
export * from './events'
export * from './render'
export * from './config'

export const VERSION = version