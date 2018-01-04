import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'

// 导入 table 和 分页组件
import {VTable, VPagination} from 'vue-easytable'
import store from './store'
import HelloWorld from './components/HelloWorld.vue';
/*import VeeValidate from 'vee-validate';*/
import 'element-ui/lib/theme-chalk/index.css';
import {Dialog,Form,Button,FormItem,Input,Select,Option,Radio,RadioGroup  ,Table, TableColumn ,Container,Header,Footer,Main,Aside} from 'element-ui';
Vue.use(Dialog);
Vue.use(Form);
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Table);
Vue.use(TableColumn);

Vue.use(Container);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Main);
Vue.use(Aside);

/*Vue.use(VeeValidate);*/
Vue.use(VueResource)
/*解决跨域问题*/
Vue.http.options.credentials = true;
// 注册到全局
Vue.component(VTable.name, VTable)

Vue.component(VPagination.name, VPagination)

Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false
/*设置拦截器*/
Vue.http.interceptors.push((request, next) => {

  next((response) => {
    var state = response.body.state;
    if (state === 300) {
      /*需要进行重新登陆*/
      store.commit('changeLoginInfo', null);
    }
    if (state === 400) {
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
    TOOKEN() {
      return this.$store.state.TOOKEN
    }
  },
  template: '<App/>',
  components: {App},
  watch: {
    TOOKEN: function (TOOKEN) {
      if (TOOKEN === null || TOOKEN === '') {
        /*进行注销操作*/
        this.$router.push("/login");

      } else if (TOOKEN === 'Refresh') {
        //直接进入主页面刷新
        /*this.getPermissions();*/
      } else {//由登陆进来时的加载菜单

        this.$router.push("/");
        this.getPermissions();
      }
    }
  },
  created: function () {
    this.getPermissions();
  },
  methods: {
    getPermissions: function () {
     let nowpath= this.$router.currentRoute.path;
      if('/login'===nowpath){
        return;
      }
      var ment_list_url = server_host + "upms/permission/list";
      this.$http.get(ment_list_url, {params: {}, credentials: true}).then((response) => {
        let p_menu_list = response.data;
        this.$store.commit('setpmenulist', p_menu_list);
        this.paserPermission2router();
      }).catch((e) => {
        console.log(e)
      });
    },
    paserPermission2router: function () {
      const jvMain = () => ({
        // 需要加载的组件。应当是一个 Promise
        component: import('./components/main.vue'),
        // 加载中应当渲染的组件
        loading: HelloWorld,
        // 出错时渲染的组件
        error: HelloWorld,
        // 渲染加载中组件前的等待时间。默认：200ms。
        delay: 200,
        // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
        timeout: 3000
      });
      let munulist = this.$store.state.p_menu_list;
      let mainComponent = {
        path: '/',
        component: jvMain,
        children: [ {
          path: '',
          name: 'HelloWorld',
          component: HelloWorld
        }]
      };
      if(munulist){
        munulist.forEach((menu) => {
          if (menu.children.length > 0) {

            menu.children.forEach((smenu) => {
              let routeritem = {
                path: smenu.routerUri,
                name: smenu.routerName,
                component: () => ({
                  // 需要加载的组件。应当是一个 Promise
                  component: import('./components/' + smenu.componentPath),
                  // 加载中应当渲染的组件
                  loading: HelloWorld,
                  // 出错时渲染的组件
                  error: HelloWorld,
                  // 渲染加载中组件前的等待时间。默认：200ms。
                  delay: 200,
                  // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
                  timeout: 3000
                }),
                props: true,
                beforeEnter : (to, from, next) => {
                   /*绑定当前路由的menu id*/
                  this.$store.commit("setSelectMenuId",smenu.permissionId);
                  this.$store.commit("setPselectedId",smenu.pid);
                  next();
                }
              };
              mainComponent.children.push(routeritem);
            });
          }
        }) ;
        this.$router.addRoutes([mainComponent]);
      }

    },
    registeComponent:function (menu) {
      menu.children.forEach((smenu) => {
        let routeritem = {
          path: smenu.routerUri,
          name: smenu.routerName,
          component: () => ({
            // 需要加载的组件。应当是一个 Promise
            component: import('./components/' + smenu.componentPath),
            // 加载中应当渲染的组件
            loading: HelloWorld,
            // 出错时渲染的组件
            error: HelloWorld,
            // 渲染加载中组件前的等待时间。默认：200ms。
            delay: 200,
            // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
            timeout: 3000
          }),
          props: true,
          beforeEnter : (to, from, next) => {
            /*绑定当前路由的menu id*/
            this.$store.commit("setSelectMenuId",smenu.permissionId);
            this.$store.commit("setPselectedId",smenu.pid);
            next();
          }
        };
        if(smenu.children.length>0){
          this.registeComponent(smenu);
        }

       /* mainComponent.children.push(routeritem);*/
        return routeritem;
      });

    }
  }
})
