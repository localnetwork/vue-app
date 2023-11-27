<template>
  <aside
    v-if="isAuthenticated == true && isUserRoles"
    class="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full sticky top-[15px]"
  >
    <!-- Sidebar content goes here -->
    <h2 class="text-2xl font-bold mb-5 text-[#00b14f]">Navigation</h2>
    <!-- <div v-for="item in menuItems" :key="item.name">
        <router-link :to="item.link" class="text-gray-300 hover:text-white">
          {{ item.name }}
        </router-link>
      </div> -->
    <div
      v-for="menuItem in filteredMenuItems"
      :key="menuItem.name"
      class="border-b-[1px] mb-[15px] pb-[15px]"
    >
      <router-link
        :to="menuItem.link"
        class="flex items-center gap-x-[15px] text-[#111827] text-[18px] font-semibold"
      >
        {{ menuItem.name }}
      </router-link>
    </div>
    <button
      @click="logout()"
      class="mt-[100px] flex items-center gap-x-[15px] text-[#111827] text-[18px] font-bold"
    >
      Logout
    </button>
  </aside>
  <SidebarSkeleton v-else />
</template>

<script>
import store from "../interceptors/store";
import router from "../router";
import Cookies from "js-cookie";
import SidebarSkeleton from "./SidebarSkeleton.vue";

export default {
  computed: {
    isUserRoles() {
      return this.$store.state.isUserRoles;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    filteredMenuItems() {
      const userRoles = this.$store.state.isUserRoles || [];
      console.log(userRoles);

      return this.menuItems.filter((item) => {
        return (
          !item.restricted_roles || item.restricted_roles.includes(userRoles)
        );
      });
    },
  },
  props: {},
  data() {
    return {
      menuItems: [],
    };
  },
  watch: {},
  methods: {
    logout() {
      store.state.isAuthenticated = false;
      store.state.isUserRoles = null;
      Cookies.remove("token");
      setTimeout(() => {
        router.push("/login");
      }, 0);
    },
    generateMenuItems() {
      this.menuItems = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Profile", link: "/profile" },
        {
          name: "Create User",
          link: "/user/create",
          restricted_roles: [1],
        },
        {
          name: "Manage Students",
          link: "/manage/students",
          restricted_roles: [1, 2],
        },
        {
          name: "Manage Users",
          link: "/manage/users",
          restricted_roles: [1],
        },
      ];
    },
  },
  created() {
    this.generateMenuItems();
  },
  components: { SidebarSkeleton },
};
</script>
