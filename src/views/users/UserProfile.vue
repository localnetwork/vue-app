<template>
  <h1>User Profile</h1>

  {{ profile.first_name }}
  <form id="login-form" @submit.prevent="login" class="">
    <div v-for="(field, key) in formData" :key="key" class="mb-4">
      <label
        :for="field.id"
        class="block text-gray-700 text-sm font-bold mb-2"
        >{{ field.label }}</label
      >

      <input
        v-if="field.fieldType == 'input'"
        :id="field.id"
        v-model="field.value"
        :type="field.type"
        :class="{ '!border-red-500': errors[key] }"
        class="flex px-[10px] w-full rounded-md border border-gray-300 min-h-[40px] shadow-sm block w-fullfocus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed rounded-md"
      />
      <span v-if="errors[key]" class="text-red-500 text-xs">{{
        errors[key]
      }}</span>
    </div>

    <button
      type="submit"
      class="border rounded-md shadow-sm font-bold py-2 px-4 focus:outline-none focus:ring focus:ring-opacity-50 border min-w-[250px] rounded-md shadow-sm font-bold py-2 focus:outline-none focus:ring focus:ring-opacity-50 w-full mt-[15px] max-w-[300px] text-center block justify-between items-center bg-[#00b14f] !rounded-[50px] font-semibold text-[20px] text-white !p-[12px] inline-block"
    >
      Update
    </button>
  </form>
</template>
<script>
import axios from "axios";
import router from "../../router";
export default {
  data() {
    return {
      profile: [],
      formData: {
        first_name: {
          id: "first_name",
          label: "First Name",
          type: "text",
          fieldType: "input",
          value: "",
        },
        last_name: {
          id: "last_name",
          label: "Last Name",
          fieldType: "input",
          type: "text",
          value: "",
        },
        email: {
          id: "email",
          label: "Email",
          fieldType: "input",
          type: "email",
          value: "",
        },
        password: {
          id: "password",
          label: "Password",
          fieldType: "input",
          type: "password",
          value: "",
        },
        confirm_password: {
          id: "confirm_password",
          label: "Confirm Password",
          fieldType: "input",
          type: "password",
          value: "",
        },
      },
      errors: [],
      responseMessage: "",
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
