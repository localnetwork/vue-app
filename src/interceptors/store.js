import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    authenticated: false,
    userRoles: null,
  },
  mutations: {
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setRoles(state, isUserRoles) {
      state.isUserRoles = isUserRoles;
    },
    setUserInfo(state, isUserInfo) {
      state.isUserInfo = isUserInfo;
    },
  },
  actions: {
    userInfo() {
      commit("setUserInfo", []);
    },
    login({ commit }) {
      commit("setAuthentication", true);
    },
    logout({ commit }) {
      commit("setAuthentication", false);
    },
    currentUserRoles({ commit }) {
      commit("setUserRoles", true);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    userRoles: (state) => state.userRoles,
  },
});
