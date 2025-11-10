
<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import  LoginModal  from '../components/LoginModal.vue';
    import { resetData } from '../utils/storage';

    // login logic
    const router = useRouter();
    const dialog = ref(false)
    const loggedIn = ref(false)

    onMounted(()=>{
      localStorage.getItem('role') ? loggedIn.value = true : loggedIn.value = false; 
    })

    const goToDash = () => router.push('/dashboard');
    const Logout = () => {
      localStorage.removeItem('role');
      loggedIn.value = false;
    }


    // bookmark temp logic till data is given
    const isBookmarked = ref(false);
    const bookmarkIcon = computed(()=>{
      return isBookmarked.value ? 'mdi-bookmark' : 'mdi-bookmark-outline';
    })
    const bookmarkColor = computed(()=>{
      return isBookmarked.value ? 'uni-gold' : 'black';
    })
    const toggleBookmark = () => {
      isBookmarked.value = !isBookmarked.value;
      // typically make an API call here to save the status to backend
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
            >
              <template v-slot:activator="{props}">
                <v-icon
                  class="mr-5"
                  color="white"
                  icon="mdi-account-circle" 
                  v-bind="props"  
                ></v-icon>
              </template>
              <v-list>
                <v-list-item
                  title="Student name"
                  value="student"
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
          <h1 class="homeTitle mb-8">Campus Resources</h1>
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
              <v-card title="Counseling Center" text="Mental health services and walk-in counseling" elevation="4">
                <v-icon
                  :icon="bookmarkIcon"
                  :color="bookmarkColor"
                  end
                  class="position-absolute"
                  style="cursor: pointer; top: 15px; right: 15px;"
                  @click="toggleBookmark"
                ></v-icon>
              </v-card>
              <v-card title="Counseling Center" text="Mental health services and walk-in counseling" elevation="4">
                <v-icon
                  :icon="bookmarkIcon"
                  :color="bookmarkColor"
                  end
                  class="position-absolute"
                  style="cursor: pointer; top: 15px; right: 15px;"
                  @click="toggleBookmark"
                ></v-icon>
              </v-card>
              <v-card title="Counseling Center" text="Mental health services and walk-in counseling" elevation="4">
                <v-icon
                  :icon="bookmarkIcon"
                  :color="bookmarkColor"
                  end
                  class="position-absolute"
                  style="cursor: pointer; top: 15px; right: 15px;"
                  @click="toggleBookmark"
                ></v-icon>
              </v-card>
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