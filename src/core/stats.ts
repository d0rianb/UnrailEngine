import Stats from 'stats.js'

function showStats(): Stats {
    const stats: Stats = new Stats()
    const el: HTMLDivElement = document.createElement('div')
    el.classList.toggle('stats')
    stats.showPanel(0)
    el.appendChild(stats.dom)
    document.body.appendChild(el)
    return stats
}


export { showStats, Stats }
