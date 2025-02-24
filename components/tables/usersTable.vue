<template>
    <div class="users-table">
        <v-card elevation="10">
            <v-card-item class="pa-6">
                <v-table class="user-table-home">
                    <thead>
                        <tr>
                            <th v-for="header in tableHeaders" :key="header.value">
                                {{ header.text }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in paginatedUsers" :key="user.id" class="user-item">
                            <td>
                                <div class="d-flex align-center">
                                    <v-avatar size="40" class="me-3">
                                        <img :src="user.avatar" alt="User Avatar" />
                                    </v-avatar>
                                    <h6 class="user-name">{{ user.name }}</h6>
                                </div>
                            </td>
                            <td>
                                <p class="user-email">{{ user.email }}</p>
                            </td>
                            <td>
                                <p class="user-role">{{ user.role }}</p>
                            </td>
                            <td>
                                <h6 class="user-status">
                                    <v-chip :class="getStatusClass(user.status)" size="small">
                                        {{ user.status }}
                                    </v-chip>
                                </h6>
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
    users: {
        id: number;
        avatar: string;
        name: string;
        email: string;
        role: string;
        status: string;
    }[];
}>();

const tableHeaders = [
    { text: "User Name", value: "name" },
    { text: "Email", value: "email" },
    { text: "Role", value: "role" },
    { text: "Status", value: "status" },
];

const itemsPerPage = 5;
const currentPage = ref(1);

// Compute paginated users
const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return props.users.slice(start, start + itemsPerPage);
});

// Calculate total pages
const totalPages = computed(() => Math.ceil(props.users.length / itemsPerPage));

// Get dynamic status classes
const getStatusClass = (status: string) => {
    return {
        'green': status === 'Active',
        'blue': status === 'Pending',
        'red': status === 'Banned'
    };
};
</script>

<style lang="scss">
.users-table {
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

        .user-name {
            font-size: 14px;
            font-weight: bold;
            background-color: #fff;
            font-family: "Renner";
        }

        .user-email,
        .user-role {
            font-size: 14px;
            background-color: #fff;
            font-family: "Renner";
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

        .red {
            color: #d9534f;
            background-color: #f2dede;
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
