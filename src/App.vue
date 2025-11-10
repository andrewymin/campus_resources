<script setup lang="ts">
import { onMounted } from 'vue'
import { loadData } from './utils/storage'
import campusData from './data/data.json'
import type {Data} from './utils/storage'

// Setting demo data in LocalStorage 
onMounted(() => {
  loadData(campusData as Data)
})

</script>

<template>
  <v-app>
    <v-main>
    <router-view></router-view> 
    </v-main>
  </v-app>
</template>

