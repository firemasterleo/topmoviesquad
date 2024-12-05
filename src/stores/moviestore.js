import { defineStore } from 'pinia';
import { addMovieToFirestore, deleteMovieFromFirestore, getMoviesFromFirestore } from '../moviesOperations'; // Make sure to import getMoviesFromFirestore
import axios from 'axios'; // Import Axios for API requests

export const useMovieStore = defineStore('movies', {
  state: () => ({
    myMovies: [], // Array of movies
    searchResults: [], // Array of search results
    moviesFetched: false, // Flag to track if movies have been fetched

  }),
    actions: {
      async fetchMovies(userId) {
        try {
          if (!this.moviesFetched) { // Check if movies have not been fetched yet
                                      //also check userstore for the alternative way of persisting state
            // Fetch movies from Firestore based on userId
            const movies = await getMoviesFromFirestore(userId);
            this.myMovies = movies; // Update myMovies state
            this.moviesFetched = true; // Set flag to true after fetching movies
          }
        } catch (error) {
          console.error('Error fetching movies:', error);
          // Handle error as needed
        }
      },
     async addMovie({ userId, movie }) {
      try {
        // Add movie to Firestore and update local state
        const movieId = await addMovieToFirestore(userId, movie);
        const newMovie = { id: movieId, ...movie };
        this.myMovies.push(newMovie); // Update myMovies state
      } catch (error) {
        console.error('Error adding movie:', error);
        // Handle error as needed
      }
      },
      async deleteMovie({ userId, movieId }) {
      try {
        // Delete movie from Firestore and update local state
        await deleteMovieFromFirestore(userId, movieId);
        this.myMovies = this.myMovies.filter(movie => movie.id !== movieId); // Update myMovies state
      } catch (error) {
        console.error('Error deleting movie:', error);
        // Handle error as needed
      }
      },
      async searchMovies(searchQuery) {
      try {
        const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${encodeURIComponent(searchQuery)}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'c7e1fa82cemshc371458ea018863p141e34jsnefce76dcc009',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
          }
          

        };

        const response = await axios(url, options);
        if (response.data && response.data.d) {
          this.searchResults = response.data.d.map(movie => ({
            id: movie.id,
            titleText: { text: movie.l },
            primaryImage: { url: movie.i?.imageUrl }
          }));
        } else {
          this.searchResults = [];
        }
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    },
    resetStore() {
      this.$reset();
    }

  }
});
