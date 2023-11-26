<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
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
        Go Back
      </button>
    </div>
  </div>
</template>
<script>
import router from "../router";
export default {
  setup() {
    router.push("/dashboard");
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
