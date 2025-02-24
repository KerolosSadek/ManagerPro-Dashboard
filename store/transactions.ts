import { defineStore } from "pinia";

export const useTransactionsStore = defineStore("transactions", {
    state: () => ({
        transactionsList: []
    }),

    actions: {
        async getAllTransactions() {
            const response = await fetch("/data/transactions.json");
            this.transactionsList = await response.json();
        }
    }
});
