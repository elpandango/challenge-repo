<template>
  <div class="flex items-center gap-5 py-3 px-4 border-b border-b-gray-100">
    <BaseIcon
      :name="'magnifying-glass-solid'"
      size="16"
      class="text-secondary-text"
    />

    <div class="flex flex-col">
      <p class="text-md text-primary-text">{{ title }}</p>
      <p class="text-sm text-secondary-text">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";

defineProps({
  title: String,
  subtitle: String,
  icon: String,
});
</script>
