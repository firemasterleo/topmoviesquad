// src/stores/auth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth, db } from '../Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { useUserStore } from './userstore'; // Import the user store
import { useMovieStore } from './moviestore'; // Import the movie store



export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  const register = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.value.uid), {
        username: username,
        email: email,
      });
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email already in use.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email format.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password is too weak.');
      } else {
        throw new Error('Registration failed. Please try again.');
      }
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
    } catch (error) {
      console.error('Error logging in user:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid username or password.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email format.');
      } else {
        throw new Error('Login failed. Please try again.');
      }
    }
  };

  const logout = async () => {
    const auth = getAuth();
    const userStore = useUserStore();
    const movieStore = useMovieStore();

    try {
      await signOut(auth);
      user.value = null;
      userStore.resetStore(); // Clear the user store when logging out
      movieStore.resetStore(); // Clear the movie store when logging out


    } catch (error) {
      console.error('Error logging out user:', error);
      throw new Error('Logout failed. Please try again.');
    }
  };

  const initAuth = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser;
      } else {
        user.value = null;
      }
    });
  };

  const getUserId = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return currentUser.uid;
    } else {
      return null; // Handle case where user is not authenticated
    }
  };

  return { user, register, login, logout, initAuth, getUserId };
});
