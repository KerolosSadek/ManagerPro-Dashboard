import { defineStore } from "pinia";

export const useReportsStore = defineStore("reports", {
    state: () => ({
        reportsList: []
    }),

    actions: {
        async getAllReports() {
            const response = await fetch("/data/reports.json");
            this.reportsList = await response.json();
        }
    }
});
