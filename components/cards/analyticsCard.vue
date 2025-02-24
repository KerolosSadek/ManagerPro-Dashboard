<template>
    <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" class="p-0 m-0" v-for="(analytic, index) in analytics" :key="index">
            <div class="card-style ">
                <div class="d-flex align-center gap-2 w-100">
                    <v-avatar size="55" class="me-3">
                        <img :src="analytic.icon" alt="Metric Icon" />
                    </v-avatar>
                    <div>
                        <p>{{ analytic.title }}</p>
                        <div class="d-flex  justify-between align-center mt-2">
                            <h5 class="text-h5 font-weight-bold">{{ analytic.value }}</h5>
                            <v-chip v-if="analytic.percentage" class="text-body-1 mx-4 font-weight-bold"
                                :class="analytic.isIncrease ? 'text-success' : 'text-error'" color="white"
                                size="small">
                                {{ analytic.percentage }}

                            </v-chip>
                        </div>

                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">


const props = defineProps<{
    analytics: {
        title: string;
        value: string;
        icon: string;
        percentage?: string;
        isIncrease?: boolean;
    }[];
}>();
</script>
<style lang="scss">
.card-style {
    padding: 34px 17px;
    border-radius: 16px;
    background: white;
    p{
        color:#AEB9BE;
        font-size: 14px;
    }
    h5{
        font-size: 20px;
        font-weight: bold;
    }
}
</style>