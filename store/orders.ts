import { defineStore } from "pinia";

export const useOrdersStore = defineStore("orders", {
    state: () => ({
        allOrders: []
    }),

    actions: {
        async getAllOrders() {
            const response = await fetch("/data/orders.json");
            this.allOrders = await response.json();
        }
    }
});
