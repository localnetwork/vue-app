<template>
  <div class="about">
    <h1>Dashboard</h1>
    {{ isAuthenticated }}
  </div>
</template>

<script>
export default {
  computed: {
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
