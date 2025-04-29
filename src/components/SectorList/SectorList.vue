<template>
  <div class="sector-list__wrapper">
    <sector-list-item
      v-for="(item, index) in props.data"
      :key="index"
      :item="item"
      @edit="emit('edit', item)"
      @delete="emit('delete', item)"
    />
    <add-button @click="onAddSectorClick"/>
  </div>
</template>

<script setup lang="ts">
import {type SectorListItemData} from '@/components/SectorList/interfaces.ts'
import SectorListItem from '@/components/SectorList/SectorListItem.vue'
import AddButton from '@/components/buttons/AddButton.vue'

interface Props {
  data: Array<SectorListItemData>
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

const emit = defineEmits<{
  (e: 'add'): void,
  (e: 'edit', item: SectorListItemData): void,
  (e: 'delete', item: SectorListItemData): void
}>()

function onAddSectorClick() {
  emit('add')
}
</script>

<style lang="scss" scoped>
.sector-list__wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
