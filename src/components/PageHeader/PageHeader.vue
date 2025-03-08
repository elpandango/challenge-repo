<template>
  <header
    class="header h-[50px] bg-accent text-white pt-1 px-6 flex items-center justify-between shadow-md mb-[60px]"
  >
    <div class="text-4xl font-bebas-neue mr-[60px]">GO.VITAL</div>

    <button class="lg:hidden text-white text-2xl" @click="toggleMenu">
      ☰
    </button>

    <nav
      :class="['nav', { open: isMenuOpen }]"
      class="absolute z-10 py-10 top-[50px] left-0 w-full bg-accent lg:flex flex-col lg:top-[100%] lg:py-0 lg:relative lg:flex-row lg:space-x-6 lg:h-full items-center lg:items-center hidden"
    >
      <RouterLink to="/" :class="getLinkClass('/')">Start</RouterLink>
      <RouterLink to="/patienten" :class="getLinkClass('/patienten')">
        Patienten
      </RouterLink>
      <RouterLink to="/kurven" :class="getLinkClass('/kurven')">
        Kurven
      </RouterLink>
      <RouterLink to="/einstellungen" :class="getLinkClass('/einstellungen')">
        Einstellungen
      </RouterLink>
      <RouterLink to="/protokoll" :class="getLinkClass('/protokoll')">
        Protokoll
      </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const getLinkClass = (path: string) => {
  return {
    "border-white font-semibold text-white": route.path === path,
    "relative flex h-full items-center px-4 m-0 border-b-3 border-transparent hover:border-white text-lg font-light":
      true,
  };
};
</script>

<style scoped>
.nav {
  transition: transform 0.3s ease-in-out;
  transform: translateY(-100%);
}

.nav.open {
  transform: translateY(0);
  display: flex;
  flex-direction: column;
}
</style>
