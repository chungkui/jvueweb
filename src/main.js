import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import Vuex from 'vuex'
import router from './router'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable, VPagination} from 'vue-easytable'

Vue.use(VueResource)
Vue.use(Vuex)
/*解决跨域问题*/
Vue.http.options.credentials = true;
// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false

const store = new Vuex.Store({
  state:{
    TOOKEN:''
  },
  mutations:{
    changeLoginInfo(state,JSESSIONID){

      state.TOOKEN= JSESSIONID;
    }
  }
})
/*设置拦截器*/
Vue.http.interceptors.push((request, next)  =>{

  next((response) => {
    var state=response.body.state;
    if(state===300){
      /*需要进行重新登陆*/
      store.commit('changeLoginInfo',null);
    }
    if(state===400){
      /*需要进行重新登陆*/
       console.log(response.body.message);
    }
    return response;
  });
});
new Vue({
  el: '#app',
  store,
  router,
  computed: {
    TOOKEN () {
      return this.$store.state.TOOKEN
    }
  },
  template: '<App/>',
  components: {App},
  watch:{
    TOOKEN:function (TOOKEN) {
      if(TOOKEN===null||TOOKEN===''){
        /*进行注销操作*/
         this.$router.push("/login");
      }else{
        this.$router.push("/");
      }
    }
  }
})
