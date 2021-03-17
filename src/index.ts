import { version } from '../package.json'

export { Game } from './core/game'
export * from './core/math'
export { Env as GameEnvironement } from './core/env'
export { GameObject, PlayerObject } from './core/objects'
export { getWindowDimensions, createCanvas } from './core/geometry'
export { Particle, ParticuleGenerator } from './core/particles'

export const VERSION = version