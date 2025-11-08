
<script setup lang="ts">
    import { ref } from 'vue'

    const dialog = ref(false)
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
                @click="dialog = true"
                >Login</v-btn>
            </v-hover>
        </v-app-bar>

    <v-dialog v-model="dialog" max-width="90dvw" >
       <v-card style="border-radius: 16px;" class="pa-0 text-center">
        <v-container class="ma-0 pa-0">
          <v-row
          align="center"
            no-gutters
          >
            <v-col cols="12" md="6">
              <img src="../assets/student_login.png" width="80%" alt="studing student">              
              <div>
                <p><span>ID</span>test</p>
                <p><span>PASS</span>test</p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field></v-text-field>
            </v-col>
          </v-row>
        </v-container>
       </v-card>
    </v-dialog>

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