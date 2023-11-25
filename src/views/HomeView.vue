<template>
  <form
    id="login-form"
    @submit.prevent="login"
    class="max-w-md mx-auto p-8 bg-white shadow-md rounded"
  >
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
        :class="{ 'border-red-500': errors[key] }"
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span v-if="errors[key]" class="text-red-500 text-xs">{{
        errors[key]
      }}</span>
    </div>

    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Login
    </button>
  </form>

  <div v-if="responseMessage">
    <p>{{ responseMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import router from "../router";
// import TheWelcome from "../components/TheWelcome.vue";
export default {
  data() {
    return {
      formData: {
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
      },
      errors: [],
      responseMessage: "",
    };
  },
  methods: {
    async login() {
      const data = new FormData();
      data.append("method", "userLogin");

      // Iterate through the formData keys
      for (const key in this.$data.formData) {
        if (
          this.$data.formData.hasOwnProperty(key) &&
          key !== "errors" &&
          key !== "responseMessage"
        ) {
          // Append the field's id and value to the FormData
          data.append(key, this.$data.formData[key].value);
        }
      }

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
        if (response.status === 200) {
          Cookies.set(`token`, response.data.data.token, {
            expires: 7,
          });
          const token = Cookies.get("token");
          const res = await axios.get(
            `${import.meta.env.VITE_APP_URL}/validators/validateToken.php`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          this.formClear();
          router.push("/dashboard");
        }
      } catch (error) {
        const responseData = error.response.data;
        if (responseData.errors) {
          this.errors = responseData.errors;
        }
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
};
</script>
