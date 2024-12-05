import { defineStore } from 'pinia';
import { getAllUsersWithMoviesAndNotes } from '../userOperations';
// import { getUserName } from '../userOperations'; // Import the function to fetch user by username





export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
    userName: '',
    loading: false, // global loading , another method of rendering ...fetching files
    error: null,
  }),
  actions: {
    async fetchUsers() {
      if (this.users.length === 0) {    //this line esures data persists and prevents unecessary fetches 
        this.loading = true; // global loading , another method of rendering fetching files
      try {
        this.users = await getAllUsersWithMoviesAndNotes();
        console.log('Users in store:', this.users);
      } catch (error) {
        this.error = error;
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false; // global loading , another method of rendering ...fetching files
      }
      }
    },

    resetStore() {
      this.$reset();
    }
  },
});
