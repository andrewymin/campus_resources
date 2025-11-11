<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import data from '../data/data.json';

  const props = defineProps<{ modelValue: boolean }>()
  const emit = defineEmits(['update:modelValue']) 

  const router = useRouter();
  const visible = ref(false);
  const loginMode = ref('student');
  const email = ref('')
  const password = ref('')
  const snackbarVisible = ref(false);
  const snackbarText = ref('');

  const toggleLoginMode = () => {
    loginMode.value = loginMode.value === 'student' ? 'admin' : 'student';
    // console.log(loginMode.value)
  };  

  const loading = ref(false); // optional: manage loading state during API calls

  const handleLoginSubmit = async () => {
    if (!email.value || !password.value) {
      // Basic validation check
      snackbarText.value = 'Please enter both email and password.';
      snackbarVisible.value = true;
      return;
    }

    loading.value = true;
    // Would replace this logic with finding user unique id to get their data using DB
    let studentData = data.users.find((user)=> user.role === 'student');
    let adminData = data.users.find((user)=> user.role === 'admin');

    const isStudent = studentData?.password === password.value && studentData.username === email.value;
    const isAdmin = adminData?.password === password.value && adminData.username === email.value;

    try {
      // Successful login 
      if (isStudent && loginMode.value === 'student') {
        localStorage.setItem('role', 'student');
        router.push('/dashboard'); 
      } else if (isAdmin && loginMode.value === 'admin') {
        localStorage.setItem('role', 'admin')
        router.push('/dashboard')
      } else {
        snackbarText.value = 'Either email or password was incorrect.';
        snackbarVisible.value = true;
      }
    } catch (error) {
    console.error('Login failed:', error);
    // Handle error messages here
    } finally {
    loading.value = false;
    }
  };

  // For testing and demo UX for users
  const autoLogin = (role: String) => {
    if(role === 'student') {
        email.value = 'student@demo.edu';
        password.value = 'studentPass123!';
        handleLoginSubmit();
    }
    email.value = 'admin@demo.edu';
    password.value = 'adminPass123!';
    handleLoginSubmit();
  }

</script>

<template>
    <v-dialog 
    v-model="props.modelValue" 
    max-width="90dvw"
    @update:model-value="emit('update:modelValue', $event)"
     >
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

                <h2 class="text-h3 text-md-h2 mb-4 text-center shrikhand-regular">
                <span
                    style="cursor: pointer;"
                    @click="autoLogin('student')"                  
                >Student<br/>Login</span></h2>
                <v-form class="w-75 align-self-center" @submit.prevent="handleLoginSubmit">
                    <v-text-field
                        v-model="email"
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

                <h2 class="text-h3 text-md-h2 mb-4 text-center shrikhand-regular">
                <span
                    style="cursor: pointer;"
                    @click="autoLogin('admin')"                
                >Admin<br/>Login</span></h2>
                <v-form class="w-75 align-self-center" @submit.prevent="handleLoginSubmit">
                <v-text-field
                    v-model="email"
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
                <v-btn 
                    type="submit" 
                    color="uni-gold" 
                    class="mt-4"
                    :loading="loading"
                    :disabled="loading"
                >Login</v-btn>
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
    <v-snackbar
      v-model="snackbarVisible"
      :timeout="3000"
      color="error"
      >
        {{ snackbarText }}
    </v-snackbar>
</template>

<style lang="scss" scoped>
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