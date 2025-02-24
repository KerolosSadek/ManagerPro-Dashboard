<template>
  <div class="visit-chart">
    <v-card elevation="10" class="pa-4 h-100">
      <v-card-item>
        <div class="d-flex justify-space-between align-center">
          <h3 class="text-h6 font-weight-bold">Visits</h3>
          <div class="d-flex">
            <span class="filter-option" :class="{ active: activeFilter === 'day' }" @click="updateChart('day')">D</span>
            <span class="filter-option" :class="{ active: activeFilter === 'week' }"
              @click="updateChart('week')">W</span>
            <span class="filter-option" :class="{ active: activeFilter === 'month' }"
              @click="updateChart('month')">M</span>
            <span class="filter-option" :class="{ active: activeFilter === 'year' }"
              @click="updateChart('year')">Y</span>
          </div>
        </div>
        <VueApexCharts type="bar" height="375" :options="chartOptions" :series="chartSeries" />
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "vuetify";
import VueApexCharts from "vue3-apexcharts";

const theme = useTheme();
const primary = theme.current.value.colors.primary;

const activeFilter = ref("week");

const chartData = {
  day: [5, 15, 10, 8, 12, 7, 6],
  week: [30, 50, 40, 20, 45, 10, 5],
  month: [200, 180, 220, 210, 190, 230, 250],
  year: [1500, 1600, 1700, 1400, 1800, 1750, 1650],
};

const chartSeries = ref([{ data: chartData.week }]);

const updateChart = (filter: string) => {
  activeFilter.value = filter;
  chartSeries.value = [{ data: chartData[filter] }];
};

const chartOptions = computed(() => ({
  chart: {
    type: "bar",
    height: 250,
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      columnWidth: "40%",
      borderRadius: 5,
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ["M", "T", "W", "T", "F", "S", "S"],
    labels: {
      style: { fontSize: "14px", colors: "#888" },
    },
  },
  yaxis: { show: false },
  fill: { colors: [primary] },
  grid: { show: false },
  tooltip: { enabled: false },
}));
</script>

<style lang="scss">
.visit-chart {
  .v-card {
    border-radius: 17px;
    background-color: var(--v-theme-background);
    ;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;

    h3 {
      font-size: 24px !important;
      font-weight: bold;
      background-color: #fff;
      font-family: "Renner";
    }
  }

  .vue-apexcharts {
    min-height: 340px !important;
  }

  .filter-option {
    font-size: 16px;
    color: #AEB9BE;
    font-weight: bold;
    cursor: pointer;
    margin: 0 10px;
    transition: color 0.3s ease;

    &:hover {
      background-color: #fff;
    }

    &.active {
      color: #007bff;
      font-weight: bold;
      border-bottom: 2px solid #007bff;
    }
  }
}
</style>
