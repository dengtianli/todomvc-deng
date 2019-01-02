import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import App from './components/App.vue'
new Vue({
  store,
  el,
  render: h => h(App) 
})