import Vue from 'vue'

import { blink } from '../core/utils'

const _vue = new Vue({
    data() {
        return {}
    },
    methods: {}
})
window.onload = () => _vue.$mount('#app')


class Interface {
    // TODO: properly define options as CSS properties
    static addItem(callback: Function, options: any): void {

    }

}

export { Interface }
