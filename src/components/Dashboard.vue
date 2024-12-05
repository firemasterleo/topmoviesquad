<!-- src/components/Dashboard.vue -->
<template>
  <div class="dashboard">
    <div class="image">
      <div class="veil"></div>
              <img src="../assets/moviebg4.jpg" alt="Hero Image">
    </div>

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
                <button @click="searchMovies">Search</button>
              </div>

              <div class="headerlogoutcontainer">
                <button class="" @click="handleLogout">Logout</button>
              </div>

            </div>

        <div class="authformcontainer" :class="{ 'is-loginmenuclicked': is_loginmenuclicked }" @click="ToggleLoginMenuOff" >
              
              <div class="authform"  @click.stop >
                    <div class="loginform" :class="{ 'is-clicked': is_clicked }">
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
              
            </div>

        </div>
      </div>
      
    </div>
    <div class="bottomheader">
      <p>Welcome, {{ authStore.user?.email }}</p>
      <h1>Welcome, {{ userName }}</h1>


      <div class="dashboard-navigation">
        <button @click="currentSection = 'home'">Home</button> 
        <button @click="currentSection = 'mysquad'">My Squad</button>
        <button @click="currentSection = 'mymovies'">My Movies</button>
      </div>
      <!-- its convention to use camelcase, small letter for home etc because its a variable -->

      <div class="routes">
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
      </div>

    </div>


  </div>

  


  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Home from './Home.vue';
import MySquad from './MySquad.vue';
import MyMovies from './MyMovies.vue';
import { useAuthStore } from '../stores/auth';
// import { useUserStore } from '../stores/userstore';
import { useRouter } from 'vue-router';


const currentSection = ref('home');
const authStore = useAuthStore();
// const userStore = useUserStore();
const router = useRouter();




const handleLogout = async () => {
  await authStore.logout();
  router.push('/');
};



</script>

<style lang="scss" scoped>
.dashboard {
  // display: flex;
  gap: 2rem;
  // height: 100vh;
  width: 100vw;
  overflow: hidden;


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
  
}

.topheader {
  .headersection2 {
    padding-inline: 2rem;
    // border: solid red;
    width: 100vw;
    height: 3rem;

    .headersubsection {

        .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // border: solid red;
        padding-top: 1rem;
        padding-bottom: 0.5rem;
        .name {
          h1 {
            color: rgb(204, 194, 194);
          }
        }

        .searchbar {
          width: 40%;
          height: 2rem;
          display: flex;
          align-items: CENTER;
          position: relative;
          // border: solid;

          
          input {
              padding-inline: 1rem;
              width: 100%;
              border-radius: 1rem;
              border: solid 1px;
              height: 2rem;
              background-color: rgba(0, 0, 0, 0);
            color: rgb(225, 213, 213);


            }
            button {
              position: absolute;
              right: 1rem;
              background-color: rgba(0, 0, 0, 0);
            color: rgb(225, 213, 213);
            border: solid 1px;
            border-radius: 1rem;
            padding-inline: 0.5rem;
            cursor: pointer;

              
            }
        }

        .headerlogincontainer {

            .headerloginbutton {
              width: 5rem;
              height: 2rem;
              border: solid black;
              border-radius: 1rem;
              background-color: rgba(0, 0, 0, 0);
            color: rgb(225, 213, 213);
            padding-inline: 0.5rem;
            cursor: pointer;
        
            }


              }
            }


        .authformcontainer {
            position: absolute;
            z-index: 0;
            top: 0rem;
            left: 0;
            width: 100vw;
            height: 100vh;
            padding-top: 10rem;
            background-color: rgba(0, 0, 0, 0.543);
            display: none;

            &.is-loginmenuclicked {
                display: block;
            }

            
            
            .authform {
            width: fit-content;
            height: fit-content;
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
                height: 24rem;
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
            // height: 21rem;
            
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
        }
          }
}
.bottomheader {
  // border: solid;
  display: flex;
  gap: 15rem;
  align-items: center;
}
  .dashboard-navigation {
    display: flex;
    gap: 2rem;
    // flex-direction: column;
    margin-bottom: 20px;

    button {
      height: 2rem;
    }
  }
}

.dashboard-section {
  border: solid;
  width: 100vw;
  height: 100%;
}
</style>
