import Stats from 'stats.js'

function getStats(): void {
    const el: HTMLDivElement = document.createElement('div')
    const stats: Stats = new Stats()
    el.classList.toggle('stats')
    stats.showPanel(0)
    el.appendChild(stats.dom)
}


export { getStats }
