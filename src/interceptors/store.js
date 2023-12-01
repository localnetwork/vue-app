import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {},
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
    setUserProfile(state, isUserProfile) {
      state.isUserProfile = isUserProfile;
    },
    setUserId(state, isUserId) {
      state.isUserId = isUserId;
    },
  },
  actions: {
    userInfo() {
      commit("setUserInfo", true);
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
    userId() {
      commit("setUserId", true);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    userRoles: (state) => state.userRoles,
    isUserId: (state) => state.isUserId,
    isUserinfo: (state) => state.isUserInfo,
    isUserProfile: (state) => state.isUserProfile,
  },
});
