import { db } from './Firebase'; // Adjust the path to your Firebase config
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export const getMoviesFromFirestore = async (userId) => {
  const movies = [];
  const querySnapshot = await getDocs(collection(db, 'users', userId, 'movies'));
  querySnapshot.forEach((doc) => {
    movies.push({ id: doc.id, ...doc.data() });
  });
  return movies;
};

export const addMovieToFirestore = async (userId, movie) => {
  const docRef = await addDoc(collection(db, 'users', userId, 'movies'), movie);
  return docRef.id;
};

export const deleteMovieFromFirestore = async (userId, movieId) => {
  const docRef = doc(db, 'users', userId, 'movies', movieId);
  await deleteDoc(docRef);
};
