<template>
    <div class="items-table">
        <v-card elevation="10">
            <v-card-item class="pa-6">
                <v-table class="item-table-home">
                    <thead>
                        <tr>
                            <th v-for="header in tableHeaders" :key="header.value" @click="setSort(header.value)">
                                {{ header.text }} <v-icon v-if="sortBy === header.value">{{ sortIcon }}</v-icon>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in paginatedItems" :key="item.id" class="item-row">
                            <td>
                                <div class="d-flex align-center">
                                    <v-avatar size="40" class="me-3">
                                        <img :src="item.image" alt="Item Image" />
                                    </v-avatar>
                                    <h6 class="item-name">{{ item.name }}</h6>
                                </div>
                            </td>
                            <td>
                                <p class="item-category">{{ item.category }}</p>
                            </td>
                            <td>
                                <p class="item-price">${{ item.price.toFixed(2) }}</p>
                            </td>
                            <td>
                                <p class="item-stock">{{ item.stock }}</p>
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
    items: {
        id: number;
        image: string;
        name: string;
        category: string;
        price: number;
        stock: number;
    }[];
}>();

const tableHeaders = [
    { text: "Item Name", value: "name" },
    { text: "Category", value: "category" },
    { text: "Price", value: "price" },
    { text: "Stock", value: "stock" },
];

const itemsPerPage = 5;
const currentPage = ref(1);
const sortBy = ref("name");
const sortOrder = ref("asc");

// Sorting function
const setSort = (column: string) => {
    if (sortBy.value === column) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
        sortBy.value = column;
        sortOrder.value = "asc";
    }
};

const sortedItems = computed(() => {
    return [...props.items].sort((a, b) => {
        let modifier = sortOrder.value === "asc" ? 1 : -1;
        if (a[sortBy.value] < b[sortBy.value]) return -1 * modifier;
        if (a[sortBy.value] > b[sortBy.value]) return 1 * modifier;
        return 0;
    });
});

// Paginated items
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return sortedItems.value.slice(start, start + itemsPerPage);
});

// Total pages
const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage));

// Sort icon
const sortIcon = computed(() => (sortOrder.value === "asc" ? "mdi-arrow-up" : "mdi-arrow-down"));
</script>

<style lang="scss">
.items-table {
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
                    cursor: pointer;
                }
            }
        }

        .item-name {
            font-size: 14px;
            font-weight: bold;
            background-color: #fff;
            font-family: "Renner";
        }

        .item-category,
        .item-price,
        .item-stock {
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
