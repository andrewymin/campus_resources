
<script setup lang="ts">
    // const test = () => alert('working?')
</script>

<template>
    <v-main id="home">
        <v-app-bar class="navBar" :elevation="0">
            <v-app-bar-title class="ml-5 ">Campus</v-app-bar-title>
            <v-hover v-slot="{ isHovering, props}">
                <v-btn 
                v-bind="props"
                variant="tonal"
                :class="{ 'on-hover': isHovering}"
                :color="isHovering ? '#cfb87c' : 'undefined'"
                class="mr-5"
                >Login</v-btn>
            </v-hover>
        </v-app-bar>
      <div class="d-flex flex-column justifiy-center align-center h-100 ga-16">
        <div class="search">
              <h1 class="homeTitle">Campus Resources</h1>
        <v-text-field 
            class="searchBar"
            label="Search resources..."
            prepend-inner-icon="mdi-magnify"
            variant="solo"
            density="comfortable"
            single-line
            clearable
      ></v-text-field>    
        </div>
        <div>
                 <h2 style="text-decoration: underline;">Popular Resources</h2>
      <v-container class="resources">
          <v-card title="Counseling Center" text="Mental health services and walk-in counseling" ></v-card>
          <v-card title="Counseling Center" text="Mental health services and walk-in counseling" ></v-card>
          <v-card title="Counseling Center" text="Mental health services and walk-in counseling" ></v-card>
      </v-container> 
        </div>

        </div>
    </v-main>
</template>

<style scoped>
    .resources {
        display: flex;
        justify-content: center;
        gap: 3rem;
        height: 18rem;
    }
    .homeTitle {
        font-size: 3rem;
    }
    .search {
        width: 100dvw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 8rem;
    }
    .searchBar {
        width: 80%;
        flex: none;
    }
</style>