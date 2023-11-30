<template>
  <div
    v-if="!isAuthenticated && !isUserRoles"
    class="flex flex-wrap flex-col-reverse md:flex-row shadow-xl border-[1px] border-[#f3f3f3] rounded-[10px] overflow-hidden !px-[0]"
  >
    <div class="content-left md:max-w-[50%] bg-[#FAFBFC] w-full p-[50px]">
      <div class="text-[#0A053D] text-[30px] mt-[5px] mb-[15px] font-bold">
        AMS
      </div>
      <span class="mb-[30px] block text-[#B4B5BC] font-normal max-w-[370px]"
        >A central hub for faculty members and students.</span
      >
      <img class="w-full" src="/images/hero.svg" />
    </div>
    <div
      class="login-content bg-white md:max-w-[50%] w-full p-[50px] flex flex-col"
    >
      <h1 class="font-bold text-[#344055] text-[30px] mt-[5px] mb-[15px]">
        Login to Accounts Management
      </h1>
      <form
        v-if="isAuthenticated === false"
        id="login-form"
        @submit.prevent="login"
        class=""
      >
        <div v-for="(field, key) in formData" :key="key" class="mb-4">
          <div v-if="field.fieldType === 'input'">
            <label
              :for="field.id"
              class="block text-gray-700 text-sm font-bold mb-2"
              >{{ field.label }}</label
            >

            <input
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

          <div v-if="field.fieldType === 'markup'">
            <span
              v-if="errors[key]"
              class="text-[14px] text-red-200 py-[5px] px-[12px] inline-block bg-red-500"
              >{{ errors[key] }}</span
            >
          </div>
        </div>

        <button
          type="submit"
          class="border rounded-md shadow-sm font-bold py-2 px-4 focus:outline-none focus:ring focus:ring-opacity-50 border max-w-[250px] rounded-md shadow-sm font-bold py-2 focus:outline-none focus:ring focus:ring-opacity-50 w-full mt-[15px] text-center block justify-between items-center bg-[#00b14f] !rounded-[50px] font-semibold text-[20px] text-white !p-[12px] inline-block"
        >
          Login
        </button>
      </form>
      <div class="mt-[15px] border-t-[1px] pt-[30px] border-color-[#ccc]">
        <a
          @click="openNotification"
          href="#"
          class="underline text-sm text-gray-600 hover:text-gray-900"
          >Forgot your password?</a
        >
      </div>
    </div>
  </div>
  <AccessDenied v-if="isAuthenticated" />
</template>

<script>
import axios from "axios";
import store from "../interceptors/store";
import Cookies from "js-cookie";
import router from "../router";
// import TheWelcome from "../components/TheWelcome.vue";
import { useToast } from "vue-toastification";
import AccessDenied from "../components/AccessDenied.vue";
export default {
  components: {
    AccessDenied,
  },
  computed: {
    isUserRoles() {
      return this.$store.state.isUserRoles;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    user() {
      return this.$store.state.isUserInfo;
    },
    TokenAndValidate() {
      return this.$store.state.TokenAndValidate;
    },
    isUserId() {
      return this.$store.state.isUserId;
    },
  },
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
        status: {
          id: "status",
          label: "Status",
          fieldType: "markup",
          type: "markup",
          value: "",
        },
      },
      errors: [],
      responseMessage: "",
    };
  },
  methods: {
    openNotification(position = null, color) {
      alert("Please relax and try to remember your password.");
    },
    async setRoles() {
      const rolesFD = new FormData();
      rolesFD.append("method", "getUserRole");
      rolesFD.append("userId", 1);
      const resRoles = axios.post(
        `${import.meta.env.VITE_APP_URL}/handler/router.php`,
        rolesFD,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (resRoles.status === 200) {
        this.$store.dispatch("currentUserRoles");
      }
    },
    async login() {
      const data = new FormData();
      data.append("method", "userLogin");
      const toast = useToast();

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
          console.log("200");
          Cookies.set(`token`, response.data.data.token, {
            expires: 7,
          });
          this.$store.dispatch("login");
          toast.success("Successfully logged in.", {
            timeout: 2000,
          });

          // const token = Cookies.get("token");
          // const res = await axios.post(
          //   `${import.meta.env.VITE_APP_URL}/validators/validateToken.php`,
          //   {
          //     headers: { Authorization: `Bearer ${token}` },
          //   }
          // );

          this.formClear();
          this.setRoles();

          setTimeout(() => {
            router.go("/dashboard");
          }, 0);
        }
      } catch (error) {
        console.log(error.response.data.errors);

        if (error.response.data.errors.status) {
          toast.error("Your account is blocked.", {
            timeout: 2000,
          });
        } else {
          toast.error("Invalid login credentials.", {
            timeout: 2000,
          });
        }
        const responseData = error.response.data;
        if (responseData.errors) {
          this.errors = responseData.errors;
        }
        // this.$store.dispatch("logout");
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
