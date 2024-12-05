import { createRouter, createWebHistory } from "vue-router";
import HomePage from '../components/HomePage.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Notes from '../components/Notes.vue';
import Dashboard from '../components/Dashboard.vue';
import MySquad from '../components/MySquad.vue';
import MyMovies from '../components/MyMovies.vue';
import UserHome from '../components/UserHome.vue';
import Settings from '../components/Settings.vue';
import Authform from '../components/Authform.vue';
import Home from '../components/Home.vue';


const router = createRouter({
    history: createWebHistory(), 
      routes: [
        
        {
            path: '/',
            name: 'HomePage',
            component: HomePage,
           
        },      
        {
            path: '/Login',
            name: 'Login',
            component: Login,
           
        },       
        {
            path: '/Register',
            name: 'Register',
            component: Register,
           
        },      
        {
            path: '/Authform',
            name: 'Authform',
            component: Authform,
           
        },      
        {
            path: '/Notes',
            name: 'Notes',
            component: Notes,
           
        },      
        {
            path: '/UserHome',
            name: 'UserHome',
            component: UserHome,
            meta: { requiresAuth: true } // Require authentication to access Dashboard

           
        },      
        {
            path: '/Settings',
            name: 'Settings',
            component: Settings,
            meta: { requiresAuth: true } // Require authentication to access Dashboard

           
        },      
        {
            path: '/MySquad',
            name: 'MySquad',
            component: MySquad,
            meta: { requiresAuth: true } // Require authentication to access Dashboard

           
        },      
        {
            path: '/MyMovies',
            name: 'MyMovies',
            component: MyMovies,
            meta: { requiresAuth: true } // Require authentication to access Dashboard

            
           
        },                
        {
            path: '/Home',
            name: 'Home',
            component: Home,
            meta: { requiresAuth: true } // Require authentication to access Dashboard

            
           
        },                
        {
            path: '/Dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: { requiresAuth: true } // Require authentication to access Dashboard

           
        }      
    ],
    scrollBehavior(to, from, savedPosition) {
      // Return the desired position when navigating back and forward
      if (savedPosition) {
        return savedPosition;
      } else {
        // Scroll to the top by default
        return { left: 0, top: 0 };
      }
    },
  
});





export default router