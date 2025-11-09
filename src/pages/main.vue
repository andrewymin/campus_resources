
<script setup lang="ts">
    import { ref } from 'vue'

    const dialog = ref(false)
    const visible = ref(false)
    const password = ref('')
    const loginMode = ref('student')

    const toggleLoginMode = () => {
      loginMode.value = loginMode.value === 'student' ? 'admin' : 'student';
      console.log(loginMode.value)
    };


</script>

<template>
    <v-main id="home">
      <!-- Nav Bar -->
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
                  icon="mdi-bookmark-outline"
                  end
                  class="position-absolute"
                  style="cursor: pointer; top: 15px; right: 15px;"
                ></v-icon>
              </v-card>
              <v-card title="Counseling Center" text="Mental health services and walk-in counseling" elevation="4">
                <v-icon
                  icon="mdi-bookmark-outline"
                  end
                  class="position-absolute"
                  style="cursor: pointer; top: 15px; right: 15px;"
                ></v-icon>
              </v-card>
              <v-card title="Counseling Center" text="Mental health services and walk-in counseling" elevation="4">
                <v-icon
                  icon="mdi-bookmark-outline"
                  end
                  class="position-absolute"
                  style="cursor: pointer; top: 15px; right: 15px;"
                ></v-icon>
              </v-card>
          </v-container> 
        </div>
      </div>

      <!-- Modal -->
      <v-dialog v-model="dialog" max-width="90dvw" >
        <v-card style="border-radius: 16px;" class="pa-0 text-center bg-grey-lighten-3">
          <v-container class="ma-0 py-6">
            <v-row no-gutters>
              <template v-if="loginMode === 'student'">
                <v-col cols="12" md="6">
                  <img src="../assets/student_login.png" width="80%" alt="studing student">              
                  <div class="demoCred">
                    <h2>Demo credientials:</h2>
                    <div>
                      <p><span>ID: </span>student@demo.edu</p>
                      <p><span>PASS: </span>studentPass123!</p>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="6" class="right-side pa-8 d-flex flex-column justify-center ga-3">
                <!-- Your form content here -->
                  <h2 class="text-h2 mb-4 text-center shrikhand-regular">Student <br/> Login</h2>
                  <v-form class="w-75 align-self-center">
                    <v-text-field
                      label="Email"
                      type="email"
                      prepend-icon="mdi-email"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      v-model="password"
                      placeholder="Enter your password"
                      :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="visible ? 'text' : 'password'"
                      @click:append-inner="visible = !visible"
                      prepend-icon="mdi-lock"
                      required
                    ></v-text-field>
                    <v-btn type="submit" color="uni-gold" class="mt-4">Login</v-btn>
                  </v-form>
                  <div class="d-flex justify-center align-center">
                    <v-btn 
                    class="mt-3" 
                    variant="plain" 
                    color="grey-darken-3"
                    @click="toggleLoginMode"
                    >Login as admin</v-btn>
                  </div>
                </v-col>
              </template>
              <template v-else="loginMode === 'admin'">
                <v-col cols="12" md="6" class=" pa-8 d-flex flex-column justify-center ga-3">
                <!-- Your form content here -->
                  <h2 class="text-h2 mb-4 text-center shrikhand-regular">Admin<br/>Login</h2>
                  <v-form class="w-75 align-self-center">
                    <v-text-field
                      label="Email"
                      type="email"
                      prepend-icon="mdi-email"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      v-model="password"
                      placeholder="Enter your password"
                      :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="visible ? 'text' : 'password'"
                      @click:append-inner="visible = !visible"
                      prepend-icon="mdi-lock"
                      required
                    ></v-text-field>
                    <v-btn type="submit" color="uni-gold" class="mt-4">Login</v-btn>
                  </v-form>
                  <div class="d-flex justify-center align-center">
                    <v-btn 
                    class="mt-3" 
                    variant="plain" 
                    color="grey-darken-3"
                    @click="toggleLoginMode"
                    >Login as Student
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <img src="../assets/admin_login.png" width="82%" alt="admin working">              
                  <div class="demoCred">
                    <h2>Demo credientials:</h2>
                    <div>
                      <p><span>ID: </span>admin@demo.edu</p>
                      <p><span>PASS: </span>adminPass123!</p>
                    </div>
                  </div>
                </v-col>
              </template>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>

    </v-main>
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
    .demoCred {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      > div {
        text-align: start;
      }
    }
    
</style>