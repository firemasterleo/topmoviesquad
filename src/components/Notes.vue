<!-- src/components/Notes.vue -->
<template>
    <div>
      <h2>Notes</h2>
      <p>Welcome, {{ authStore.user?.email }}</p>
      <input type="text" v-model="noteText" placeholder="Enter a note">
      <button @click="saveNote">Save Note</button>
      <ul>
        <li v-for="note in notes" :key="note.id">
          {{ note.text }}
          <button @click="deleteNote(note.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { auth } from '../Firebase';
  import { useAuthStore } from '../stores/auth';
  import { addNoteToFirestore, getNotesFromFirestore, deleteNoteFromFirestore } from '../notesOperations';

  
  
const authStore = useAuthStore();

  
  const noteText = ref('');
  const notes = ref([]);
  
  const saveNote = async () => {
    const userId = auth.currentUser?.uid;
    if (userId && noteText.value.trim() !== '') {
      await addNoteToFirestore(userId, noteText.value);
      noteText.value = '';
      fetchNotes();
    }
  };
  
  const fetchNotes = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      notes.value = await getNotesFromFirestore(userId);
    }
  };
  
  const deleteNote = async (noteId) => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      await deleteNoteFromFirestore(userId, noteId);
      fetchNotes();
    }
  };
  
  onMounted(() => {
    fetchNotes();
  });
  </script>
  
  <style scoped>
  h2 {
    color: black;
  }
  
  input[type="text"] {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
  }
  
  button {
    margin: 10px 0;
    padding: 8px 12px;
    font-size: 16px;
    cursor: pointer;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    background-color: #f0f0f0;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  button {
    background-color: #ff6666;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    color: white;
  }
  </style>
  