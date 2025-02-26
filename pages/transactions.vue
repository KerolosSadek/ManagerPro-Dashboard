<template>
  <div class="orders-page">
    <v-container>
      <div class="orders-title d-flex justify-space-between">
        <h5 class="text-h5 pt-sm-2 pb-7">All Transactions</h5>
      </div>
      <TablesTransactions :transactions="transactionsStore.transactionsList" />
    </v-container>
  </div>
</template>
<script lang="ts" setup>
import { useTransactionsStore } from "~/store/transactions";
const transactionsStore = useTransactionsStore();

onMounted(() => {
  transactionsStore.getAllTransactions();
});
</script>
<style lang="scss">
.orders-page {
  background-color: #FFF;
  padding: 20px;

  .orders-title {
    h5 {
      font-size: 24px;
      font-weight: bold;
      background-color: #fff;
      font-family: "Renner";
      padding: 0 20px;
    }

    .direct {
      font-size: 16px;
      color: #aeb9be !important;
      font-weight: bold;
      font-family: "Renner";
    }
  }
}
</style>
