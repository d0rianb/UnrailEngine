import Stats from 'stats.js'

function getStats(): void {
    const el: HTMLDivElement = document.createElement('div').classList.toggle('stats')
    const stats: Stats = new Stats()
    stats.showPanel(0)
    el.appendChild(stats.dom)
}


export { getStats }
