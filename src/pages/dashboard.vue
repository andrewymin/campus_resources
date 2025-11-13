<script setup lang="ts">
  import { ref } from 'vue';    
  import { useRouter } from 'vue-router';
  import data from '../data/data.json';
  import { useDisplay } from 'vuetify';

  let studentData = data.users.find((user)=> user.role === 'student');
  let adminData = data.users.find((user)=> user.role === 'admin');
  const role = localStorage.getItem('role');
  
  const display = useDisplay();

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
  const Logout = () => {
    localStorage.removeItem('role');
    router.push('/'); 
    window.location.reload()
  }
</script>

<template>
  <v-container>
    <!-- LEFT SIDEBAR -->
     <template v-if="display.mobile.value">
      <v-navigation-drawer 
        temporary
        class="ma-4 pa-0 rounded-xl " 
        width="300" 
        color="uni-gold"
      >
        <v-list v-if="role==='admin'" lines="three">
          <v-list-item class="font-weight-bold">Announcements</v-list-item>
          <v-list-item
            v-for="item in data.announcements" 
            :key="item.title"
            :title="item.title"
            :subtitle="item.description"
          ></v-list-item>
        </v-list>

        <v-list v-else lines="three">
          <v-list-item class="font-weight-bold">Announcements</v-list-item>
          <v-list-item
            v-for="item in data.announcements" 
            :key="item.title"
            :title="item.title"
            :subtitle="item.description"
          ></v-list-item>
        </v-list>

      </v-navigation-drawer>
     </template>
     <template v-else>
      <v-navigation-drawer 
        permanent
        class="ma-4 pa-0 rounded-xl " 
        width="300" 
        color="uni-gold"
      >
        <v-list v-if="role==='admin'" lines="three">
          <v-list-item class="font-weight-bold">Announcements</v-list-item>
          <v-list-item
            v-for="item in data.announcements" 
            :key="item.title"
            :title="item.title"
            :subtitle="item.description"
          ></v-list-item>
        </v-list>

        <v-list v-else lines="three">
          <v-list-item class="font-weight-bold">Announcements</v-list-item>
          <v-list-item
            v-for="item in data.announcements" 
            :key="item.title"
            :title="item.title"
            :subtitle="item.description"
          ></v-list-item>
        </v-list>

      </v-navigation-drawer>
     </template>

      <!-- HEADER/NAV BAR -->
       <v-toolbar class="text-white bg-black rounded-xl mx-1 mx-lg-4 w-auto">
          <v-toolbar-title class="text-h4 pb-3"><span class="text-subtitle-2">Your Dashboard</span><br/>Hi, {{ role?.toUpperCase() }}</v-toolbar-title>
          <div class="d-flex align-center ga-4">
            <template v-if="!display.mobile.value">
              <div class="d-flex flex-column align-end text-body-2"
                v-if="role==='student'">
                <p>{{ studentData?.name }}</p>              
                <p>{{ studentData?.username }}</p>              
              </div>
              <div class="d-flex flex-column align-end text-body-2"
                v-else>
                <p>{{ adminData?.name }}</p>              
                <p>{{ adminData?.username }}</p>              
              </div>              
            </template>

            <v-menu
              transition="slide-y-transition"
              :width="150"
            >
              <template v-slot:activator="{props}">
                <v-icon
                  size="x-large"
                  class="mr-4"
                  color="white"
                  icon="mdi-account-circle" 
                  v-bind="props"  
                ></v-icon>
              </template>
              <v-list
              class="text-center">
                <v-list-item
                  title="Home"
                  value="home"
                  @click="goHome"  
                >
                </v-list-item>
                <v-list-item
                  title="Logout"
                  value="Logout"
                  @click="Logout"  
                >
                </v-list-item>
              </v-list>
            </v-menu>          

          </div>

       </v-toolbar>

      <!-- MAIN CONTENT AREA -->
      <v-container fluid class="mt-8">
        <v-row>
          <v-col v-if="role==='student'" cols="12">
            <h1 class="logged-title-font pl-5">Your Bookmarks</h1>
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