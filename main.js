import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

import * as filters from './common/filters/index.js'

Object.keys(filters).forEach(item=>{
	Vue.filter(item, filters[item])
})

const app = new Vue({
    ...App
})
app.$mount()
