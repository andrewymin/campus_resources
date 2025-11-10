// Router
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/main.vue'
import Dashboard from '../pages/dashboard.vue'

const routes = [
  { path: '/', component: Home},
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  // Check if the route the user is going to requires authentication
  if (to.meta.requiresAuth) {
    // Checking local storage for the role
    const userRole = localStorage.getItem('role'); 

    if (userRole) {
      // User has the role/is logged in, allow them to proceed to the dashboard
      next(); 
    } else {
      // User is NOT logged in. Thus redirect to home. 
      // This will act like router.replace() in the router.berforEach
      next({ path: '/' }); 
    }
  } else {
    // If the route doesn't require auth (like the Home page), just let them go
    next();
  }
});

export default router;