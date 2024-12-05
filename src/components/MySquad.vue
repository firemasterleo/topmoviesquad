<template>
  <div class="body">
    
    <div class="image">
      <div class="veil"></div>
      <img src="../assets/moviebg4.jpg" alt="Hero Image">
    </div>
    <h2>My Squad</h2>
    
    <div v-if="loading">Fetching users...</div>
    <div >
      <div class="user-container" v-for="user in usersWithMoviesAndNotes" :key="user.id">
        <h3>{{ user.username }} - {{ user.email }}</h3>
        <div class="movie-grid">
          <div class="movie-item" v-for="movie in user.movies" :key="movie.id">
            <img :src="movie.primaryImage.url" alt="Movie Poster" v-if="movie.primaryImage" />
            <p>{{ movie.titleText.text }}</p>
          </div>
        </div>
        <ul class="notes">
          <li v-for="note in user.notes" :key="note.id">
            {{ note.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../stores/userstore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const userStore = useUserStore();
const auth = getAuth();
const userChecked = ref(false);
const loading = ref(true);

// Computed property to reactively track users from the store
const usersWithMoviesAndNotes = computed(() => userStore.users);  //just by adding computed to this line i was able to solve the problem of not loading on refresh 
// Fetch users with movies and notes on component mount
onMounted(async () => {
  onAuthStateChanged(auth, async (user) => {
    userChecked.value = true; // User check is complete
    if (user) {
      try {
        await userStore.fetchUsers(); // Fetch users only if authenticated
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    } else {
      console.log('No user is currently signed in.');
      // Handle no user scenario if needed
    }
    loading.value = false; // Set local loading to false after fetching or determining no user
  });
});

</script>

<style lang="scss" scoped>

.body {
  // padding-top: 9rem;
  position: relative;

  h2 {
    color: #f9f9f9;
    padding-top: 9rem;
    width: fit-content;
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

.user-container {
  margin-bottom: 40px; /* Gap between users */
}

h3 {
  margin-bottom: 20px;
  color: #333;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.movie-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-item img {
  width: 100px;
  height: auto;
  margin-bottom: 10px;
}

.notes {
  list-style-type: none;
  padding: 0;
}

.notes li {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
