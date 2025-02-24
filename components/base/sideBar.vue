<template>
  <v-navigation-drawer v-model="uiStore.drawer" :permanent="!isMobile" :temporary="isMobile" app width="256"
    class="sidebar">
    <div class="logo my-2">
      <NuxtLink to="/">
        <img src="@/assets/logos/logo.svg" alt="Logo" loading="lazy" />
      </NuxtLink>
    </div>
    <v-list dense>
      <template v-for="(item, index) in sideBarItems" :key="index">
        <NuxtLink :to="item.to" class="nav-link d-flex" :class="{ 'active-link': item.active }"
          @click="setActive(index)">
          <img :src="item.icon" alt="" />
          <v-list-item :title="item.title" />
          <v-badge v-if="item.title === 'Messages'" color="error" content="2" inline></v-badge>
        </NuxtLink>
        <!-- Add a divider after "Reports" -->
        <v-divider v-if="item.title === 'Reports'" class="my-2" />
        <v-divider v-if="item.title === 'Settings'" class="my-2" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUIStore } from "@/store/ui";
import { useDisplay } from "vuetify"; // ✅ Import useDisplay from Vuetify

// Import Icons
import homeIcon from "@/assets/icons/home.svg";
import ordersIcon from "@/assets/icons/orders.svg";
import usersIcon from "@/assets/icons/users.svg";
import itemsIcon from "@/assets/icons/items.svg";
import reportsIcon from "@/assets/icons/reports.svg";
import messagesIcon from "@/assets/icons/messages.svg";
import supportIcon from "@/assets/icons/support.svg";
import settingsIcon from "@/assets/icons/settings.svg";
import transactionsIcon from "@/assets/icons/transactions.svg";
import loginICon from "@/assets/icons/login.svg";
import registerIcon from "@/assets/icons/register.svg";
const uiStore = useUIStore();
const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);

// ✅ Make sideBarItems reactive
const sideBarItems = ref([
  { title: "Dashboard", icon: homeIcon, to: "/", active: true },
  { title: "Orders", icon: ordersIcon, to: "/orders", active: false },
  { title: "Users", icon: usersIcon, to: "/users", active: false },
  { title: "Items", icon: itemsIcon, to: "/items", active: false },
  { title: "Transactions", icon: transactionsIcon, to: "/transactions", active: false },
  { title: "Reports", icon: reportsIcon, to: "/reports", active: false },
  { title: "Messages", icon: messagesIcon, to: "/", active: false },
  // { title: "Register", icon: registerIcon, to: "/auth/register", active: false },
  { title: "Settings", icon: settingsIcon, to: "/", active: false },
  { title: "Login", icon: loginICon, to: "/auth/login", active: false },

]);

// ✅ Function to set the active link
const setActive = (index) => {
  sideBarItems.value.forEach((item, i) => {
    item.active = i === index; // Set only the clicked item as active
  });
};
</script>

<style lang="scss">
.sidebar {
  background-color: var(--v-theme-background);
  ;
  width: 273px;
  padding: 0 15px;
  border: none;

  .logo {
    padding: 15px 30px;
  }

  .nav-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    border-radius: 8px !important;
    transition: background-color 0.3s ease;
    width: 100%;
    padding: 4px 30px;

    &:hover {
      .v-list-item-title {
        color: #0561fc;
      }
    }

    .v-list-item {
      padding: 0px;
    }

    .v-list-item-title {
      color: #aeb9be;
      font-size: 16px;
      font-weight: 600 !important;
      font-family: "Renner" !important;
      margin: 0 10px;
      transition: color 0.3s ease;
    }

    .v-badge {
      margin-left: auto;

      .v-badge__badge {
        background-color: #fb7b7b !important;
      }
    }
  }

  .active-link {
    background-color: #edf4ff;
    border-radius: 8px !important;

    .v-list-item-title {
      color: #0561fc;
      transition: color 0.3s ease;
    }
  }
}

/* Sidebar overlay on mobile */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 9999;
  }
}
</style>
