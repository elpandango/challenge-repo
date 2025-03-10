<template>
  <div class="flex items-start gap-5 py-3 px-4 border-b border-b-gray-100">
    <div class="icon w-[20px] py-4">
      <BaseIcon
        :key="icon"
        :name="icon"
        size="18"
        class="text-secondary-text"
      />
    </div>

    <div class="flex flex-col flex-1">
      <p class="text-md text-primary-text">{{ message }}</p>
      <p class="text-sm text-secondary-text">{{ meta }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";

defineProps({
  message: String,
  meta: String,
  icon: String,
});
</script>
