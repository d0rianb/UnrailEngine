import Stats from 'stats.js'
import { Interface } from '../render'

function showStats(): Stats {
    const stats: Stats = new Stats()
    const el: HTMLDivElement = document.createElement('div')
    el.classList.toggle('stats')
    stats.showPanel(0)
    el.appendChild(stats.dom)
    document.body.appendChild(el)
    Interface.statsShift(48)
    return stats
}


export { showStats, Stats }
