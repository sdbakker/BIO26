import Vue from 'vue'
import App from './App.vue'
import DatGui from '@cyrilf/vue-dat-gui'

Vue.use(DatGui)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
