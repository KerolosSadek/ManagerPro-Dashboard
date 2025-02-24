<template>
    <div class="dashboard-home-page">
        <v-container>
            <v-row>
                <!-- Analytics Overview  -->
                <v-col cols="12">
                    <CardsAnalyticsCard :analytics="analytics" />
                </v-col>
                <!-- Reports Overview  -->
                <v-col cols="12" lg="8">
                    <ChartsReportsChart />
                </v-col>
                <!-- Visits Overview  -->
                <v-col cols="12" lg="4">
                    <ChartsVisitsChart />
                </v-col>
                <!-- Recent Orders  -->
                <v-col cols="12">
                    <div class="orders-title d-flex justify-space-between">
                        <h5 class="text-h5 pt-sm-2 pb-7">Recent Orders</h5>
                        <NuxtLink to="/orders" class="text-decoration-none d-flex align-center">
                            <span class="direct mb-1 mx-2">Go To Orders Page </span>
                            <img class="m-auto" src="@/assets/icons/arrowRight.svg" alt="" />
                        </NuxtLink>
                    </div>
                    <TablesOrdersTable :recentOrders="recentOrders" />
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script setup lang="ts">
import dashboardCollection from "@/services/dashboard/dashboard";
const analytics = ref([]);
const recentOrders = ref([]);

// Get Analytics
const getAnalytics = async () => {
    await dashboardCollection.getAnalytics().then((response) => {
        analytics.value = response.data;
    }).catch((error) => {
        console.log(error);
    });
};
// Get Recent Orders
const getRecentOrders = async () => {
    await dashboardCollection.getRecentOrders().then((response) => {
        recentOrders.value = response.data;
    }).catch((error) => {
        console.log(error);
    });
};


onMounted(async () => {
    await getAnalytics();
    await getRecentOrders();
});
</script>

<style lang="scss">
.dashboard-home-page {
    background-color: #f8fafb;
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
            color: #AEB9BE !important;
            font-weight: bold;
            font-family: "Renner";
        }
    }
}
</style>
