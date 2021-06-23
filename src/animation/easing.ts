type EasingFunction = (t: number) => number

const Easing = {
    linear: t => t,
    smoothStep: t => (3 - 2 * t) * t ** 2,
    smootherStep: t => (6 * t * t - 15 * t + 10) * t ** 3,
    easeIn: t => t ** 2,
    easeOut: t => 1 - (1 - t) ** 2,
    easeInOut: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    easeInBack: t => 2.70158 * t ** 3 - 1.70158 * t ** 2,
    easeOutBack: t => 1 + 1.70158 * Math.pow(t - 1, 3) + 2.70158 * Math.pow(t - 1, 2),
    easeInOutBack: t => t < 0.5 ? (Math.pow(2 * t, 2) * ((2.5949095 + 1) * 2 * t - 2.5949095)) / 2 : (Math.pow(2 * t - 2, 2) * ((2.5949095 + 1) * (t * 2 - 2) + 2.5949095) + 2) / 2
}

// Type for using string as easing functions name
const easingName: Array<string> = Object.keys(Easing)
type EasingFunctionName = typeof easingName[number]

export { Easing, EasingFunction, EasingFunctionName }