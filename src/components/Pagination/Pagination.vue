<template>
  <div class="flex justify-end px-4">
    <nav aria-label="Page navigation">
      <ul class="list-none flex p-0 m-0">
        <li class="flex justify-center items-center">
          <BaseButton
            class="w-15"
            :disabled="props.page <= 1"
            @click="emitPageChange(props.page - 1)"
          >
            Prev
          </BaseButton>
        </li>

        <li
          v-if="pagesToShow[0] !== 1"
          class="flex justify-center items-center"
        >
          <BaseButton
            class="w-[45px] !min-w-[45px] !px-2"
            :aria-label="'Go to page 1'"
            @click="emitPageChange(1)"
          >
            1
          </BaseButton>
        </li>

        <li
          v-if="pagesToShow[0] > 2"
          class="inline-flex items-center px-2 text-gray-400"
        >
          ...
        </li>

        <li
          v-for="page in pagesToShow"
          :key="page"
          class="flex justify-center items-center"
        >
          <BaseButton
            class="w-[45px] !min-w-[45px] !px-2"
            :aria-label="`Go to page ${page}`"
            @click="emitPageChange(page)"
          >
            {{ page }}
          </BaseButton>
        </li>

        <li
          v-if="pagesToShow[pagesToShow.length - 1] < props.page_count - 1"
          class="inline-flex items-center px-2 text-gray-400"
        >
          ...
        </li>

        <li
          v-if="pagesToShow[pagesToShow.length - 1] !== props.page_count"
          class="flex justify-center items-center"
        >
          <BaseButton
            class="w-[45px] !min-w-[45px] !px-2"
            :aria-label="`Go to page ${props.page_count}`"
            @click="emitPageChange(props.page_count)"
          >
            {{ props.page_count }}
          </BaseButton>
        </li>

        <li class="flex justify-center items-center">
          <BaseButton
            class="w-15"
            :disabled="props.page >= props.page_count"
            @click="emitPageChange(props.page + 1)"
          >
            Next
          </BaseButton>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BaseButton from "@/components/BaseButton/BaseButton.vue";

const emits = defineEmits(["page-changed"]);

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  page_count: {
    type: Number,
    required: true,
  },
});

const emitPageChange = (page: number) => {
  if (page >= 1 && page <= props.page_count) {
    emits("page-changed", page);
  }
};

const pagesToShow = computed(() => {
  const { page, page_count } = props;
  const isMobile = window.innerWidth <= 768;
  const maxVisible = isMobile ? 3 : 5;
  const pages = [];

  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(page_count, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>

<style></style>
