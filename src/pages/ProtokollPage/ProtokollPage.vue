<template>
  <div class="container flex w-full max-w-[1366px] px-4 items-start mx-auto">
    <ContentCard title="Protokoll" class="contentCad">
      <CardFilters
        :activeFilter="activeFilter"
        @update:activeFilter="activeFilter = $event"
      />

      <ProtokollList :items="protokolListItems" />

      <Pagination />
    </ContentCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useProtokollStore } from "@/stores/protokoll";
import { onMounted } from "vue";
import ContentCard from "@/components/ContentCard/ContentCard.vue";
import CardFilters from "@/components/CardFilters/CardFilters.vue";
import ProtokollList from "@/components/ProtokollList/ProtokollList.vue";
import Pagination from "@/components/Pagination/Pagination.vue";

const activeFilter = ref("Alle");
const protokollStore = useProtokollStore();

const protokolListItems = [
  {
    title: "Messung erstellt (Gewicht) für Patient Anni Albers",
    subtitle: "vor 10 Minuten von joy.monika",
    icon: "check",
  },
  {
    title: "Messung bearbeitet (Gewicht) für Patient Anni Albers",
    subtitle: "vor 10 Minuten von joy.monika",
    icon: "edit",
  },
  {
    title: "Fehler beim Einloggen",
    subtitle: "vor 10 Minuten von User joy.monika",
    icon: "warning",
  },
];
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
