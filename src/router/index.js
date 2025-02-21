import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/Auth/LoginForm.vue';
import RegisterForm from '@/components/Auth/RegisterForm.vue';
import NotesList from '@/components/NoteList.vue';  // Notes list page
import NoteForm from '@/components/NoteForm.vue';  // Shared form component for create and edit
import NoteDetailView from '@/components/NoteDetail.vue'; // Import the new component

// Define routes
const routes = [
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegisterForm },
  { 
    path: '/notes', 
    component: NotesList,
    meta: { requiresAuth: true }  // Protected route
  },
  { 
    path: '/create-note', 
    component: NoteForm,  // Shared form component
    meta: { requiresAuth: true }  // Protected route
  },
  { 
    path: '/edit-note/:id',  // Edit route
    component: NoteForm,  // Shared form component
    meta: { requiresAuth: true },  // Protected route
  },
  {
    path: '/note/:id', // Route for viewing the note details
    component: NoteDetailView,
    meta: { requiresAuth: true }
  },
  { path: '/', redirect: '/login' },  // Default route
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add a navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');  // Check for token in localStorage

  // If the route requires authentication and the user is not authenticated
  if (to.meta.requiresAuth && !token) {
    next('/login');  // Redirect to login if not authenticated
  } else {
    next();  // Allow access to the route
  }
});

export default router;
