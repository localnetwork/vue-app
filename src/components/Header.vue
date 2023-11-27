<template>
  <header
    v-if="isAuthenticated === true"
    class="header py-[15px] bg-white mb-[15px]"
  >
    <div class="container px-[15px] flex mx-auto justify-end">
      <div
        class="animate-pulse w-[60px] h-[60px] block rounded-full bg-[#F3F3F3]"
      ></div>
    </div>
  </header>
</template>

<script>
import store from "../interceptors/store";
export default {
  computed: {
    isUserRoles() {
      return this.$store.state.isUserRoles;
    },
    isUserProfile() {
      return this.$store.state.isUserProfile;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  created() {},
  props: {},
  data() {
    return {};
  },
};
</script>
