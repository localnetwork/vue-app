<template>
  <h1 class="text-[20px] mb-[20px] font-medium text-gray-900">
    Edit {{ profile.first_name }} {{ profile.last_name }}
  </h1>
  <form
    id="login-form"
    @submit.prevent="update"
    class=""
    v-if="isLoading == false"
  >
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

      <div
        v-if="field.fieldType == 'radio' && field.allowedRoles"
        :class="field.allowedRoles.includes(user.role) ? 'block' : 'hidden'"
      >
        <label
          :for="field.id"
          class="block text-gray-700 text-sm font-bold mb-2"
          >{{ field.label }}</label
        >
        <div
          v-if="field.options"
          class="flex flex-wrap items-center gap-x-[15px]"
        >
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
      <div
        class=""
        v-else-if="field.fieldType === 'radio' && !field.allowedRoles"
      >
        <label
          :for="field.id"
          class="block text-gray-700 text-sm font-bold mb-2"
          >{{ field.label }}</label
        >
        <div
          v-if="field.options"
          class="flex flex-wrap items-center gap-x-[15px]"
        >
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
      Update
    </button>
  </form>

  <div class="skeleton animate-pulse" v-if="isLoading">
    <div class="text-fields" v-for="i in 5" :key="i">
      <div class="mb-[30px]">
        <div
          class="mt-[20px] max-w-[130px] w-full h-[20px] bg-slate-200 rounded"
        ></div>
        <div class="mt-[20px] w-full h-[35px] bg-slate-200 rounded"></div>
      </div>
    </div>
    <div>
      <div
        class="mb-[20px] max-w-[130px] w-full h-[20px] bg-slate-200 rounded"
      ></div>
      <div class="flex gap-x-[15px]">
        <div
          class="inline-flex gap-x-[15px] w-full max-w-[200px]"
          v-for="i in 2"
        >
          <div
            class="w-full mb-[15px] max-w-[35px] h-[30px] bg-slate-200 rounded-full"
          ></div>
          <div
            class="w-full mb-[15px] max-w-[150px] h-[30px] bg-slate-200 rounded"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="mt-[20px] max-w-[300px] w-full h-[50px] bg-slate-200 rounded"
    ></div>
  </div>
</template>
<script>
import axios from "axios";
import router from "../../router";
import store from "../../interceptors/store";
import { useToast } from "vue-toastification";
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
      isLoading: true,
      profile: [],
      first_name: "",
      formData: {
        first_name: {
          id: "first_name",
          label: "First Name",
          type: "text",
          fieldType: "input",
        },
        last_name: {
          id: "last_name",
          label: "Last Name",
          fieldType: "input",
          type: "text",
        },
        address: {
          id: "address",
          label: "Address",
          fieldType: "textarea",
          type: "textarea",
        },
        birthday: {
          id: "birthday",
          label: "Birthday",
          fieldType: "input",
          type: "date",
        },
        email: {
          id: "email",
          label: "Email",
          fieldType: "input",
          type: "email",
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
        role: {
          id: "role",
          label: "Role",
          fieldType: "radio",
          type: "radio",
          allowedRoles: [1],
          options: {
            administrator: {
              value: 1,
              label: "Administrator",
            },
            faculty: {
              value: 2,
              label: "Faculty",
            },
            student: {
              value: 3,
              label: "Student",
            },
          },
        },
        user_status: {
          id: "user_status",
          label: "Status",
          fieldType: "radio",
          type: "radio",
          value: "",
          options: {
            active: {
              value: 2,
              label: "Active",
            },
            disabled: {
              value: 1,
              label: "Disabled",
            },
          },
        },
      },

      errors: [],
      responseMessage: "",
    };
  },
  created() {
    this.getUserProfileInfo();
  },
  methods: {
    async update() {
      const id = router.currentRoute._rawValue.params.userId;
      const data = new FormData();

      data.append("method", `updateUserByRoute`);
      data.append("userId", id);
      data.append("userRole", this.profile.role);
      data.append("currentUID", store.state.isUserInfo.id);
      data.append("currentUserRole", store.state.isUserInfo.role);
      data.append("currentUserStatus", store.state.isUserInfo.user_status);

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
        if (response.status === 200) {
          this.errors = {};
          this.responseMessage = "";
          toast.success("Account successfully updated.", {
            timeout: 1000,
          });
          this.getUserProfileInfo();
          this.formClear();
        }
      } catch (error) {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors;
          if (error.response.data.errors.general) {
            for (const key in error.response.data.errors.general) {
              toast.error(`${error.response.data.errors.general[key]}`, {
                timeout: 2000,
              });
            }
            // Redirect to dashboard.
            router.push("/dashboard");
          } else {
            toast.error(
              "Unable to update. Please check the errors in the fields.",
              {
                timeout: 2000,
              }
            );
          }
        }
      }
    },
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

        for (const key in this.$data.formData) {
          if (key) {
            this.formData[key].value = this.profile[key];
          }
        }
        if (response.status == 200) {
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    },

    formClear() {
      this.formData.password.value = "";
      this.formData.confirm_password.value = "";
    },
  },
  props: {},
  mounted() {
    this.getUserProfileInfo();
  },
};
</script>
