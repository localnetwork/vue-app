<template>
  <div class="about">
    {{ isAuthenticated }}
    <h1>Dashboard</h1>
    {{ isUserRoles }}
  </div>
</template>

<script>
export default {
  computed: {
    isUserRoles() {
      return this.$store.state.isUserRoles;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
