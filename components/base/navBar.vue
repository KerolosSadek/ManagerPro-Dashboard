<template>
  <v-app-bar app color="white" elevation="1" class="navbar">
    <v-container class="d-flex align-center">
      <v-row class="w-100 align-center">
        <!-- Left Section: Menu Button & Search Bar -->
        <v-col cols="6" lg="6" md="8" sm="8" class="d-flex align-center">
          <v-btn v-if="isMobile" icon @click="toggleDrawer" class="mr-2">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          <v-text-field v-model="search" placeholder="Search" density="compact" hide-details
            class="search-bar flex-grow-1" prepend-inner-icon="mdi-magnify" clearable variant="filled" />
        </v-col>

        <!-- Right Section: Icons & User Menu -->
        <v-col cols="6" lg="6" md="4" sm="4" class="d-flex align-center justify-end">
          <!-- <div class="dark-mode">
            <BaseThemeToggle />
          </div> -->
          <v-btn icon class="mx-1">
            <img src="@/assets/icons/basket.svg" alt="Basket" />
          </v-btn>
          <v-btn icon class="mx-1">
            <img src="@/assets/icons/notifications.svg" alt="Notifications" />
          </v-btn>

          <!-- User Dropdown -->
          <v-menu offset-y>
            <template v-slot:activator="{ props }">
              <button v-bind="props" class="user-menu-btn px-2" variant="text">
                <v-avatar size="40">
                  <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
                </v-avatar>
                <span class="ml-2 user-name d-none d-md-inline">Johny Larsen</span>
                <v-icon class="ml-1">mdi-chevron-down</v-icon>
              </button>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>
              <v-divider />
              <v-list-item @click="logout">
                <v-list-item-title class="text-error">Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUIStore } from "@/store/ui";
import { useDisplay } from "vuetify";
import { BaseThemeToggle } from "#components";

const uiStore = useUIStore();
const { mobile } = useDisplay();
const search = ref("");

// Check if the screen is mobile
const isMobile = computed(() => mobile.value);
const toggleDrawer = () => {
  uiStore.drawer = !uiStore.drawer;
};

// Logout function (replace with actual logic)
const logout = () => {
  console.log("Logging out...");
};
</script>

<style lang="scss">
/* Desktop: Navbar takes full width minus sidebar */
.navbar {
  width: calc(100% - 273px);
  position: fixed;
  left: 256px;
  transition: width 0.3s ease, left 0.3s ease;
  z-index: 10;
  border: none;
  box-shadow: none !important;

  .v-field__outline {
    display: none;
  }
}

/* User menu button styling */
.user-menu-btn {
  display: flex;
  align-items: center;
  text-transform: none;
  font-weight: 500;
}

/* Remove background when the dropdown is open */
.user-menu-btn[aria-expanded="true"] {
  background-color: transparent !important;
}

.v-list-item {
  cursor: pointer !important;
}

/* Mobile: Navbar takes full width */
@media (max-width: 768px) {
  .navbar {
    width: 100%;
    left: 0;
  }

  .user-name {
    display: none !important;
    /* Hide name on small screens */
  }
}
</style>
