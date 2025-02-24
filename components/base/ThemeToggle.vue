<template>
    <v-btn @click="themeStore.toggleTheme">
        <v-icon v-if="themeStore.isDark">mdi-weather-sunny</v-icon>
        <v-icon v-else>mdi-moon-waxing-crescent</v-icon>
    </v-btn>
</template>
<script setup lang="ts">
import { useThemeStore } from "~/store/theme";

const themeStore = useThemeStore();
</script>
