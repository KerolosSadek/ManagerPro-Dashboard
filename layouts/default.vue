<template>
    <v-app>
        <BaseSideBar />
        <div class="main-content">
            <BaseNavBar />
            <v-main class="page-content">
                <slot />
            </v-main>
        </div>
    </v-app>
</template>

<style lang="scss">
</style>
