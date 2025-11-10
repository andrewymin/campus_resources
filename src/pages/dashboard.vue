<script setup lang="ts">
  import { ref } from 'vue';    
  import { useRouter } from 'vue-router';

  // router logic
  const router = useRouter();

  // Define data for a list of saved items to display
  const savedItems = ref([
    { id: 1, title: 'Item 1', text: 'This is the first saved item.' },
    { id: 2, title: 'Item 2', text: 'This is the second saved item.' },
    { id: 3, title: 'Item 3', text: 'This is the third saved item.' },
  ]);

  const goHome = () => {
      router.push('/'); 
  }
</script>

<template>
  <v-container>
    <!-- LEFT SIDEBAR -->
    <v-navigation-drawer 
      permanent 
      class="ma-4 pa-0 rounded-xl" 
      width="300" 
      color="uni-gold"
    >
      <v-list>
        <v-list-item title="Announcements/menu"></v-list-item>
        <v-list-item link title="Link A"></v-list-item>
        <v-list-item link title="Link B"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- RIGHT SIDE CONTENT (HEADER and MAIN) -->
      
      <!-- HEADER/NAV BAR -->
       <v-toolbar class="text-white bg-black rounded-xl mx-4 w-auto">
          <v-toolbar-title class="text-h4 pb-3"><span class="text-subtitle-2">Your Dashboard</span><br/>Hi, Role</v-toolbar-title>
          <div class="d-flex align-center ga-4">
            <v-icon 
              icon="mdi-home-variant" 
              color="white" 
              size="x-large" 
              style="cursor: pointer;"
              @click="goHome"
            ></v-icon>
            <div class="d-flex flex-column align-end text-body-2">
              <p>student Name</p>              
              <p>student@demo.edu</p>              
            </div>
            <v-icon 
              icon="mdi-account-circle" 
              color="white mr-4" 
              size="x-large" 
              style="cursor: pointer;"
            ></v-icon>            
          </div>

       </v-toolbar>

      <!-- MAIN CONTENT AREA -->
      <v-container fluid class="mt-8">
        <v-row>
          <v-col cols="12">
            <h1 class="logged-title-font pl-5">Title based on role</h1>
          </v-col>
          <v-col 
            v-for="item in savedItems" 
            :key="item.id" 
            cols="12" 
            sm="6" 
            md="4"
          >
            <v-card class="pa-4 rounded-lg">
              <v-card-title>{{ item.title }}</v-card-title>
              <v-card-text>{{ item.text }}</v-card-text>
              <v-card-actions>
                <v-btn text color="primary">View</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-container>
</template>

<style lang="scss" scoped>
  .logged-title-font {
    font-family:'Times New Roman', Times, serif;
    text-decoration: underline;
  }
</style>