<template>
  <div class="sector-form" ref="el">
    <input-wrapper v-model="model.name" label="Наименование" />
    <input-wrapper v-model="model.value" type="number" label="Значение" />
    <form-color-picker v-model="model.color"/>
  </div>
</template>

<script setup lang="ts">
import FormColorPicker from '@/components/inputs/FormColorPicker.vue'
import InputWrapper from '@/components/inputs/InputWrapper.vue'
import { onMounted, ref } from 'vue'
import type { SectorListItemData } from '@/components/SectorList/interfaces.ts'

const el = ref<HTMLElement | null>(null)

const model = defineModel<SectorListItemData>({required: true})

onMounted(() => {
  el.value!.querySelector('input')!.focus()
})
</script>

<style lang="scss" scoped>
.sector-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
