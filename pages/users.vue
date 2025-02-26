<template>
    <div class="Users-page">
        <v-container>
            <div class="Users-title d-flex justify-space-between">
                <h5 class="text-h5 pt-sm-2 pb-7">All Users</h5>
            </div>
            <TablesUsersTable :users="usersStore.allUsers" />
        </v-container>
    </div>
</template>
<script lang="ts" setup>
import { useUsersStore } from "~/store/users";
const usersStore = useUsersStore();

onMounted(() => {
    usersStore.getAllUsers();
});
</script>
<style lang="scss">
.Users-page {
    background-color: #FFF;
    padding: 20px;

    .Users-title {
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