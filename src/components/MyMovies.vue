<template>


  
  <div class="image">
    <div class="veil"></div>
            <img src="../assets/moviebg4.jpg" alt="Hero Image">
  </div>
  <div class="body">
    <h2>My Movies</h2>
    <div v-if="loading">fethcing your watchlist</div>
    <div v-else class="movie-grid">
        <div class="movie-item" v-for="movie in myMovies" :key="movie.id">
        <img :src="movie.primaryImage.url" alt="Movie Poster" v-if="movie.primaryImage" />
        <div>{{ movie.titleText.text }}</div>
        <button @click="deleteMovie(movie.id)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMovieStore } from '../stores/moviestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const movieStore = useMovieStore();
const auth = getAuth(); // Access the Firebase auth instance
const userChecked = ref(false);
const loading = ref(true); // Add loading state


// Fetch movies on component mount
const myMovies = computed(() => movieStore.myMovies);


// Fetch movies on component mount
onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    userChecked.value = true; // User check is complete
    if (user) {
      try {
        await movieStore.fetchMovies(user.uid); // Fetch movies using user.uid
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    } else {
      console.log('No user is currently signed in.');
      // Handle no user scenario if needed
    }
    loading.value = false; // Set loading to false after fetching movies

  });
});

// Access myMovies from store
// const myMovies = movieStore.myMovies;

// Method to delete a movie
const deleteMovie = async (movieId) => {
  await movieStore.deleteMovie({ userId: auth.currentUser.uid, movieId });
};
</script>

<style lang="scss" scoped>

.body {
  padding-top: 9rem;

  h2 {
    color: #f9f9f9;
  }
}


.image {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -10;
    .veil {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.562);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      // opacity: 40%;
    }
  }

h2 {
  color: black;
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

button {
  margin-top: 10px;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
}
</style>
