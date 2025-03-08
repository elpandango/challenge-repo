<template>
  <template v-if="isUserAuthorized">
    <PageHeader />
    <RouterView />
    <PageFooter />
  </template>
  <EmptyTokenWarning v-else />
</template>

<script setup lang="ts">
import PageHeader from "@/components/PageHeader/PageHeader.vue";
import PageFooter from "@/components/PageFooter/PageFooter.vue";
import { useUserStore } from "@/stores/user";
import { computed, onMounted } from "vue";
import EmptyTokenWarning from "@/components/EmptyTokenWarning/EmptyTokenWarning.vue";

const userStore = useUserStore();

const isUserAuthorized = computed(() => userStore.isUserAuthorized);

const getToken = (): string | null => {
  // ..
  return `Bearer {token}`; // change token here
  // return null; // change token here
};

onMounted(() => {
  userStore.setToken(getToken());
});
</script>

<style scoped></style>
