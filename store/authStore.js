// stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: localStorage.getItem('loggedIn') || false,
    users: [] 
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
  },
  actions: {
    signup(userData) {
  
      this.users.push(userData);
    },
    login(credentials) {
 
      if (!credentials.username || !credentials.password) {
        throw new Error('Both username and password are required.');
      }
  
      const foundUser = this.users.find(
        (user) =>
          user.name === credentials.username &&
          user.password === credentials.password
      );
      if (foundUser) {
        this.user = foundUser;
        this.isLoggedIn = true;
        localStorage.setItem('loggedIn', true);
      } else {
        throw new Error('Invalid username or password.');
      }
    },
  },
});
