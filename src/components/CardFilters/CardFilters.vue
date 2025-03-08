<template>
  <div class="flex justify-center py-4 mb-2">
    <BaseButton
      is-first
      :is-active="activeFilter === 'Alle'"
      @click="$emit('update:activeFilter', 'Alle')"
    >
      Alle
    </BaseButton>

    <BaseButton
      is-middle
      :is-active="activeFilter === 'Fehler'"
      @click="$emit('update:activeFilter', 'Fehler')"
    >
      Fehler
    </BaseButton>

    <BaseButton
      is-middle
      :is-active="activeFilter === 'Warnung'"
      @click="$emit('update:activeFilter', 'Warnung')"
    >
      Warnung
    </BaseButton>

    <BaseButton
      is-last
      :is-active="activeFilter === 'Log'"
      @click="$emit('update:activeFilter', 'Log')"
    >
      Log
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton/BaseButton.vue";

const { activeFilter } = defineProps({
  activeFilter: String,
});
defineEmits(["update:activeFilter"]);
</script>
