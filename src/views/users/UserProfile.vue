<template>
  <h1>User Profile</h1>

  {{ profile.first_name }}
</template>
<script>
import axios from "axios";
import router from "../../router";
export default {
  data() {
    return {
      profile: [],
    };
  },
  created() {
    // this.profile;
    this.getUserProfileInfo();
    // console.log(router.currentRoute._rawValue.params.userId);
  },
  methods: {
    async getUserProfileInfo() {
      const id = router.currentRoute._rawValue.params.userId;
      const data = new FormData();
      data.append("method", `getUserById`);
      data.append("userId", id);
      try {
        const response = axios.post(
          `${import.meta.env.VITE_APP_URL}/handler/router.php`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.profile = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  props: {},
};
</script>
