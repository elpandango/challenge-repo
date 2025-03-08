<template>
  <article class="card w-full max-w-[600px] bg-white rounded-md shadow-md">
    <header
      class="header bg-accent h-[60px] rounded-t-md shadow-md flex items-center justify-between px-6 mb-2"
    >
      <h2 class="text-white text-xl">{{ title }}</h2>
      <BaseIcon name="magnifying-glass-solid" size="18" color="white" />
    </header>
    <div class="content pb-3">
      <slot />
    </div>
  </article>
</template>

<script setup lang="ts">
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";

defineProps<{
  title: string;
}>();
</script>

<style scoped></style>
