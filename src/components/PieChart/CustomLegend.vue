<template>
  <div class="legend-container">
    <div
      class="legend-item"
      v-for="(item, index) in items"
      :key="index"
    >
      <span
        :style="{ 'background-color': item.color }"
        class="badge"
      ></span>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CustomLegendItem } from '@/components/PieChart/interfaces.ts'

const props = defineProps({
  items: {
    type: Array<CustomLegendItem>,
    default: () => [],
  },
})

</script>


<style lang="scss" scoped>
@use "@/assets/badge.scss";

.legend-container {
  padding: 1em;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 14px;
  justify-content: center;

  .legend-item {
    display: flex;
    align-items: center;
  }

  .badge {
    margin-right: 12px;
  }
}
</style>
