import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import loading from "./components/pageLoading.vue"
import './plugins/messages.js'
import'./axiosIntercept.js'


Vue.config.productionTip = false;
Vue.component('loading',loading)


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
