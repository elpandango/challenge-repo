<template>
  <article class="card w-full max-w-[600px] bg-white rounded-md shadow-md">
    <header
      class="header bg-accent h-[60px] rounded-t-md shadow-md flex items-center justify-between px-6 mb-2"
    >
      <h2 v-if="!isSearching" class="text-white text-xl">{{ title }}</h2>

      <input
        v-else
        ref="searchInput"
        v-model="protokollStore.searchQuery"
        type="text"
        class="w-full px-3 py-1 text-white rounded-md border border-transparent focus:border-white focus:ring-1 focus:ring-white focus:outline-none bg-transparent"
        placeholder="Suchen..."
        @blur="handleBlur"
        @keyup.enter="submitSearch"
      />

      <button class="ml-2" @click="toggleSearch">
        <BaseIcon
          :name="isSearching ? 'xmark-solid' : 'magnifying-glass-solid'"
          size="18"
          color="white"
        />
      </button>
    </header>

    <div class="content pb-3">
      <slot />
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from "vue";
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";
import { useProtokollStore } from "@/stores/protokoll";

defineProps<{
  title: string;
}>();

const isSearching = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);
const protokollStore = useProtokollStore();

const toggleSearch = async () => {
  isSearching.value = !isSearching.value;
  if (isSearching.value) {
    await nextTick();
    searchInput.value?.focus();
  } else {
    protokollStore.setSearchQuery("");
    isSearching.value = false;
  }
};

const handleBlur = () => {
  if (!protokollStore.searchQuery) {
    isSearching.value = false;
  }
};

const submitSearch = async () => {
  await protokollStore.setSearchQuery(protokollStore.searchQuery);
};

watch(
  () => protokollStore.activeFilter,
  () => {
    protokollStore.setSearchQuery("");
    isSearching.value = false;
  },
);
</script>

<style scoped></style>
