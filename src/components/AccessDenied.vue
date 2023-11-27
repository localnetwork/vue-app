<template>
  <div
    v-if="currentRoute !== 'login'"
    class="flex items-center justify-center h-screen bg-gray-100"
  >
    <div class="bg-white p-8 rounded shadow-md">
      <h1 class="text-3xl font-semibold text-gray-800 mb-4">Access Denied</h1>
      <p class="text-gray-600">
        Oops! It seems you don't have permission to access this page.
      </p>
      <p class="text-gray-600">
        Please contact your administrator for assistance.
      </p>
      <button
        @click="goBack"
        class="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Go back to the dashboard
      </button>
    </div>
  </div>
  <div v-else>
    <div class="max-w-[150px] w-full h-[20px] bg-slate-200 rounded"></div>
    <div
      class="mt-[15px] max-w-[500px] w-full h-[15px] bg-slate-200 rounded"
    ></div>
  </div>
</template>
<script>
import router from "../router";
import store from "../interceptors/store";
export default {
  data() {},
  computed: {
    isUserRoles() {
      return this.$store.state.isUserRoles;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  setup() {
    const currentRoute = router.currentRoute._rawValue.name;
    if (router.currentRoute._rawValue.name === "login") {
      router.push("/dashboard");
    }
    return {
      currentRoute,
    };
  },
  methods: {
    goBack() {
      // Implement logic to navigate back
      // You can use router.push('/dashboard') or window.history.back()
      router.push("/dashboard");
    },
  },
};
</script>
