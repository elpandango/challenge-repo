<template>
  <main class="page">
    <ContentCard title="Protokoll" class="contentCad">
      Protokollliste soll hier sein
    </ContentCard>
  </main>
</template>

<script setup lang="ts">
import ContentCard from "@/components/ContentCard/ContentCard.vue";
import { useProtokollStore } from "@/stores/protokoll";
import { onMounted } from "vue";

const protokollStore = useProtokollStore();

// ...

onMounted(async () => {
  await protokollStore.request();
});
</script>

<style scoped>
.page {
  width: 100%;
  padding: 10px;
  background: springgreen;
  /* --- */
}
</style>
