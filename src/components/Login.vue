<template>
  <div class="authform">
    <div class="loginform" :class="{ 'is-clicked': is_clicked }" >
      <h1>Login</h1>

      <form class="login-form" @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="email"/>
        <input v-model="password" type="password" placeholder="password"/>
        <button type="submit">login</button>
        <p class="message" :class="{ 'is-clicked': is_clicked }" @click="ToggleMenu">Not registered? <span >Create an account</span></p>
      </form>
    </div>

    <div class="registerform">
    <h1>Register</h1>
    
    <form class="register-form" @submit.prevent="handleRegister">
      <input v-model="username" type="text" placeholder="username" required />
      <input v-model="email" type="text" placeholder="email address" required/>
      <input v-model="password" type="password" placeholder="password" required/>
      <button type="submit">Create Account</button>
      <p class="message" :class="{ 'is-clicked': is_clicked }" @click="ToggleMenu">Already registered? <span>Sign In</span></p>
      <p v-if="error">{{ error }}</p>

</form>


    </div>

  </div>


  </template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';


const username = ref('');
const email = ref('');
const password = ref('');
const error = ref(''); // Initialize error ref to handle errors

const authStore = useAuthStore();
const router = useRouter();

const is_clicked = ref(false)

const ToggleMenu = () => {
  is_clicked.value = !is_clicked.value;
}


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


<style lang="scss" scoped>


.authform {
  position: relative;
  width: fit-content;
  margin-inline: auto;
  .loginform {
    &.is-clicked {
      display: none;
    }
  
  
    position: absolute;
    z-index: 1;
    background: #FFFFFF;
    max-width: 360px;
    margin-inline: auto; 
    height: 21rem;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  
    input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    }
  
    button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #4CAF50;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
  
    cursor: pointer;
    }
  
    button:hover,.form button:active,.form button:focus {
    background: #43A047;
    }
    .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
    cursor: pointer;
      span {
      color: #4CAF50;
      text-decoration: none;
      }
  
    }
  
  }
  
  .registerform {
    &.is-clicked {
      display: none;
    }
  
  z-index: 1;
  height: 21rem;
  
  background: #FFFFFF;
  max-width: 360px;
  margin-inline: auto; 
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  
    input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    }
  
    button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #4CAF50;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
  
    cursor: pointer;
    }
  
    button:hover,.form button:active,.form button:focus {
    background: #43A047;
    }
    .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
    cursor: pointer;
  
      span {
      color: #4CAF50;
      text-decoration: none;
      }
    }
  
  }
}




</style>



