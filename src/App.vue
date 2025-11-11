<script setup lang="ts">
import { onMounted } from 'vue'
import { loadData } from './utils/storage'

// Setting demo data in LocalStorage 
onMounted(() => {
  loadData()
})

</script>

<template>
  <v-app>
    <v-main>
    <router-view></router-view> 
    </v-main>
  </v-app>
</template>

