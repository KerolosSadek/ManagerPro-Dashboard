<template>
    <div class="orders-page">
        <v-container>
            <div class="orders-title d-flex justify-space-between">
                <h5 class="text-h5 pt-sm-2 pb-7">Items</h5>
            </div>
            <TablesItemsTable :items="itemsStore.allItems" />
        </v-container>
    </div>
</template>
<script lang="ts" setup>
import { useItemsStore } from "~/store/items";
const itemsStore = useItemsStore();

onMounted(() => {
    itemsStore.getAllItems();
});
</script>
<style lang="scss">
.orders-page {
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