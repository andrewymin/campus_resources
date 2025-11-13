
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import  LoginModal  from '../components/LoginModal.vue';
    import { loadData, resetData } from '../utils/storage';
    import InfoCard from '../components/Card.vue'

    // login logic
    const router = useRouter();
    const dialog = ref(false)
    const loggedIn = ref(false)
    const role = localStorage.getItem('role')
    const data = loadData();

    onMounted(()=>{
      role ? loggedIn.value = true : loggedIn.value = false; 
    })

    const goToDash = () => router.push('/dashboard');
    const Logout = () => {
      localStorage.removeItem('role');
      loggedIn.value = false;
      router.push('/'); 
      window.location.reload()
    }

</script>

<template>
    <div id="home">
      <!-- Nav Bar -->
        <v-app-bar class="navBar" :elevation="0">
            <v-app-bar-title class="ml-5 ">Campus</v-app-bar-title>

            <v-btn
              @click="resetData"
              color="red-darken-1 mr-5"
            >Reset Data</v-btn>
          
            <v-menu
              v-if="loggedIn"
              transition="slide-y-transition"
              :width="150"
            >
              <template v-slot:activator="{props}">
                <v-icon
                  class="mr-5"
                  color="white"
                  icon="mdi-account-circle" 
                  v-bind="props"  
                ></v-icon>
              </template>
              <v-list
                class="text-center">
                <v-list-item
                  v-if="role==='student'"
                  title="student name"
                  value="student"
                  @click="goToDash"  
                >
                </v-list-item>
                <v-list-item
                  v-else
                  title="admin name"
                  value="admin"
                  @click="goToDash"  
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
            <v-hover v-else v-slot="{ isHovering, props}">
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

      <!-- Popular Resources-->
      <div class="d-flex flex-column justifiy-center align-center h-100 ga-16">
        <div class="search">
          <h1 class=" mb-8 text-md-h4 text-lg-h3">Campus Resources</h1>
          <v-text-field 
              class="searchBar"
              label="Search resources..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="comfortable"
              single-line
              clearable
          ></v-text-field>    
        </div>
        <div>
          <h2 style="text-decoration: underline;" class="text-center">Popular Resources</h2>
          <v-container class="resources">
            <v-row>
              <v-col 
                  v-for="resource in data.resources"
                  :key="resource.id"
                  cols="12"
                  lg="4"
                  sm="6">
                <InfoCard 
                v-model="dialog"
                :resourceId="resource.id"
                :logged="loggedIn"
                :title="resource.title" 
                :local="resource.location"
                :text="resource.description"
                :hours="resource.hours"/>                
              </v-col>
            </v-row>
          </v-container> 
        </div>
      </div>

      <!-- Modal -->
      <LoginModal v-model="dialog" />

    </div>
</template>

<style lang="scss" scoped>
    .resources {
        display: flex;
        justify-content: center;
        gap: 3rem;
        height: 18rem;
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