<template>
  <div v-if="isUserRoles && isAuthenticated == true && isLoading == false">
    <h1 class="text-[30px] mb-[15px] font-medium text-gray-900">
      User Profile
    </h1>
    <div class="text-[17px] font-medium text-gray-900 mb-[10px]">
      Role:
      <span>{{ profile.role_name }}</span>
    </div>
    <div class="text-[17px] font-medium text-gray-900 mb-[10px]">
      First Name:
      <span>{{ profile.first_name }}</span>
    </div>
    <div class="text-[17px] font-medium text-gray-900 mb-[10px]">
      Last Name:
      <span>{{ profile.last_name }}</span>
    </div>
    <div class="text-[17px] font-medium text-gray-900 mb-[10px]">
      Address:
      <span>{{ profile.address }}</span>
    </div>
    <div class="text-[17px] font-medium text-gray-900 mb-[10px]">
      Email:
      <span
        ><a :href="`mailto:${profile.email}`">{{ profile.email }}</a></span
      >
    </div>
    <div class="text-[17px] font-medium text-gray-900 mb-[10px]">
      Birthday:
      <span>{{ profile.birthday }}</span>
    </div>
  </div>

  <div class="skeleton animate-pulse" v-else>
    <div class="max-w-[200px] w-full h-[30px] bg-slate-200 rounded"></div>
    <div
      class="mt-[20px] max-w-[150px] w-full h-[15px] bg-slate-200 rounded"
    ></div>
    <div
      class="mt-[20px] max-w-[150px] w-full h-[15px] bg-slate-200 rounded"
    ></div>
    <div
      class="mt-[20px] max-w-[150px] w-full h-[15px] bg-slate-200 rounded"
    ></div>
    <div
      class="mt-[20px] max-w-[350px] w-full h-[15px] bg-slate-200 rounded"
    ></div>
    <div
      class="mt-[20px] max-w-[130px] w-full h-[15px] bg-slate-200 rounded"
    ></div>
  </div>
</template>
<script>
import axios from "axios";
import router from "../../router";
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
    return {
      isLoading: true,
      profile: [],
      errors: [],
      responseMessage: "",
    };
  },
  created() {
    this.getUserProfileInfo();
  },
  methods: {
    async getUserProfileInfo() {
      const id = router.currentRoute._rawValue.params.userId;
      const data = new FormData();
      data.append("method", `getUserProfile`);
      data.append("userId", id);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/handler/router.php`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.profile = response.data.data;
        if (response.status === 200) {
          setTimeout(() => {
            // Once the data is loaded, set loading to false
            this.isLoading = false;
          }, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    },

    formClear() {
      // Iterate through the keys of this.formData
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key].value = "";
        }
      }

      // Clear any previous errors
      this.errors = {};
      this.responseMessage = "";
    },
  },
  props: {},
};
</script>
