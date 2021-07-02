interface SoundOptions {
    volume?: number
    loop?: boolean
    autoplay?: boolean
}

const defaultAudioOptions: SoundOptions = {
    volume: 1,
    loop: false,
    autoplay: false
}

/* A wrapper for the default Audio API */
class Sound extends Audio {
    constructor(src: string, options: SoundOptions = {}) {
        super(src)
        this.volume = options.volume || defaultAudioOptions.volume
        this.loop = options.loop || defaultAudioOptions.loop
        this.controls = false
    }
}

export default Sound
export { Sound }