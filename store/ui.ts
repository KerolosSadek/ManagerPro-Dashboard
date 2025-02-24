import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", {
    state: () => ({
        drawer: true, // ✅ Default open on desktop
    }),
    actions: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
    },
});
