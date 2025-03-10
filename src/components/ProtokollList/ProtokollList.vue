<template>
  <div v-if="items.length === 0" class="text-center text-gray-500 py-4">
    Keine Daten zum Anzeigen
  </div>
  <template v-else>
    <div v-for="(item, index) in items" :key="index">
      <ProtokollItem
        :meta="item.meta"
        :message="item.message"
        :icon="item.icon"
        :class="index === items.length - 1 ? 'last:border-none' : ''"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import ProtokollItem from "./ProtokollItem.vue";

defineProps<{
  items: Array<{ meta: string; message: string; icon: string }>;
}>();
</script>
