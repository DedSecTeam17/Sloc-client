import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles

import 'material-icons/iconfont/material-icons.css';

Vue.config.productionTip = false


Vue.use(Vuesax, {
    theme: {
        colors: {
            primary: '#00B8D4',
            success: '#00B8D4',
            danger: 'rgb(242, 19, 93)',
            warning: 'rgb(255, 130, 0)',
            dark: 'rgb(36, 33, 69)'
        }
    }
})


new Vue({
    render: h => h(App),
}).$mount('#app')
