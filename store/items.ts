import { defineStore } from "pinia";

export const useItemsStore = defineStore("items", {
    state: () => ({
        allItems: []
    }),

    actions: {
        async getAllItems() {
            const response = await fetch("/data/items.json");
            this.allItems = await response.json();
        }
    }
});
