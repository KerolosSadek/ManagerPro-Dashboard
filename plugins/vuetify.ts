import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mdi } from "vuetify/iconsets/mdi"; // Import mdi icon set
import "vuetify/styles"; // Required for Vuetify
import "@mdi/font/css/materialdesignicons.css"; // Ensure mdi icons are loaded
// Define light and dark themes
const lightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        primary: "#1976D2",
        secondary: "#424242",
        background: "#FFFFFF",
        surface: "#F5F5F5",
    },
};

const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        primary: "#BB86FC",
        secondary: "#03DAC6",
        background: "#121212",
        surface: "#1E1E1E",
    },
};

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: "light", // Default theme
            themes: {
                light: lightTheme,
                dark: darkTheme,
            },
        },
        icons: {
            defaultSet: "mdi", // Set mdi as the default icon set
            sets: {
                mdi, // Register mdi icon set
            },
        },
    });

    nuxtApp.vueApp.use(vuetify);
});
