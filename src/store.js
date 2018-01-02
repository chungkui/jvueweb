import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    TOOKEN:'',
    userinfo:null,
    p_menu_list:[],
    selectMenuId:'',
    pselectedId:''
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
    },
    setSelectMenuId(state,selectId){
      state.selectMenuId=selectId;
    },
    setPselectedId(state,selectId){
      state.pselectedId=selectId;
    }
  },
  actions: {
    setuserinfoact (context,userinfo) {
      context.commit('setuserinfo',userinfo)
    }
  }
})
