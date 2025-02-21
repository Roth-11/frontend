<template>
    <div class="max-w-3xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-4">Notes</h1>
      
      <div v-if="loading" class="text-center text-gray-500">Loading notes...</div>
      <div v-else>
        <ul v-if="notes.length > 0">
          <li 
            v-for="note in notes" 
            :key="note.id" 
            class="mb-4 p-4 border rounded-lg shadow-md flex justify-between items-start"
          >
            <div class="flex-1">
              <span class="font-semibold text-lg">
                {{ note.title }} 
                <span class="text-sm text-gray-500">- {{ formatDate(note.createdAt) }}</span>
              </span>
              
              <p class="mt-2 text-sm text-gray-700">{{ note.body }}</p>
              <div class="mt-2 text-xs text-gray-500">
                Tags: {{ Array.isArray(note.tags) ? note.tags.join(', ') : 'No tags' }}
              </div>
            </div>
    
            <div class="space-x-2">
              <button @click="viewNoteDetails(note.id)" class="bg-green-500 text-white p-2 rounded hover:bg-green-400">
                View
              </button>
              <button @click="editNote(note.id)" class="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-400">
                Edit
              </button>
              <button @click="deleteNoteHandler(note.id)" class="bg-red-500 text-white p-2 rounded hover:bg-red-400">
                Delete
              </button>
            </div>
          </li>
        </ul>
        
        <div v-else class="text-gray-500 text-center">No notes available.</div>
      </div>
    
      <button @click="createNewNote" class="w-full bg-blue-500 text-white p-3 rounded-lg mt-4 hover:bg-blue-400">
        Create New Note
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { getNotes, deleteNote } from '@/services/notesApi';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'NoteList',
    setup() {
      const notes = ref<any[]>([]);
      const loading = ref(true);
      const router = useRouter();
  
      const fetchNotes = async () => {
        try {
          notes.value = await getNotes();
        } catch (error) {
          console.error('Failed to fetch notes:', error);
        } finally {
          loading.value = false;
        }
      };
  
      const deleteNoteHandler = async (id: number) => {
        if (!confirm('Are you sure you want to delete this note?')) return;
        try {
          await deleteNote(id);
          fetchNotes();
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      };
  
      const createNewNote = () => router.push('/create-note');
      const editNote = (id: number) => router.push(`/edit-note/${id}`);
      const viewNoteDetails = (id: number) => router.push(`/note/${id}`);  // Update this line to match the route path
      const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();
  
      onMounted(fetchNotes);
  
      return {
        notes,
        loading,
        deleteNoteHandler,
        createNewNote,
        editNote,
        viewNoteDetails,
        formatDate,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Tailwind CSS is used for styling */
  </style>
  