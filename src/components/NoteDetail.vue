<template>
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Note Details</h1>
  
      <div v-if="note" class="space-y-6">
        <!-- Note Title -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-900">{{ note?.title }}</h2>
        </div>
  
        <!-- Note Content -->
        <div>
          <p class="text-lg text-gray-700">{{ note?.content }}</p>
        </div>
  
        <!-- Note Created Date -->
        <div>
          <span class="text-sm text-gray-500">Created on: {{ note?.createdAt }}</span>
        </div>
      </div>
  
      <!-- Action Buttons -->
      <div class="mt-6 flex justify-between">
        <button 
          @click="goBack" 
          class="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-500 transition duration-200"
        >
          <span class="mr-2">↩️</span> Back to Notes List
        </button>
  
        <button 
          @click="editNote(note.id)" 
          class="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition duration-200"
        >
          <span class="mr-2">✏️</span> Edit Note
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getNoteById } from '@/services/notesApi'; // Replace with actual API call
  
  const note = ref(null);
  const route = useRoute();
  const router = useRouter();
  
  const fetchNoteDetails = async () => {
    const id = route.params.id;
    note.value = await getNoteById(parseInt(id));
  };
  
  const goBack = () => {
    router.push('/notes');
  };
  
  const editNote = (noteId) => {
    router.push(`/edit-note/${noteId}`);
  };
  
  onMounted(fetchNoteDetails);
  </script>
  
  <style scoped>
  /* Additional styles for responsiveness and better presentation */
  @media (max-width: 640px) {
    .max-w-3xl {
      max-width: 100%;
    }
  }
  </style>
  