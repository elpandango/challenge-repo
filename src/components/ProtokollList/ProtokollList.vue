<template>
  <div v-for="(item, index) in items" :key="index">
    <ProtokollItem
      :title="item.title"
      :subtitle="item.subtitle"
      :icon="item.icon"
      :class="index === items.length - 1 ? 'last:border-none' : ''"
    />
  </div>
</template>

<script setup>
import ProtokollItem from "./ProtokollItem.vue";

defineProps({
  items: Array,
});
</script>
