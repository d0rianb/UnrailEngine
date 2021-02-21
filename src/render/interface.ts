import Vue from 'vue'

import { blink } from '../core/utils'

const _vue = new Vue({
    el: '#app',
    data() {
        return {}
    },
    methods: {}
})


class Interface {
    // TODO: properly define options as CSS properties
    static addItem(callback: Function, options: any): void {

    }

}

export { Interface }
