<template>
  <div class="reports-table">
    <v-card elevation="10">
      <v-card-item class="pa-6">
        <v-table class="table">
          <thead>
            <tr>
              <th v-for="header in tableHeaders" :key="header.value">
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in paginatedReports" :key="report.id" class="report-item">
              <td>{{ report.title }}</td>
              <td>{{ report.date }}</td>
              <td>{{ report.type }}</td>
              <td>
                <v-chip :class="getStatusClass(report.status)" size="small">
                  {{ report.status }}
                </v-chip>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-pagination v-model="currentPage" :length="totalPages" density="comfortable" class="custom-pagination mt-4" />
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  reports: {
    id: number;
    title: string;
    date: string;
    category: string;
    status: string;
  }[];
}>();

const tableHeaders = [
  { text: "Report Title", value: "title" },
  { text: "Date", value: "date" },
  { text: "Category", value: "category" },
  { text: "Status", value: "status" },
];

const itemsPerPage = 5;
const currentPage = ref(1);

const paginatedReports = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return props.reports.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(props.reports.length / itemsPerPage));

const getStatusClass = (status: string) => {
  return {
    green: status === "Completed",
    blue: status === "Pending",
    yellow: status === "In Review",
  };
};
</script>

<style lang="scss">
.reports-table {
  .v-card {
    border-radius: 17px;
    background-color: var(--v-theme-background);
    ;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;

    .v-table {
      background-color: var(--v-theme-background);
      ;

      td {
        border: none;
      }

      thead {
        background-color: #f7f9fa;

        th {
          padding: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #aeb9be;
          border-radius: 4px !important;
          border: none;
        }
      }
    }

    .v-chip {
      border-radius: 4px !important;
      width: 90px;
      text-align: center;
      font-weight: bold;
    }

    .green {
      color: #6ad06a;
      background-color: #9bd49b2c;
    }

    .blue {
      color: #0561fc;
      background-color: #86b3ff32;
    }

    .yellow {
      color: #faa86d;
      background-color: #ffe2ce4f;
    }
  }

  .custom-pagination {
    display: flex;
    justify-content: center;

    .v-pagination .v-btn {
      font-weight: bold;
      min-width: 40px;
      height: 40px;
      border-radius: 10px;
      background-color: #f5f5f5;
      background-color: #fff;
      transition: all 0.3s ease;

      &:hover {
        background-color: #0561fc;
        color: #fff;
      }

      &--active {
        background-color: #0561fc !important;
        color: #fff !important;
      }
    }
  }
}
</style>
