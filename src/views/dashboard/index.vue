<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>
<template>
  <div>
    <h1>Dashboard</h1>
    <br /><br />
    <pre>{{ authStore.user }}</pre>
    <br /><br />
    Tá logado? {{ authStore.isLoggedIn }}
  </div>
</template>
