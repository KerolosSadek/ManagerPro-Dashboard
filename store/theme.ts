import { defineStore } from "pinia";
import { useTheme } from "vuetify";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
    const isDark = ref(false);
    const theme = useTheme();

    function initTheme() {
        if (process.client) {
            const savedTheme = localStorage.getItem("isDark");
            if (savedTheme !== null) {
                isDark.value = JSON.parse(savedTheme);
            }
        }
        theme.global.name.value = isDark.value ? "dark" : "light";
    }

    function toggleTheme() {
        isDark.value = !isDark.value;
        if (process.client) {
            localStorage.setItem("isDark", JSON.stringify(isDark.value));
        }
        theme.global.name.value = isDark.value ? "dark" : "light";
    }

    // Watch for theme changes and apply it dynamically
    watch(isDark, (newTheme) => {
        theme.global.name.value = newTheme ? "dark" : "light";
    });

    return { isDark, initTheme, toggleTheme };
});
