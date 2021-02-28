import Stats from 'stats.js'

const stats: Stats = new Stats()

function showStats(): void {
    const el: HTMLDivElement = document.createElement('div')
    el.classList.toggle('stats')
    stats.showPanel(0)
    el.appendChild(stats.dom)
    document.body.appendChild(el)
}


export { stats, showStats }
