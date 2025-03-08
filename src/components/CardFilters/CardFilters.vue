<template>
  <div class="flex justify-center py-4 mb-2">
    <BaseButton
      is-first
      :is-active="protokollStore.currentFilter === undefined"
      @click="protokollStore.setFilter('alle')"
    >
      Alle
    </BaseButton>

    <BaseButton
      is-middle
      :is-active="protokollStore.currentFilter === 'fehler'"
      @click="protokollStore.setFilter('Fehler')"
    >
      Fehler
    </BaseButton>

    <BaseButton
      is-middle
      :is-active="protokollStore.currentFilter === 'warnung'"
      @click="protokollStore.setFilter('Warnung')"
    >
      Warnung
    </BaseButton>

    <BaseButton
      is-last
      :is-active="protokollStore.currentFilter === 'log'"
      @click="protokollStore.setFilter('Log')"
    >
      Log
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { useProtokollStore } from "@/stores/protokoll";
import BaseButton from "@/components/BaseButton/BaseButton.vue";

const protokollStore = useProtokollStore();
</script>
