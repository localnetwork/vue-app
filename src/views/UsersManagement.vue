<template>
  Users Management

  <div>
    <vs-table max-items="1" pagination stripe :data="users">
      <template #header>
        <h3>Users</h3>
      </template>
      <template #thead>
        <vs-th> Email </vs-th>
        <vs-th> Name </vs-th>
        <vs-th> Website </vs-th>
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

          <vs-td :data="data[indextr].id">
            {{ data[indextr].last_name }}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{ data[indextr].id }}
            <vs-dropdown>
              <vs-button>
                Dropdown <vs-icon name="icon-angle-down" />
              </vs-button>

              <vs-dropdown-menu>
                <vs-dropdown-item @click="viewProfile(data[indextr].id)"
                  >Option 1</vs-dropdown-item
                >
                <vs-dropdown-item @click="handleItemClick('Option 2')"
                  >Option 2</vs-dropdown-item
                >
                <vs-dropdown-item @click="handleItemClick('Option 3')"
                  >Option 3</vs-dropdown-item
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
      users: [],
    };
  },
  methods: {
    viewProfile(id) {
      router.push(`/user/${id}/edit`);
    },
    async getAllUsers() {
      const data = new FormData();
      data.append("method", "getAllUsers");
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
        console.log(response.data.data);
        this.users = response.data.data;
      } catch (error) {
        console.error("Catch error:", error);
      }
    },
  },
};
</script>
