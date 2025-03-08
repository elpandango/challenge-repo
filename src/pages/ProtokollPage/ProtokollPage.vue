<template>
  <div class="container flex w-full max-w-[1366px] px-4 items-start mx-auto">
    <ContentCard title="Protokoll" class="contentCard">
      <CardFilters
        :activeFilter="activeFilter"
        @update:activeFilter="protokollStore.setFilter"
      />

      <ProtokollList :items="protokollStore?.formattedItems" />

      <Pagination
        :page="protokollStore.metaData.page"
        :page_count="protokollStore.metaData.pageCount"
        @update:page="protokollStore.setPage"
      />
    </ContentCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useProtokollStore } from "@/stores/protokoll";
import ContentCard from "@/components/ContentCard/ContentCard.vue";
import CardFilters from "@/components/CardFilters/CardFilters.vue";
import ProtokollList from "@/components/ProtokollList/ProtokollList.vue";
import Pagination from "@/components/Pagination/Pagination.vue";

const activeFilter = ref("Alle");
const protokollStore = useProtokollStore();

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
