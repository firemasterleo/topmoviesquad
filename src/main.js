// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
// import { useAuthStore } from './stores/auth.js';
// import { useUserStore } from './stores/userstore';
// import { useMovieStore } from './stores/moviestore';


const app = createApp(App);

const pinia = createPinia(); // Create the Pinia instance
app.use(pinia);
app.use(router);

// Initialize auth state before mounting the app
// const authStore = useAuthStore();
// const userStore = useUserStore();
// const movieStore = useMovieStore();

app.mount('#app');

// Fetch users as soon as the app is mounted
// userStore.fetchUsers().then(() => {
//   console.log('Users fetched:', userStore.users);
// }).catch(error => {
//   console.error('Error fetching users:', error);
// });
// movieStore.fetchMovies().then(() => {
//   console.log('movies fetched:', movieStore.myMovies);
// }).catch(error => {
//   console.error('Error fetching movies:', error);
// });


