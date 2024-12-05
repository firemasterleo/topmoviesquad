// src/notesOperations.js
import { db } from './Firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Function to add a note to Firestore
export const addNoteToFirestore = async (userId, noteText) => {
  try {
    const notesCollection = collection(db, 'users', userId, 'notes');
    const docRef = await addDoc(notesCollection, { text: noteText });
    return docRef.id;
  } catch (error) {
    console.error('Error adding note to Firestore:', error);
    throw new Error('Failed to add note');
  }
};

// Function to get notes from Firestore
export const getNotesFromFirestore = async (userId) => {
  try {
    const notesCollection = collection(db, 'users', userId, 'notes');
    const notesSnapshot = await getDocs(notesCollection);
    return notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting notes from Firestore:', error);
    throw new Error('Failed to get notes');
  }
};

// Function to delete a note from Firestore
export const deleteNoteFromFirestore = async (userId, noteId) => {
  try {
    const noteDoc = doc(db, 'users', userId, 'notes', noteId);
    await deleteDoc(noteDoc);
  } catch (error) {
    console.error('Error deleting note from Firestore:', error);
    throw new Error('Failed to delete note');
  }
};
