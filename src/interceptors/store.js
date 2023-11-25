import { createStore } from "vuex";

export default createStore({
  state: {
    authenticated: false,
    // other state properties...
  },
  mutations: {
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    login({ commit }) {
      commit("setAuthentication", true);
    },
    logout({ commit }) {
      commit("setAuthentication", false);
    },
  },
});
