<template>
  <div class="sector-list-item">
    <div class="data">
      <div class="name">{{ props.item.name }}</div>
      <div class="divider" />
      <div class="value">{{ props.item.value }}</div>
      <div class="divider" />
      <div class="color">
        <span class="badge" :style="{ backgroundColor: item.color }"></span>
      </div>
    </div>
    <div class="actions">
      <button @click="onEditClick">
        <edit-minus-icon/>
      </button>
      <button @click="onDeleteClick">
        <delete-icon/>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SectorListItemData } from '@/components/SectorList/interfaces.ts'
import EditMinusIcon from '@/components/icons/EditMinusIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

interface Props {
  item: SectorListItemData
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'edit', item: SectorListItemData): void
  (e: 'delete', item: SectorListItemData): void
}>()

function onEditClick() {
  emit('edit', props.item)
}

function onDeleteClick() {
  emit('delete', props.item)
}
</script>

<style scoped lang="scss">
@use '@/assets/badge.scss';

.badge {
  width: 20px;
  height: 20px;
  border-radius: 10px;
}

.sector-list-item {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  padding: 18px 20px;
  background-color: var(--color-background-soft);
  border-radius: 10px;
  .data {
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;

    .divider {
      border-left: 2px solid var(--color-border);
      height: 16px;
    }

    .name {
      padding-right: 25px;
    }

    .value,
    .color {
      padding: 0 25px;
      display: flex;
      align-content: center;
    }
  }

  .actions {
    flex: 0 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  button {
    cursor: pointer;
    padding: 5px;
    border: none;
    background-color: transparent;
    color: var(--color-text);
    font-size: 0;

    &:hover {
      background-color: var(--color-border);
      border-radius: 5px;
    }
  }
}
</style>
