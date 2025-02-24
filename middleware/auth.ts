import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuthStore } from '@/store/authStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  // If the user is not logged in, redirect to /auth/login
  if (!authStore.isLoggedIn) {
    return navigateTo('/auth/login');
  }
});