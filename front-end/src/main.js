// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import moment from 'moment'

// 使用ElementUI
Vue.use(ElementUI);
Vue.config.productionTip = false;

// 过滤器，将时间转为相应格式
Vue.filter("dateFormat",(date)=>{
  return moment(Number(date)).format("YYYY-MM-DD HH:mm:ss");
})
Vue.prototype.$moment = function(date){
  return moment(date).valueOf();
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
