<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
const test = () => alert('test')
</script>

<!-- <template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template> -->

<!-- Test -->
<template>
  <v-app>
    <v-main>
      <v-container class="pa-4 text-center">
        <v-card class="mx-auto pa-4" max-width="400">
          <v-card-title>Hello Vuetify 👋</v-card-title>
          <v-card-text>This means Vuetify is working properly!</v-card-text>
          <v-btn @click="test" color="primary">Click me</v-btn>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
