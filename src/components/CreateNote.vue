<template>
    <div class="max-w-3xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-4">Create a New Note</h1>
      
      <!-- Form for creating note -->
      <form @submit.prevent="createNote">
        <div class="mb-4">
          <label for="title" class="block text-sm font-semibold">Title</label>
          <input 
            id="title" 
            v-model="title" 
            type="text" 
            class="w-full p-2 border rounded mt-2" 
            required
          />
        </div>
        
        <div class="mb-4">
          <label for="content" class="block text-sm font-semibold">Content</label>
          <textarea 
            id="content" 
            v-model="content" 
            class="w-full p-2 border rounded mt-2"
          ></textarea>
        </div>
  
        <!-- Displaying loading state or error -->
        <div v-if="isLoading" class="text-center text-gray-500">Saving...</div>
        <div v-if="errorMessage" class="text-center text-red-500">{{ errorMessage }}</div>
  
        <div class="text-center">
          <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded mt-4" :disabled="isLoading">
            Save Note
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { createNote as apiCreateNote } from '@/services/notesApi';
import { AxiosError } from 'axios';

export default defineComponent({
  name: 'CreateNote',
  setup() {
    const title = ref('');
    const content = ref('');
    const errorMessage = ref<string | null>(null);
    const isLoading = ref(false);
    const router = useRouter();

    const createNote = async () => {
  const newNote = {
    title: title.value,
    content: content.value || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  errorMessage.value = null;  // Clear previous errors
  isLoading.value = true;  // Set loading state

  try {
    const response = await apiCreateNote(newNote);
    console.log('Note saved successfully:', response);
    router.push('/notes');  // Redirect on success
  } catch (error: unknown) {
    console.error('Error saving note:', error);

    if (error instanceof AxiosError) {
      console.error('Axios error response:', error.response);
      console.error('Error status:', error.response?.status);  // Log status code
      console.error('Error data:', error.response?.data);      // Log response body
      errorMessage.value = error.response?.data?.message || 'Error saving note';
    } else {
      errorMessage.value = 'There was an unknown error saving the note.';
    }
  } finally {
    isLoading.value = false;  // Reset loading state
  }
};



    return {
      title,
      content,
      createNote,
      errorMessage,
      isLoading,
    };
  },
});


  </script>
  
  <style scoped>
  /* Tailwind styling can be used here or you can add custom styles */
  </style>
  