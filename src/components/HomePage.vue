<template>

  <div class="body">

    <div class="image">
      <div class="veil"></div>
              <img src="../assets/moviebg4.jpg" alt="Hero Image">
    </div>
  
  
    <div class="homecontent">
        <h2>Welcome to Top movie squad, a community for movie enthusiast, and a place where you can explore all kinds of taste in movies , register to become a squad member</h2>
    </div>

  </div>

</template>

<style lang="scss" scoped>

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


.homecontent {
    width: 100vw;
    height: 100rem;
    border: solid ;
    padding-top: 10rem;

    h2 {
      color: rgb(225, 213, 213);

    }
}

</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const username = ref('');
const email = ref('');
const password = ref('');
const error = ref(''); // Initialize error ref to handle errors

const router = useRouter();



const is_loginmenuclicked = ref(false)

const ToggleLoginMenu = () => {
  is_loginmenuclicked.value = !is_loginmenuclicked.value;
}
const ToggleLoginMenuOff = () => {
  is_loginmenuclicked.value = false;
};
const ToggleMenu = () => {
  is_clicked.value = !is_clicked.value;
}

const is_clicked = ref(false)

const authStore = useAuthStore();

authStore.initAuth();



const handleLogin = async () => {
  error.value = '';
  try {
    await authStore.login(email.value, password.value);
    if (authStore.user) {
      router.push('/dashboard');
    } else {
      error.value = 'Login failed. Please check your credentials.';
    }
  } catch (err) {
    error.value = err.message || 'An error occurred during login.';
  }
};

const handleRegister = async () => {
  error.value = '';
  try {
    await authStore.register(email.value, password.value, username.value);
    if (authStore.user) {
      router.push('/dashboard');
    } else {
      error.value = 'Registration failed. Please try again.';
    }
  } catch (err) {
    error.value = err.message || 'An error occurred during registration.';
  }
};





</script>