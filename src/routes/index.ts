// Router
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/main.vue'
import Dashboard from '../pages/dashboard.vue'

const routes = [
  { path: '/', component: Home},
  { path: '/dashboard', component: Dashboard},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;