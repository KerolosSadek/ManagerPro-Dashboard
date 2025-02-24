<template>
  <NuxtExampleLayout>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </NuxtExampleLayout>
</template>

<script setup lang="ts">
import "vuetify/styles"; // Required for Vuetify
import "@mdi/font/css/materialdesignicons.css";
import { useThemeStore } from "~/store/theme";

definePageMeta({
  middleware: "auth",
});

const themeStore = useThemeStore();
themeStore.initTheme(); // Initialize dark mode on load

</script>
