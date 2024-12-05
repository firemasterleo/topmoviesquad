import { defineStore } from 'pinia';
import { getNotesFromFirestore, addNoteToFirestore, deleteNoteFromFirestore } from '../notesOperations';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
  }),
  actions: {
    async fetchNotes(userId) {
      try {
        const notes = await getNotesFromFirestore(userId);
        this.notes = notes;
      } catch (error) {
        console.error('Error fetching notes:', error);
        // Handle error as needed
      }
    },
    async addNote({ userId, noteText }) {
      try {
        const noteId = await addNoteToFirestore(userId, noteText);
        const newNote = { id: noteId, text: noteText };
        this.notes.push(newNote);
      } catch (error) {
        console.error('Error adding note:', error);
        // Handle error as needed
      }
    },
    async deleteNote({ userId, noteId }) {
      try {
        await deleteNoteFromFirestore(userId, noteId);
        this.notes = this.notes.filter(note => note.id !== noteId);
      } catch (error) {
        console.error('Error deleting note:', error);
        // Handle error as needed
      }
    },
  },
});
