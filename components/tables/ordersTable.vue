<template>
    <div class="recent-orders">

        <v-card elevation="10">
            <v-card-item class="pa-6">
                <v-table class="order-table-home">
                    <thead>
                        <tr>
                            <th v-for="header in tableHeaders" :key="header.value">
                                {{ header.text }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in paginatedOrders" :key="item.id" class="order-item">
                            <td>
                                <div class="d-flex align-center">
                                    <v-avatar size="40" class="me-3">
                                        <img :src="item.image" alt="Product Image" />
                                    </v-avatar>
                                    <h6 class="item-name">{{ item.name }}</h6>
                                </div>
                            </td>
                            <td>
                                <p class="item-qty">{{ item.qty }}</p>
                            </td>
                            <td>
                                <p class="item-order">{{ item.orderDate }}</p>
                            </td>
                            <td>
                                <h6 class="item-amount">{{ item.amount }}</h6>
                            </td>
                            <td>
                                <v-chip :class="getStatusClass(item.status)" size="small">
                                    {{ item.status }}
                                </v-chip>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
                <!-- Pagination Component -->
                <v-pagination v-model="currentPage" :length="totalPages" density="comfortable"
                    class="custom-pagination mt-4" />
            </v-card-item>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
    recentOrders: {
        id: number;
        image: string;
        name: string;
        qty: number;
        orderDate: string;
        amount: string;
        status: string;
    }[];
}>();

const tableHeaders = [
    { text: "Item Name", value: "name" },
    { text: "Qty", value: "qty" },
    { text: "Order Date", value: "orderDate" },
    { text: "Amount", value: "amount" },
    { text: "Status", value: "status" },
];

const itemsPerPage = 5;
const currentPage = ref(1);

// Compute paginated orders
const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return props.recentOrders.slice(start, start + itemsPerPage);
});

// Calculate total pages
const totalPages = computed(() => Math.ceil(props.recentOrders.length / itemsPerPage));

// Get dynamic status classes
const getStatusClass = (status: string) => {
    return {
        'green': status === 'Approved',
        'blue': status === 'Pending',
        'yellow': status === 'In Process'
    };
};
</script>

<style lang="scss">
.recent-orders {


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
                background-color: #F7F9FA;

                th {
                    padding: 10px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #AEB9BE;
                    font-family: "Renner";
                    border-radius: 4px !important;
                    border: none;
                }
            }
        }

        .item-name {
            font-size: 14px;
            font-weight: bold;
            background-color: #fff;
            font-family: "Renner";
        }

        .item-qty,

        .item-amount {
            font-size: 14px;
            background-color: #fff;
            font-family: "Renner";
        }

        .item-order {
            font-size: 14px;
            color: #AEB9BE;
            font-family: "Renner";
            font-weight: bold;
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
            color: #0561FC;
            background-color: #86b3ff32;
        }

        .yellow {
            color: #FAA86D;
            background-color: #ffe2ce4f;
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
                    background-color: #0561FC;
                    color: #fff;
                }

                &--active {
                    background-color: #0561FC !important;
                    color: #fff !important;
                }
            }
        }
    }
}
</style>
