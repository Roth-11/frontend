<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getNoteById, updateNote } from '@/services/notesApi';

export default defineComponent({
  name: 'NoteEdit',
  setup() {
    const note = ref<any>({});
    const route = useRoute();  // Get route parameters
    const router = useRouter();

    // Fetch the note to edit by id
    const fetchNote = async () => {
      const id = route.params.id as string;
      note.value = await getNoteById(parseInt(id));
    };

    // Save the updated note
    const saveNote = async () => {
      await updateNote(note.value.id, note.value);
      router.push('/notes');  // Redirect back to notes list after saving
    };

    onMounted(fetchNote);  // Fetch the note when the component is mounted

    return {
      note,
      saveNote,
    };
  },
});
</script>
