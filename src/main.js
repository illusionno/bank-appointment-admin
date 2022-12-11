import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
// import '@/permission' // permission control
// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm; //MessageBox是ElementUI里的一个组件

import moment from 'moment'
Vue.prototype.$moment = moment;

import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
// 图表自适应
Vue.prototype.$resize = (el) => {
  window.addEventListener('resize', () => {
    el.resize()
  })
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

