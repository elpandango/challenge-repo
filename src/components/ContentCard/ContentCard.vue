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
        class="w-full px-3 py-1 text-white rounded-md border border-white ring-1 ring-white focus:outline-none bg-transparent"
        placeholder="Suchen..."
        @blur="handleBlur"
        @input="showSearchButton = !!protokollStore.searchQuery"
        @keyup.enter="submitSearch"
      />

      <button v-if="showSearchButton" class="ml-2" @click="submitSearch">
        <BaseIcon name="magnifying-glass-solid" size="16" color="white" />
      </button>

      <button class="ml-2" @click="toggleSearch">
        <BaseIcon
          :key="isSearching"
          :name="isSearching ? 'circle-xmark-solid' : 'magnifying-glass-solid'"
          size="18"
          color="white"
          class="cursor-pointer"
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

const protokollStore = useProtokollStore();
const isSearching = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);
const showSearchButton = ref(false);

const toggleSearch = async () => {
  isSearching.value = !isSearching.value;
  if (isSearching.value) {
    await nextTick();
    searchInput.value?.focus();
  } else {
    protokollStore.setSearchQuery("");
    isSearching.value = false;
    showSearchButton.value = false;
  }
};

const handleBlur = () => {
  if (!protokollStore.searchQuery) {
    isSearching.value = false;
    showSearchButton.value = false;
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
    showSearchButton.value = false;
  },
);
</script>

<style scoped></style>
