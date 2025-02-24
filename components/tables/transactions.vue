<template>
  <div class="transactions-table">
    <v-card elevation="10">
      <v-card-item class="pa-6">
        <v-table class="transaction-table-home">
          <thead>
            <tr>
              <th v-for="header in tableHeaders" :key="header.value">
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in paginatedTransactions" :key="transaction.id" class="transaction-item">
              <td>
                <p class="transaction-id">#{{ transaction.id }}</p>
              </td>
              <td>
                <div class="d-flex align-center">
                  <v-avatar size="40" class="me-3">
                    <img :src="transaction.userAvatar" alt="User Avatar" />
                  </v-avatar>
                  <h6 class="user-name">{{ transaction.userName }}</h6>
                </div>
              </td>
              <td>
                <p class="transaction-amount">${{ transaction.amount.toFixed(2) }}</p>
              </td>
              <td>
                <p class="transaction-date">{{ formatDate(transaction.date) }}</p>
              </td>
              <td>
                <p class="payment-method">{{ transaction.paymentMethod }}</p>
              </td>
            </tr>
          </tbody>
        </v-table>
        <!-- Pagination Component -->
        <v-pagination v-model="currentPage" :length="totalPages" density="comfortable" class="custom-pagination mt-4" />
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  transactions: {
    id: number;
    userAvatar: string;
    userName: string;
    amount: number;
    date: string;
    paymentMethod: string;
  }[];
}>();

const tableHeaders = [
  { text: "Transaction ID", value: "id" },
  { text: "User Name", value: "userName" },
  { text: "Amount", value: "amount" },
  { text: "Date", value: "date" },
  { text: "Payment Method", value: "paymentMethod" },
];

const itemsPerPage = 5;
const currentPage = ref(1);

// Compute paginated transactions
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return props.transactions.slice(start, start + itemsPerPage);
});

// Calculate total pages
const totalPages = computed(() => Math.ceil(props.transactions.length / itemsPerPage));

// Format date function
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<style lang="scss">
.transactions-table {
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
          font-family: "Renner";
          border-radius: 4px !important;
          border: none;
        }
      }
    }

    .transaction-id {
      font-size: 14px;
      font-weight: bold;
      background-color: #fff;
      font-family: "Renner";
    }

    .user-name {
      font-size: 14px;
      font-weight: bold;
      background-color: #fff;
      font-family: "Renner";
    }

    .transaction-amount {
      font-size: 14px;
      font-weight: bold;
      color: #0561fc;
      font-family: "Renner";
    }

    .transaction-date,
    .payment-method {
      font-size: 14px;
      background-color: #fff;
      font-family: "Renner";
    }
  }

  .custom-pagination {
    display: flex;
    justify-content: center;

    .v-pagination {
      .v-btn {
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
}
</style>
