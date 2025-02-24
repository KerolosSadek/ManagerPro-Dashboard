<template>
  <div class="report-overview">
    <v-card elevation="10" class="withbg">
      <v-card-item>
        <div class="d-flex justify-space-between align-center">
          <h3>Report</h3>
          <div class="d-flex align-center">
            <span class="filter-option" :class="{ active: activeFilter === 'day' }" @click="updateChart('day')">
              Day
            </span>
            <span class="filter-option" :class="{ active: activeFilter === 'week' }" @click="updateChart('week')">
              Week
            </span>
            <span class="filter-option" :class="{ active: activeFilter === 'month' }" @click="updateChart('month')">
              Month
            </span>
            <span class="filter-option" :class="{ active: activeFilter === 'year' }" @click="updateChart('year')">
              Year
            </span>
          </div>
        </div>
        <div class="mt-6">
          <VueApexCharts type="area" height="370px" :options="chartOptions" :series="seriesData" />
        </div>
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
const secondary = "#f3f4f6"; // Light gray for grid

const activeFilter = ref("week");

// Fake data for different timeframes
const chartData = {
  day: [5000, 10000, 7000, 9000, 12000, 8000, 11000],
  week: [10000, 50000, 55000, 40000, 60000, 30000, 70000],
  month: [150000, 180000, 160000, 140000, 190000, 170000, 200000],
  year: [1000000, 1200000, 1100000, 1300000, 1400000, 1500000, 1600000],
};

const seriesData = ref([{ name: "Earnings", data: chartData.week }]);

const updateChart = (filter: string) => {
  activeFilter.value = filter;
  seriesData.value = [{ name: "Earnings", data: chartData[filter] }];
};

const chartOptions = computed(() => ({
  chart: {
    type: "area",
    height: 200,
    toolbar: { show: false },
  },
  zoom: { enabled: false },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  markers: {
    size: 7,
    colors: ["#fff"],
    strokeColors: primary,
    strokeWidth: 2,
    hover: { size: 2 },
  },
  colors: [primary],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 0.8,
      inverseColors: false,
      opacityFrom: 0.3,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
  },
  grid: {
    show: true,
    borderColor: secondary,
    strokeDashArray: 3,
  },
  dropShadow: {
    enabled: true,
    color: primary,
    top: 3,
    left: 0,
    blur: 4,
    opacity: 0.3,
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    labels: {
      style: { colors: "#444", fontSize: "13px", fontWeight: "200" },
    },
  },
  yaxis: {
    labels: {
      formatter: (val: number) => `$${val / 1000}k`,
      style: { colors: "#444", fontSize: "11px", fontWeight: "400" },
    },
  },
  tooltip: {
    theme: "light",
    y: {
      formatter: (val: number) => `$${val.toLocaleString()}`,
    },
  },
}));
</script>

<style lang="scss">
.report-overview {
  .v-card {
    border-radius: 17px;
    background-color: var(--v-theme-background);
    ;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;

    h3 {
      font-size: 24px;
      font-weight: bold;
      background-color: #fff;
      font-family: "Renner";
    }
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
      color: #007bff; // Highlight active option
      font-weight: bold;
      border-bottom: 2px solid #007bff;
    }
  }
}
</style>
