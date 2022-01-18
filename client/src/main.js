// very standard vuejs - not using router or vuex or anything because
// i will not need it for the single page i am building
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
