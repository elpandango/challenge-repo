<template>
  <button
    :class="[
      'px-4 py-2 text-white transition-opacity',
      baseClasses,
      additionalClasses,
      {
        'rounded-md': !isFirst && !isMiddle && !isLast,
        'rounded-l-md': isFirst,
        'rounded-r-md': isLast,
        'rounded-none': isMiddle,
        'opacity-100': isActive,
        'opacity-50': !isActive,
        '!cursor-not-allowed !opacity-50': disabled,
      },
    ]"
    :type="type"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
const {
  baseClasses,
  additionalClasses,
  type,
  isFirst,
  isLast,
  isMiddle,
  isActive,
} = defineProps({
  baseClasses: {
    type: String,
    default: "bg-accent hover:opacity-100 cursor-pointer text-sm",
  },
  additionalClasses: {
    type: String,
    default: "",
  },
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  isFirst: Boolean,
  isLast: Boolean,
  isMiddle: Boolean,
  isActive: Boolean,
  disabled: Boolean,
});

const onClick = () => {
  emit("update:modelValue", true);
};
</script>
