<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';


  const props = defineProps<{ modelValue: boolean }>()
  const emit = defineEmits(['update:modelValue']) 

  const router = useRouter();
  const visible = ref(false);
  const loginMode = ref('student');
  const email = ref('')
  const password = ref('')

  const toggleLoginMode = () => {
    loginMode.value = loginMode.value === 'student' ? 'admin' : 'student';
    console.log(loginMode.value)
  };  

  const loading = ref(false); // optional: manage loading state during API calls
  const handleLoginSubmit = async () => {
        if (!email.value || !password.value) {
        // Basic validation check
        alert('Please enter both email and password.');
        return;
        }

        loading.value = true;

        try {
        // 3. Perform asynchronous actions here (e.g., API call)
        // await api.loginUser(email.value, password.value);
        // HOWEVER for this demo it will be in localStorage
        
        // Simulate a successful login delay
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // 4. Navigate to a new page after successful submission/login
        console.log('Login successful. Navigating to dashboard...');
        router.push('/dashboard'); 
        // Or use named routes: router.push({ name: 'DashboardPage' });

        } catch (error) {
        console.error('Login failed:', error);
        // Handle error messages here
        } finally {
        loading.value = false;
        }
  };

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
            <!-- Your form content here -->
                <h2 class="text-h2 mb-4 text-center shrikhand-regular">Student<br/>Login</h2>
                <v-form class="w-75 align-self-center">
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
            <!-- Your form content here -->
                <h2 class="text-h2 mb-4 text-center shrikhand-regular">Admin<br/>Login</h2>
                <v-form class="w-75 align-self-center" @submit.prevent="handleLoginSubmit">
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