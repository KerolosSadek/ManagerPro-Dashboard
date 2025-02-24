import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        analytics: [],
        recentOrders:[]
    }),

    actions: {
        async getAnalytics() {
            const response = await fetch("/data/analytics.json");
            this.analytics = await response.json();
        },
        async getRecentOrders() {
            const response = await fetch("/data/recentOrders.json");
            this.recentOrders = await response.json();
        }

    }
});
