<template>
  Users Management

  <div>
    <input
      v-model="searchQuery"
      id="search_query"
      type="text"
      placeholder="Search..."
      @input="search"
      class="flex px-[10px] w-full rounded-md border border-gray-300 min-h-[40px] shadow-sm block w-fullfocus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed rounded-md"
    />
    <vs-table max-items="15" pagination stripe :data="users">
      <template #header>
        <h3>Users</h3>
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
                <vs-dropdown-item @click="handleItemClick('Option 3')"
                  >Delete</vs-dropdown-item
                >
              </vs-dropdown-menu>
            </vs-dropdown>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
export default {
  props: {},
  created() {
    this.getAllUsers();
  },
  data() {
    return {
      searchQuery: "",
      users: [],
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
      } catch (error) {
        console.error("Catch error:", error);
      }
    },
  },
};
</script>
