import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
    state: () => ({
        allUsers: []
    }),

    actions: {
        async getAllUsers() {
            const response = await fetch("/data/users.json");
            this.allUsers = await response.json();
        }
    }
});
