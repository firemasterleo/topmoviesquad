<!-- src/components/Home.vue -->
<template>
    <div class="body">
      <h2>Home</h2>
      <input type="text" v-model="query" placeholder="Search movies">
      <button @click="searchMovies">Search</button>
      <ul v-if="searchResults.length > 0">
        <div class="movie-grid">
          <div class="movie-item" v-for="movie in searchResults" :key="movie.id">
            <img :src="movie.primaryImage.url" alt="Movie Poster" v-if="movie.primaryImage" />
            <div>{{ movie.titleText.text }}</div>
            <button @click="addToMyMovies(movie)">Add to My Movies</button>
          </div>
        </div>
      </ul>
      <p v-else>No results found.</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useMovieStore } from '../stores/moviestore';
  import { useAuthStore } from '../stores/auth'; // Assuming you have an auth store to get the user ID
  
  const query = ref('');
  const searchResults = ref([]);
  const movieStore = useMovieStore();
  const authStore = useAuthStore(); // Assuming this gives you the current user ID
  
  const searchMovies = async () => {
    await movieStore.searchMovies(query.value);
    searchResults.value = movieStore.searchResults;
  };
  
  const addToMyMovies = async (movie) => {
    const userId = authStore.user?.uid; // Replace with logic to get the current user's ID
    if (userId) {
      const movieDetails = {
        titleText: movie.titleText,
        primaryImage: movie.primaryImage,
        // Add more properties as needed
      };
      await movieStore.addMovie({ userId, movie: movieDetails });
    }
  };
  </script>
  
  <style scoped>

  .body {
    margin-top: 7rem;
  }
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
  
  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }
  
  .movie-item {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
  }
  
  .movie-item img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  </style>
  