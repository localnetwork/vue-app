<template>
  <aside
    v-if="isUserRoles"
    class="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full sticky top-[15px]"
  >
    <!-- Sidebar content goes here -->
    <h2 class="text-2xl font-bold mb-4">Sidebar</h2>
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
        class="flex items-center gap-x-[15px] text-[#111827] text-[20px] font-bold"
      >
        {{ menuItem.name }}
      </router-link>
    </div>
  </aside>
  <div
    v-else
    class="p-4 mt-[15px] sm:p-8 bg-white shadow sm:rounded-lg w-full sticky top-[15px]"
  >
    <div class="animate-pulse">
      <div class="flex gap-x-[15px]">
        <span
          class="w-[25px] h-[25px] bg-slate-200 rounded-full min-w-[25px]"
        ></span>
        <div class="w-full h-[25px] bg-slate-200 rounded"></div>
      </div>
      <div class="border-b-[1px] h-1 my-[15px] block"></div>
      <div class="flex gap-x-[15px]">
        <span
          class="w-[25px] h-[25px] bg-slate-200 rounded-full min-w-[25px]"
        ></span>
        <div class="w-full h-[25px] bg-slate-200 rounded"></div>
      </div>
      <div class="border-b-[1px] h-1 my-[15px] block"></div>
      <div class="flex gap-x-[15px]">
        <span
          class="w-[25px] h-[25px] bg-slate-200 rounded-full min-w-[25px]"
        ></span>
        <div class="w-full h-[25px] bg-slate-200 rounded"></div>
      </div>
      <div class="border-b-[1px] h-1 my-[15px] block"></div>
      <div class="flex gap-x-[15px]">
        <span
          class="w-[25px] h-[25px] bg-slate-200 rounded-full min-w-[25px]"
        ></span>
        <div class="w-full h-[25px] bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../interceptors/store";
export default {
  computed: {
    isUserRoles() {
      return this.$store.state.isUserRoles;
    },
    filteredMenuItems() {
      const userRoles = this.$store.state.isUserRoles || [];
      return this.menuItems.filter((item) => {
        return (
          !item.restricted_roles ||
          userRoles.some((role) => item.restricted_roles.includes(role))
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
    generateMenuItems() {
      console.log("test");
      this.menuItems = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Profile", link: "/profile" },
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
};
</script>
