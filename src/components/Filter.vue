<template>
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
</template>