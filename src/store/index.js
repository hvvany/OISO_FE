import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http-common";
import persistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    userLogin(context, payload) {
      console.log(payload);
      http
        .post(`/user/login`, payload)
        .then(({ data, status }) => {
          console.log("응답: ", data, status);
          payload.callback(status);
        })
        .catch(({ response }) => {
          payload.callback(response.status);
        });
    },
  },
  modules: {},
  plugins: [
    persistedState({
      storage: sessionStorage,
    }),
  ],
});
