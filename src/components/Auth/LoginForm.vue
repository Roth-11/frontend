<template>
    <div class="max-w-sm mx-auto p-6 border rounded shadow-md">
      <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="user" class="block text-sm font-semibold">Username</label>
          <input 
            id="user" 
            v-model="user" 
            type="text" 
            class="w-full p-2 border rounded mt-2" 
            required 
          />
        </div>
        
        <div class="mb-4">
          <label for="password" class="block text-sm font-semibold">Password</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            class="w-full p-2 border rounded mt-2" 
            required
          />
        </div>
        
        <div class="text-center">
          <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded mt-4">
            Login
          </button>
        </div>
      </form>
      
      <p class="text-center mt-4">
        Don't have an account? 
        <a href="/register" class="text-blue-500">Register here</a>
      </p>
  
      <!-- Error Message -->
      <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { loginUser } from '@/services/authApi'; // Assuming the API function is imported from your services
  
  export default defineComponent({
    name: 'LoginForm',
    setup() {
      const user = ref('');
      const password = ref('');
      const error = ref('');
  
      const handleLogin = async () => {
        try {
          // Perform the API call to authenticate the user
          const response = await loginUser({
            username: user.value,
            password: password.value,
          });
          
          // Assuming the API response contains a token or user data
          if (response.token) {
            localStorage.setItem('token', response.token); // Save token in localStorage
            window.location.href = '/notes'; // Manually redirect to the notes page (without vue-router)
          } else {
            error.value = 'Invalid credentials, please try again.';
          }
        } catch (err) {
          error.value = 'An error occurred, please try again later.';
          console.error(err);
        }
      };
  
      return { user, password, handleLogin, error };
    }
  });
  </script>
  
  <style scoped>
  /* You can add custom styles if needed */
  </style>
  