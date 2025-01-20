<script setup lang="ts">
import { useMeStore } from "@/stores/me";

const meStore = useMeStore();
</script>
<template>
  <div>
    <h1>Dashboard</h1>
    <br /><br />
    <pre>{{ meStore.user }}</pre>
    <br /><br />
    Tá logado? {{ meStore.isLoggedIn }}
  </div>
</template>
