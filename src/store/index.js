import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http-common";
import jwtDecode from "jwt-decode";
import persistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
    userInfo: null,
    sido_pick: null,
  },
  getters: {
    accessToken(state) {
      return state.accessToken;
    },
    refreshToken(state) {
      return state.refreshToken;
    },
    userInfo(state) {
      return state.userInfo;
    },
    pickedSido(state) {
      return state.sido_pick;
    },
  },
  mutations: {
    TOKEN(state, payload) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    USER_INFO(state, payload) {
      state.userInfo = payload.userInfo;
    },
    LOGOUT(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.userInfo = null;
    },
    SIDOPICK(state, payload) {
      state.sido_pick = payload.sido_pick;
    },
  },
  actions: {
    userLogin({ commit }, payload) {
      http
        .post(`/user/login`, payload)
        .then(({ status, data }) => {
          if (status == 200) {
            commit("TOKEN", {
              accessToken: data["access-token"],
              refreshToken: data["refresh-token"],
            });
          } else {
            console.log(status, data);
          }
          payload.callback(status);
        })
        .catch((response) => {
          payload.callback(response.status);
        });
    },
    getUserInfo({ commit }, payload) {
      const decodeToken = jwtDecode(payload.accessToken);
      const config = {
        headers: {
          "access-token": payload.accessToken,
        },
      };
      http
        .get(`/user/info/${decodeToken.userid}`, config)
        .then(({ status, data }) => {
          if (status == 200) {
            console.log(data);
            commit("USER_INFO", {
              userInfo: data.userInfo,
            });
          }
          payload.callback(status);
        })
        .catch((error) => {
          payload.callback(error.response.status);
        });
    },
    userSignUp(context, payload) {
      console.log(payload);
      http
        .post(`/user/signup`, payload)
        .then(({ data, status }) => {
          console.log("응답: ", data, status);
          payload.callback(status);
        })
        .catch(({ response }) => {
          console.log(response);
          payload.callback(response.status);
        });
    },
    userLogout({ commit }) {
      commit("LOGOUT");
    },
    updateSidoPick({ commit }, value) {
      commit("SIDOPICK", value);
    },
  },
  modules: {},
  plugins: [
    persistedState({
      storage: sessionStorage,
    }),
  ],
});
