<script setup lang="ts">
  import { shallowRef } from 'vue';    
  import { useRouter } from 'vue-router';
  import data from '../data/data.json';
  import { useDisplay } from 'vuetify';
  import StudentDash from '../components/studentDash.vue';

  let studentData = data.users.find((user)=> user.role === 'student');
  let adminData = data.users.find((user)=> user.role === 'admin');
  const role = localStorage.getItem('role');
  
  const display = useDisplay();

  // router logic
  const router = useRouter();

  const adminMenuTitles = ['Resources', 'Annoucements', 'Users'];
  const adminMenuModel = shallowRef('Resources');

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

    <!-- LEFT SIDEBAR -->
     <template v-if="display.mobile.value">
      <v-container class="pb-0">

        <!--Student -->
        <v-list v-if="role==='student'" lines="three" class="bg-uni-gold rounded-lg" height="200" elevation="6">
          <v-list-item class="font-weight-bold announcement-title">Announcements</v-list-item>
          <v-list-item
            v-for="item in data.announcements" 
            :key="item.title"
            :title="item.title"
            :subtitle="item.description"
          ></v-list-item>
        </v-list>
        <!-- Admin -->
         <v-select v-else
           width="fit-content"
           v-model="adminMenuModel"
           chips
           variant="plain"
           :items="adminMenuTitles"
         >
         </v-select>        

      </v-container>
     </template>
     <template v-else>
      <v-navigation-drawer 
        permanent
        class="ma-4 pa-0 rounded-xl " 
        width="300" 
        color="uni-gold"
      >
        <!-- Admin -->
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

      <!-- MAIN CONTENT AREA -->
      <v-container fluid>
        <template v-if="role==='student'">
          <StudentDash />
        </template>
      </v-container>
  </v-container>
</template>

<style lang="scss" scoped>
  .logged-title-font {
    font-family:'Times New Roman', Times, serif;
    text-decoration: underline;
  }
  .announcement-title {
    min-height: 50px !important;
    text-decoration: underline;
  }
</style>