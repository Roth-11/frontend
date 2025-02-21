<template>
  <div class="app min-h-screen flex flex-col justify-between bg-gray-50">
    <!-- Header Section: Login/Logout Buttons -->
    <header class="p-4 bg-blue-600 text-white shadow-md flex justify-between items-center">
      <div class="text-xl font-semibold">My App</div>
      
      <!-- Login/Logout button -->
      <div>
        <button
          v-if="!isAuthenticated"
          @click="goToLogin"
          class="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-md shadow-md"
        >
          Login
        </button>
        <button
          v-else
          @click="logout"
          class="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-md shadow-md"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Main content: Router View -->
    <main class="flex-grow p-6">
      <router-view />
    </main>

    <!-- Footer Section: Optional or for extra links -->
    <footer class="p-4 bg-gray-800 text-white text-center">
      <span>&copy; 2025 My App. All Rights Reserved.</span>
    </footer>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const router = useRouter();
    const isAuthenticated = ref(localStorage.getItem('token') !== null); // Check token in localStorage

    // Redirect to login page
    const goToLogin = () => {
      router.push('/login');
    };

    // Logout function to clear token and redirect to login
    const logout = () => {
      localStorage.removeItem('token');
      isAuthenticated.value = false; // Update the state
      router.push('/login'); // Redirect to login page
    };

    return {
      isAuthenticated,
      logout,
      goToLogin,
    };
  },
};
</script>

<style scoped>
@import './assets/tailwind.css';
</style>
