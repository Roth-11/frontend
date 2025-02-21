<template>
    <div class="max-w-3xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-4">{{ isEdit ? 'Edit Note' : 'Create Note' }}</h1>
      
      <!-- Back Button -->
      <div class="mb-4">
        <button
          @click="goBack"
          class="text-blue-500 hover:text-blue-700 font-semibold"
        >
          ← Back to Notes List
        </button>
      </div>
      
      <!-- Note Form -->
      <form @submit.prevent="saveNote">
        <div class="mb-4">
          <label for="title" class="block text-sm font-semibold">Title</label>
          <input
            v-model="note.title"
            type="text"
            id="title"
            class="w-full px-4 py-2 border rounded-md"
            placeholder="Enter note title"
            required
          />
        </div>
        
        <div class="mb-4">
          <label for="content" class="block text-sm font-semibold">Content</label>
          <textarea
            v-model="note.content"
            id="content"
            class="w-full px-4 py-2 border rounded-md"
            placeholder="Enter note content"
            required
          ></textarea>
        </div>
  
        <button 
          type="submit" 
          class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-400"
        >
          {{ isEdit ? 'Update Note' : 'Create Note' }}
        </button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getNoteById, createNote, updateNote } from '@/services/notesApi';
  
  export default defineComponent({
    name: 'NoteForm',
    setup() {
      const note = ref<any>({
        title: '',
        content: ''
      });
      const route = useRoute();
      const router = useRouter();
  
      // Check if the route contains an ID for editing
      const isEdit = computed(() => !!route.params.id);
      
      // Fetch the note to edit (if editing)
      const fetchNote = async () => {
        if (isEdit.value) {
          const id = route.params.id as string;
          note.value = await getNoteById(parseInt(id));
        }
      };
  
      // Save the note (create or update)
      const saveNote = async () => {
        if (isEdit.value) {
          await updateNote(note.value.id, note.value);  // Update note
        } else {
          await createNote(note.value);  // Create new note
        }
        router.push('/notes');  // Redirect to notes list after saving
      };
  
      // Navigate back to the notes list
      const goBack = () => {
        router.push('/notes');
      };
  
      onMounted(fetchNote); // Fetch note when the component is mounted
  
      return {
        note,
        saveNote,
        isEdit,
        goBack,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Tailwind CSS for styling */
  </style>
  