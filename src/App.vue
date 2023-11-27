<script>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import store from "./interceptors/store";

export default {
  components: {
    Header,
    Sidebar,
  },
  computed: {
    isUserRoles() {
      return this.$store.state.isUserRoles;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
};
</script>

<template>
  <Header />
  <div
    :class="
      isAuthenticated == true
        ? 'container py-[50px] mx-auto w-full flex flex-wrap w-full'
        : 'container py-[50px] mx-auto w-full flex flex-wrap w-full min-h-screen items-center'
    "
  >
    <div
      class="max-w-[25%] px-[15px] w-full flex justify-start flex-col"
      v-if="this.$store.state.isAuthenticated == true"
    >
      <Sidebar />
    </div>
    <div
      :class="
        this.$store.state.isAuthenticated == false
          ? 'w-full '
          : 'w-full px-[15px] max-w-[75%]'
      "
    >
      <div
        :class="
          this.$store.state.isAuthenticated == true
            ? 'bg-white h-full p-6 bg-white border-b border-gray-200 overflow-hidden shadow-sm sm:rounded-lg'
            : ''
        "
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>
