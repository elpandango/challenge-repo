<template>
  <component :is="IconComponent" v-bind="iconStyle" />
</template>

<script setup>
import { defineAsyncComponent, computed } from "vue";

const props = defineProps({
  name: String,
  size: {
    type: [String, Number],
    default: 24,
  },
  color: {
    type: String,
    default: "currentColor",
  },
});

const IconComponent = defineAsyncComponent(
  () => import(`@/assets/icons/${props.name}.svg`),
);

const iconStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  fill: props.color,
}));
</script>
