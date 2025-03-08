<template>
  <article class="card">
    <header class="header">
      <h2>{{ title }}</h2>
    </header>
    <div class="content">
      <slot />
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped>
.card {
  max-width: 600px;
  background: fuchsia;
  /* ... */
}
</style>
