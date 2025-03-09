<template>
  <div class="container flex w-full max-w-[1366px] px-4 items-start mx-auto">
    <ContentCard title="Protokoll" class="contentCard">
      <CardFilters
        :activeFilter="activeFilter"
        @update:activeFilter="protokollStore.setFilter"
      />

      <div v-if="protokollStore.isLoading" class="flex justify-center py-10">
        <div
          class="w-10 h-10 border-4 border-gray-300 border-t-accent rounded-full animate-spin"
        ></div>
      </div>

      <ProtokollList
        v-else-if="protokollStore.lastResponse?.items.length"
        :items="protokollStore.formattedItems"
      />
      <div v-else class="text-center text-secondary-text py-5">
        Keine Einträge gefunden
      </div>

      <PagePagination
        :page="protokollStore.metaData.page"
        :page-count="protokollStore.metaData.pageCount"
        @update:page="protokollStore.setPage"
      />
    </ContentCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useProtokollStore } from "@/stores/protokoll";
import { useUserStore } from "@/stores/user";
import ContentCard from "@/components/ContentCard/ContentCard.vue";
import CardFilters from "@/components/CardFilters/CardFilters.vue";
import ProtokollList from "@/components/ProtokollList/ProtokollList.vue";
import PagePagination from "@/components/PagePagination/PagePagination.vue";

const activeFilter = ref("Alle");
const protokollStore = useProtokollStore();
const userStore = useUserStore();

onMounted(async () => {
  if (!userStore.token) {
    await userStore.fetchToken();
  }
  if (userStore.token) {
    await protokollStore.request();
  } else {
    console.error("Token fetch failed, cannot request protocols.");
  }
});
</script>

<style></style>
