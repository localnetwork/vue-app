<template>
  <h1 class="text-[20px] font-medium text-gray-900">Update your Account</h1>
  <p class="mt-1 text-sm text-gray-600 mb-6">
    Update your profile by filling out the form.
  </p>
  {{ profile.first_name }}
  <form id="create-user" @submit.prevent="updateProfile" class="">
    <div v-for="(field, key) in formData" :key="key" class="mb-4">
      <div v-if="field.fieldType == 'input'">
        <label
          :for="field.id"
          class="block text-gray-700 text-sm font-bold mb-2"
          >{{ field.label }}</label
        >

        <input
          v-if="field.type !== 'date'"
          :id="field.id"
          v-model="field.value"
          :type="field.type"
          :class="{ '!border-red-500': errors[key] }"
          class="flex px-[10px] w-full rounded-md border border-gray-300 min-h-[40px] shadow-sm block w-fullfocus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed rounded-md"
        />

        <input
          v-if="field.type === 'date'"
          :id="field.id"
          v-model="field.value"
          :type="field.type"
          :class="{ '!border-red-500': errors[key] }"
          :max="maxDate"
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
import { useToast } from "vue-toastification";
export default {
  computed: {
    maxDate() {
      // For example, setting the max date to today
      const today = new Date().toISOString().split("T")[0];
      return today;
    },
    // isUserRoles() {
    //   return this.$store.state.isUserRoles;
    // },
    // user() {
    //   return this.$store.state.isUserInfo;
    // },
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
          // value: "Test",
          value: this.$store.state.isUserProfile.first_name,
        },
        last_name: {
          id: "last_name",
          label: "Last Name",
          fieldType: "input",
          type: "text",
          // value: "",
          value: this.$store.state.isUserProfile.last_name,
        },
        address: {
          id: "address",
          label: "Address",
          fieldType: "textarea",
          type: "textarea",
          // value: "",
          value: this.$store.state.isUserProfile.address,
        },
        birthday: {
          id: "birthday",
          label: "Birthday",
          fieldType: "input",
          type: "date",
          // value: "",
          value: this.$store.state.isUserProfile.birthday,
        },
        email: {
          id: "email",
          label: "Email",
          fieldType: "input",
          type: "email",
          // value: "",
          value: this.$store.state.isUserInfo.email,
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
          label: "New Password",
          fieldType: "input",
          type: "password",
        },
        confirm_password: {
          id: "confirm_password",
          label: "Confirm Password",
          fieldType: "input",
          type: "password",
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
    async updateProfile() {
      const uid = store.state.isUserId;
      const data = new FormData();
      const profileInfo = {
        first_name: store.state.isUserProfile.first_name,
        last_name: store.state.isUserProfile.last_name,
        address: store.state.isUserProfile.address,
        birthday: store.state.isUserProfile.birthday,
      };
      const jsonData = JSON.stringify(profileInfo);

      data.append("method", `updateUser`);
      data.append("userId", uid);
      data.append("userEmail", store.state.isUserInfo.email);
      data.append("userInfo", store.state.isUserInfo);
      data.append("profileInfo", jsonData);

      const toast = useToast();
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
        console.log("resss", response.data);
        // if (response.data.errors) {
        //   this.errors = response.data.errors;
        // }
        if (response.status === 200) {
          this.errors = {};
          this.responseMessage = "";
          toast.success("Account successfully updated.", {
            timeout: 2000,
          });
          this.formClear();
        }
      } catch (error) {
        console.error(error);
        if (error.response.data.errors) {
          this.errors = error.response.data.errors;
          toast.error(
            "Unable to update. Please check the errors in the fields.",
            {
              timeout: 2000,
            }
          );
        }
      }
    },
    async getProfileData() {
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
      const id = store.state.isUserId;
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
      this.formData.current_password.value = "";
      this.formData.password.value = "";
      this.formData.confirm_password.value = "";
    },
  },
  props: {},
};
</script>
