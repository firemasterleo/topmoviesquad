<template>

    <!-- <div class="headersection">
      <div class="headersubsection">
        <div class="header">
          <router-link to="/">
          <div class="name">
              <h1>TopMovieSquad</h1>
            
            
            </div>
          </router-link>
          <div class="nav">
            <router-link to="/login">
              <div class="login">
                <h2>Login</h2>
              </div>
            </router-link>

            <router-link to="/register">
              <div class="register">
                <h2>Register</h2>
              </div>
            </router-link>
            <router-link to="/Authform">
              <div class="Authform">
                <h2>Authform</h2>
              </div>
            </router-link>
            <router-link to="/Dashboard">
              <div class="dashboard">
                <h2>dashboard</h2>
              </div>
            </router-link>
            <router-link to="/MySquad">
              <div class="dashboMySquadard">
                <h2>MySquad</h2>
              </div>
            </router-link>
            <router-link to="/MyMovies">
              <div class="MyMovies">
                <h2>My Movies</h2>
              </div>
            </router-link>

            <router-link to="/Notes">
              <div class="Notes">
                <h2>Notes</h2>
              </div>
            </router-link>
            
          </div>
        </div>
      </div>
    </div> -->

<div class="headercontainer">
  <div class="topheader">
    <div class="headersection2">
      <div class="headersubsection">

          <div class="header">
            <router-link to="/">
            <div class="name">
                <h1>TopMovieSquad</h1>
              </div>
            </router-link>
            <div class="searchbar">
              <input type="text" v-model="query" placeholder="Search movies">
              <!-- <button @click="searchMovies">Search</button> -->
              <div @click="searchMovies" class="searchbutton">
                <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#000000' width='22' height='22'><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>

              </div>
            </div>




            <div v-if="!isAuthenticated" class="headerlogincontainer" >
            <button class="headerloginbutton" :class="{ 'is-loginmenuclicked': is_loginmenuclicked }" @click="ToggleLoginMenu" >Login</button>
          </div>


          <div v-else class="usermenu">
              <div class="notificationbutton">
                <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#000000' width='28' height='28'><path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path></svg>
              </div>

              <div class="profilebutton" :class="{ 'is-profilebuttonclicked': is_profilebuttonclicked }" @click="ToggleMenu" >
                  <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#000000' width='28' height='28'><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
              </div>


              

            </div>

          



          </div>

      <div v-if="!isAuthenticated" class="authformcontainer" :class="{ 'is-loginmenuclicked': is_loginmenuclicked }" @click="ToggleLoginMenuOff" >
            
            <div class="authform"  @click.stop >
                  <div class="loginform" :class="{ 'is-togglelog': is_togglelog }">
                    <h1>Login</h1>

                    <form class="login-form" @submit.prevent="handleLogin">
                      <input v-model="email" type="email" placeholder="email"/>
                      <input v-model="password" type="password" placeholder="password"/>
                      <button type="submit">login</button>
                      <p class="message" :class="{ 'is-togglelog': is_togglelog }" @click="ToggleLog">Not registered? <span >Create an account</span></p>
                    </form>

                  </div>

                  <div class="registerform">
                    <h1>Register</h1>
                    
                    <form class="register-form" @submit.prevent="handleRegister">
                      <input v-model="username" type="text" placeholder="username" required />
                      <input v-model="email" type="text" placeholder="email address" required/>
                      <input v-model="password" type="password" placeholder="password" required/>
                      <button type="submit">Create Account</button>
                      <p class="message" :class="{ 'is-togglelog': is_togglelog }" @click="ToggleLog">Already registered? <span>Sign In</span></p>
                      <p v-if="error">{{ error }}</p>
                    </form>

                  </div>

            </div>
            
          </div>

      </div>
    </div>
    
  </div>
  <!-- <div class="bottomheader">
    <p>Welcome, {{ authStore.user?.email }}</p>


  </div> -->

</div>
<div class="menulist" :class="{ 'is-profilebuttonclicked': is_profilebuttonclicked }" @click="ToggleMenuOff" >

<router-link to="/UserHome">
<div class="menu" >
<h2>Home</h2>
</div>
</router-link>
<router-link to="/MySquad">
<div class="menu">
<h2>My Squad</h2>
</div>
</router-link>
<router-link to="/MyMovies">
<div class="menu">
<h2>My Movies</h2>
</div>
</router-link>
<router-link to="/Home">
<div class="menu">
<h2>search</h2>
</div>
</router-link>
<router-link to="/Settings">
<div class="menu">
<h2>Settings</h2>
</div>
</router-link>

<div class="headerlogoutcontainer">
<button class="" @click="handleLogout">Logout</button>
</div>

</div>


  <div class="routersection">
      <router-view/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const error = ref(''); // Initialize error ref to handle errors

const router = useRouter();




const authStore = useAuthStore();

authStore.initAuth();
// const authStore = useAuthStore()
// const isAuthenticated = computed(() => !!authStore.token)
//

const isAuthenticated = computed(() => !!authStore.user);


const is_profilebuttonclicked = ref(false)
const is_loginmenuclicked = ref(false)
const is_togglelog = ref(false)


  

const ToggleMenu = () => {
  is_profilebuttonclicked.value = !is_profilebuttonclicked.value;
};
const ToggleMenuOff = () => {
  is_profilebuttonclicked.value = false;
};

const ToggleLoginMenu = () => {
  is_loginmenuclicked.value = !is_loginmenuclicked.value;
}
const ToggleLoginMenuOff = () => {
  is_loginmenuclicked.value = false;
};
const ToggleLog = () => {
  is_togglelog.value = !is_togglelog.value;
};


const handleLogin = async () => {
  error.value = '';
  try {
    await authStore.login(email.value, password.value);
    if (authStore.user) {
      router.push('/UserHome');
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
      router.push('/UserHome');
    } else {
      error.value = 'Registration failed. Please try again.';
    }
  } catch (err) {
    error.value = err.message || 'An error occurred during registration.';
  }
};







const handleLogout = async () => {
  await authStore.logout();
  router.push('/');
};


</script>


<style lang="scss" scoped>
@import './sass/main.scss';
</style>

