<template>
  <h1>Update your Account</h1>
  {{ profile.first_name }}
  <form id="create-user" @submit.prevent="update" class="">
    <div v-for="(field, key) in formData" :key="key" class="mb-4">
      <div v-if="field.fieldType == 'input'">
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
      </div>

      <div v-if="field.fieldType == 'textarea'">
        <label
          :for="field.id"
          class="block text-gray-700 text-sm font-bold mb-2"
          >{{ field.label }}</label
        >
        <textarea
          :id="field.id"
          v-model="field.value"
          :type="field.type"
          :class="{ '!border-red-500': errors[key] }"
          class="min-h-[100px] flex px-[10px] w-full rounded-md border border-gray-300 min-h-[40px] shadow-sm block w-fullfocus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed rounded-md"
        >
        </textarea>
      </div>

      <div v-if="field.fieldType == 'radio'">
        <label
          :for="field.id"
          class="block text-gray-700 text-sm font-bold mb-2"
          >{{ field.label }}</label
        >
        <div v-if="field.options" class="flex items-center gap-x-[15px]">
          <div
            class="flex gap-x-[5px] items-center mb-[5px]"
            v-for="option in field.options"
          >
            <span class="relative">
              <input
                :name="field.id"
                :id="`${field.id}-${option.value}`"
                v-model="field.value"
                :value="`${option.value}`"
                :type="field.type"
                :class="{
                  '!border-red-500': errors[key],
                }"
                class="inline-flex px-[10px] !rounded-full border border-gray-300 cursor-pointer"
              />
              <span
                v-if="errors[key]"
                class="border-2 rounded-full top-[2px] left-[-4px] block absolute !border-red-400 h-[20px] w-[20px]"
              >
              </span>
            </span>
            <label
              :for="`${field.id}-${option.value}`"
              class="block text-gray-700 text-sm font-bold cursor-pointer"
              >{{ option.label }}</label
            >
          </div>
        </div>
      </div>

      <div v-if="field.fieldType == 'checkboxes'">
        <label
          :for="field.id"
          class="block text-gray-700 text-sm font-bold mb-2"
          >{{ field.label }}</label
        >
        <div v-if="field.options" class="flex items-center gap-x-[15px]">
          <div
            class="flex gap-x-[5px] items-center mb-[5px]"
            v-for="option in field.options"
          >
            <input
              :name="field.id"
              :id="`${field.id}-${option.value}`"
              v-model="field.value"
              :value="`${option.value}`"
              :type="field.type"
              :class="{
                '!border-red-500': errors[key],
              }"
              class="inline-flex px-[10px] !rounded-full border border-gray-300 cursor-pointer"
            />
            <label
              :for="`${field.id}-${option.value}`"
              class="block text-gray-700 text-sm font-bold cursor-pointer"
              >{{ option.label }}</label
            >
          </div>
        </div>
      </div>
      <span v-if="errors[key]" class="text-red-500 font-bold text-xs">{{
        errors[key]
      }}</span>
    </div>

    <button
      type="submit"
      class="border rounded-md shadow-sm font-bold py-2 px-4 focus:outline-none focus:ring focus:ring-opacity-50 border min-w-[250px] rounded-md shadow-sm font-bold py-2 focus:outline-none focus:ring focus:ring-opacity-50 w-full mt-[15px] max-w-[300px] text-center block justify-between items-center bg-[#00b14f] !rounded-[50px] font-semibold text-[20px] text-white !p-[12px] inline-block"
    >
      Update your account
    </button>
  </form>
</template>
<script>
import axios from "axios";
import router from "../../router";
import store from "../../interceptors/store";
export default {
  computed: {
    isUserRoles() {
      return this.$store.state.isUserRoles;
    },
    user() {
      return this.$store.state.isUserInfo;
    },
  },
  data() {
    return {
      profileData: [],
      profile: [],
      formData: {
        first_name: {
          id: "first_name",
          label: "First Name",
          type: "text",
          fieldType: "input",
          value: "Test",
        },
        last_name: {
          id: "last_name",
          label: "Last Name",
          fieldType: "input",
          type: "text",
          value: "",
        },
        address: {
          id: "address",
          label: "Address",
          fieldType: "textarea",
          type: "textarea",
          value: "",
        },
        birthday: {
          id: "birthday",
          label: "Birthday",
          fieldType: "input",
          type: "date",
          value: "",
        },
        email: {
          id: "email",
          label: "Email",
          fieldType: "input",
          type: "email",
          value: "",
        },
        current_password: {
          id: "current_password",
          label: "Current Password",
          fieldType: "input",
          type: "password",
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
    this.getProfileData();
    // console.log(router.currentRoute._rawValue.params.userId);
  },
  methods: {
    async getProfileData() {
      console.log(store.state);
      const data = new FormData();
      data.append("method", `getUserProfileData`);
      data.append("userId", 5);
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
        this.profileData = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getUserProfileInfo() {
      const id = 5;
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
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key].value = "";
        }
      }
      this.errors = {};
      this.responseMessage = "";
    },
  },
  props: {},
};
</script>
