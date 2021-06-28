import Vue from "vue";
import Vuex from "vuex";
import feed from "@/views/feed/store";
import admin from "@/views/admin/store";
import user from "@/views/user/store";
import categories from "@/views/categories/store";
import axios from "axios";
import { api } from "@/api.js";
import { storageName } from "@/global.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedUser: null,
  },
  getters: {
    acessToken: (state) => state.acessToken,
  },
  mutations: {
    insertToken(state, payload) {
      state.acessToken = payload;
    },
    loadLogged(state, payload) {
      state.loggedUser = payload;
      if (payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${payload.token}`;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }
    },
  },
  actions: {
    async login({ commit }, body) {
      const data = await api.post("signin", body);
      commit("insertToken", data.data.token);
      commit("loadLogged", data.data);
      localStorage.setItem(storageName, JSON.stringify(data.data));
    },
    async create({ commit }, body) {
      await api.post("signup", body);
      commit("loadLogged", null);
    },
    getLogged() {
      api.get();
    },
  },
  modules: {
    feed,
    admin,
    user,
    categories
  },
});
