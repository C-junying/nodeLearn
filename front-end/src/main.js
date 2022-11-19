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
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
})

// 日期转为字符串 日期格式：2019/12/01 12:30:15
Vue.prototype.$strFormat = function(date){
  return date.toLocaleString().replace(/\//g,"-");
};
// 字符串转为日期 字符串格式：2019-12-01 12:30:15
Vue.prototype.$dateFormat = function(str){
  str = str.replace(/-/g,"/");
  var date = new Date(str);
  return date.toLocaleString().replace(/\//g,"-");
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
