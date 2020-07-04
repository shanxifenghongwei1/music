import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import uView from "uview-ui";
Vue.use(uView);
import store from '@/store';
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore); 

Vue.prototype.conss = (e, f) => {
  console.log('================================================================')
  console.log('这是描述：' + f ? f : '没写而已')
  console.log(e)
  console.log('================================================================')
}
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
