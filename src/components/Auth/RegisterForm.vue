<template>
    <div class="max-w-sm mx-auto p-6 border rounded shadow-md">
      <h2 class="text-2xl font-bold text-center mb-4">Register</h2>
      <form @submit.prevent="handleRegister">
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
  
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-semibold">Confirm Password</label>
          <input 
            id="confirmPassword" 
            v-model="confirmPassword" 
            type="password" 
            class="w-full p-2 border rounded mt-2" 
            required 
          />
        </div>
  
        <div class="text-center">
          <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded mt-4">
            Register
          </button>
        </div>
      </form>
  
      <p class="text-center mt-4">
        Already have an account? 
        <a href="/login" class="text-blue-500">Login here</a>
      </p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { registerUser } from '@/services/authApi'; // Ensure correct import
  
  export default defineComponent({
    name: 'RegisterForm',
    setup() {
      const user = ref('');
      const password = ref('');
      const confirmPassword = ref('');
      const error = ref(''); // Add an error message reference for UI feedback
  
      const handleRegister = async () => {
        if (password.value !== confirmPassword.value) {
          error.value = 'Passwords do not match!';
          return;
        }
        
        try {
          // Call the register API to send data
          const response = await registerUser({ username: user.value, password: password.value });
          
          if (response) {
            console.log('Registration successful:', response);
            window.location.href = '/login'; // Redirect on successful registration
          }
        } catch (err) {
          error.value = 'Registration failed, please try again.';
          console.error(err);
        }
      };
  
      return { user, password, confirmPassword, handleRegister, error };
    }
  });
  </script>
  
  <style scoped>
  /* You can add custom styles if needed */
  </style>
  