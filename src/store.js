import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    TOOKEN:'',
    userinfo:null,
    p_menu_list:[]
  },
  mutations:{
    changeLoginInfo(state,JSESSIONID){
      state.TOOKEN= JSESSIONID;
    },
    setuserinfo(state,userinfo){
      state.userinfo= userinfo;
    },
    setpmenulist(state,pmenulist){
      state.p_menu_list= pmenulist;
    }
  },
  actions: {
    setuserinfoact (context,userinfo) {
      context.commit('setuserinfo',userinfo)
    }
  }
})
