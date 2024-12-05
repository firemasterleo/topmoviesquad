import { db } from './Firebase'; // Adjust the path to your Firebase config
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const getAllUsersWithMoviesAndNotes = async () => {
  const users = [];
  const usersSnapshot = await getDocs(collection(db, 'users'));

  for (const userDoc of usersSnapshot.docs) {
    const userData = userDoc.data();
    const userId = userDoc.id;

    const movies = [];
    const moviesSnapshot = await getDocs(collection(db, 'users', userId, 'movies'));
    moviesSnapshot.forEach(movieDoc => {
      movies.push({ id: movieDoc.id, ...movieDoc.data() });
    });

    const notes = [];
    const notesSnapshot = await getDocs(collection(db, 'users', userId, 'notes'));
    notesSnapshot.forEach(noteDoc => {
      notes.push({ id: noteDoc.id, ...noteDoc.data() });
    });

    users.push({ id: userId, ...userData, movies, notes });
  }

  return users;
};

