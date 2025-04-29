<template>
  <button
    class="add-button"
    v-bind="$attrs"
  >
    {{label}}
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string,
}>(), {
  label: 'Добавить сектор',
})
</script>

<style scoped>
.add-button {
  cursor: pointer;
  padding: 18px 36px;
  width: 100%;
  line-height: 24px;
  font-size: 16px;
  color: white;
  height: 60px;
  border-radius: 10px;
  background: var(--primary-color);
  border: none;
}
</style>
