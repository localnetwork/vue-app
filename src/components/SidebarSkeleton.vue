<template>
  <div
    class="p-4 skeleton mt-[15px] sm:p-8 bg-white shadow sm:rounded-lg w-full sticky top-[15px]"
  >
    <div class="animate-pulse">
      <div
        class="w-full max-w-[200px] h-[30px] bg-slate-200 rounded mb-5"
      ></div>

      <div v-for="i in 4">
        <div class="flex gap-x-[15px]">
          <span
            class="w-[25px] h-[25px] bg-slate-200 rounded-full min-w-[25px]"
          ></span>
          <div class="w-full h-[25px] bg-slate-200 rounded"></div>
        </div>

        <div class="border-b-[1px] h-1 my-[15px] block"></div>
      </div>

      <div class="w-full mt-[100px] h-[25px] bg-slate-200 rounded"></div>
    </div>
  </div>
</template>
