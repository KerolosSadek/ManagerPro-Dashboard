<template>
  <div class="reports-page">
    <v-container>
      <div class="reports-title d-flex justify-space-between">
        <h5 class="text-h5 pt-sm-2 pb-7">All Reports</h5>
      </div>
      <TablesReportsTable :reports="reportsStore.reportsList" />
    </v-container>
  </div>
</template>
<script lang="ts" setup>
import { useReportsStore } from "~/store/reports";
const reportsStore = useReportsStore();
onMounted(() => {
  reportsStore.getAllReports();
});
</script>
<style lang="scss">
.reports-page {
  background-color: #FFF;
  padding: 20px;

  .reports-title {
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
