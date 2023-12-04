<template>
  <h1 class="text-[20px] font-medium text-gray-900 mb-[15px]">
    Users Management
  </h1>

  <div v-if="isLoading == false">
    <input
      v-model="searchQuery"
      id="search_query"
      type="text"
      placeholder="Search..."
      @input="search"
      class="flex px-[10px] mb-[15px] w-full rounded-md border border-gray-300 min-h-[40px] shadow-sm block w-fullfocus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed rounded-md"
    />
    <vs-table max-items="15" pagination stripe :data="users">
      <template #header>
        <!-- <h3>Users</h3> -->
      </template>
      <template #thead>
        <vs-th> Email </vs-th>
        <vs-th> First Name </vs-th>
        <vs-th> Last Name </vs-th>
        <vs-th> Address </vs-th>
        <vs-th> Birthday </vs-th>
        <vs-th> Role </vs-th>
        <vs-th> Actions </vs-th>
      </template>

      <template v-slot="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].email">
            {{ data[indextr].email }}
          </vs-td>

          <vs-td :data="data[indextr].username">
            {{ data[indextr].first_name }}
          </vs-td>
          <vs-td :data="data[indextr].last_name">
            {{ data[indextr].last_name }}
          </vs-td>
          <vs-td :data="data[indextr].address">
            {{ data[indextr].address }}
          </vs-td>
          <vs-td :data="data[indextr].birthday">
            {{ data[indextr].birthday }}
          </vs-td>
          <vs-td :data="data[indextr].role_name">
            {{ data[indextr].role_name }}
          </vs-td>

          <vs-td :data="data[indextr].id">
            <!-- {{ data[indextr].id }} -->
            <vs-dropdown>
              <vs-button>
                Select an action <vs-icon name="icon-angle-down" />
              </vs-button>

              <vs-dropdown-menu>
                <vs-dropdown-item @click="viewProfile(data[indextr].id)"
                  >View</vs-dropdown-item
                >
                <vs-dropdown-item @click="editProfile(data[indextr].id)"
                  >Edit</vs-dropdown-item
                >
                <vs-dropdown-item @click="deleteAccount(data[indextr].id)"
                  >Delete</vs-dropdown-item
                >
              </vs-dropdown-menu>
            </vs-dropdown>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>

  <div class="skeleton animate-pulse" v-if="isLoading">
    <div
      class="mb-[30px] w-full h-[40px] bg-slate-200 rounded text-slate-400 px-[15px] flex items-center"
    >
      Loading search...
    </div>
    <div class="flex justify-space-around mb-[30px] gap-[50px]">
      <div
        class="w-full max-w-[33.33%] h-[35px] bg-slate-200 rounded"
        v-for="i in 7"
      ></div>
    </div>
    <div class="row" v-for="i in 7" :key="i">
      <div class="mb-[30px] w-full h-[35px] bg-slate-200 rounded"></div>
    </div>
    <div class="flex justify-end gap-x-[15px]">
      <div
        class="mb-[30px] w-full max-w-[35px] h-[35px] bg-slate-200 rounded-full"
      ></div>
      <div
        class="mb-[30px] w-full max-w-[35px] h-[35px] bg-slate-200 rounded"
      ></div>
      <div
        class="mb-[30px] w-full max-w-[35px] h-[35px] bg-slate-200 rounded-full"
      ></div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
import store from "../interceptors/store";
import { useToast } from "vue-toastification";
export default {
  props: {},
  created() {
    this.getAllUsers();
  },
  data() {
    return {
      isLoading: true,
      searchQuery: "",
      users: [],
      profile: [],
    };
  },
  methods: {
    search() {
      console.log(this.searchQuery);
      this.getAllUsers();
    },
    viewProfile(id) {
      router.push(`/user/${id}`);
    },
    editProfile(id) {
      router.push(`/user/${id}/edit`);
    },
    async deleteAccount(id) {
      const toast = useToast();
      const profileFD = new FormData();
      profileFD.append("method", `getUserById`);
      profileFD.append("userId", id);

      const profileResponse = await axios.post(
        `${import.meta.env.VITE_APP_URL}/handler/router.php`,
        profileFD,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (result) {
        const data = new FormData();

        data.append("method", `deleteUser`);
        data.append("userId", id);
        data.append("userRole", profileResponse.role);
        data.append("currentUID", store.state.isUserInfo.id);
        data.append("currentUserRole", store.state.isUserInfo.role);
        data.append("currentUserStatus", store.state.isUserInfo.user_status);

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
          console.log(response);
          if (response.status === 200) {
            this.getAllUsers();
            toast.success("User deleted successfully.", {
              timeout: 2000,
            });
          }
        } catch (error) {
          console.error(error);
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
            if (error.response.data.errors.general) {
              for (const key in error.response.data.errors.general) {
                toast.error(`${error.response.data.errors.general[key]}`, {
                  timeout: 2000,
                });
              }
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
      } else {
      }
    },
    async getAllUsers() {
      const data = new FormData();
      data.append("method", "getAllUsers");
      data.append("searchQuery", this.searchQuery);

      console.log("Search Query:", this.searchQuery);
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
        // console.log(response.data.data);
        this.users = response.data.data;
        if (response.status === 200) {
          this.isLoading = false;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
