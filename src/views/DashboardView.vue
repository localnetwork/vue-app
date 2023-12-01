<template>
  <div v-if="isAuthenticated == true">
    <h1 class="text-[20px] font-medium text-gray-900">
      Howdy, {{ userProfile.first_name }} {{ userProfile.last_name }}
    </h1>

    <p
      class="flex items-center text-sm mt-[15px] text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out"
    >
      Welcome to the dashboard. Use the links in the sidebar to manage the
      contents.
    </p>
  </div>

  <div v-else>
    <div class="max-w-[150px] w-full h-[20px] bg-slate-200 rounded"></div>
    <div
      class="mt-[15px] max-w-[500px] w-full h-[15px] bg-slate-200 rounded"
    ></div>
  </div>
</template>

<script>
import store from "../interceptors/store";
export default {
  computed: {
    isUserRoles() {
      return this.$store.state.isUserRoles;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  created() {
    this.getUserData();
  },
  data() {
    return {
      userInfo: [],
      userProfile: [],
    };
  },
  methods: {
    getUserData() {
      this.userInfo = store.state.isUserInfo;
      this.userProfile = store.state.isUserProfile;
    },
  },
};
</script>
