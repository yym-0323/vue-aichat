<script setup lang="ts">
import Chat from '@/views/chat.vue'
</script>

<template>
  <div class="w-full h-full flex">
    <div class="w-[17%] bg-[#f9f9f9] flex flex-col justify-between">
      <div>
        <el-row class="m-4 font-semibold">New Chat</el-row>
      </div>
      <div>
        <el-row class="m-4 font-semibold">Sign up or log in</el-row>
      </div>
    </div>
    <Chat class="flex-1" />
  </div>
</template>

<style scoped></style>
