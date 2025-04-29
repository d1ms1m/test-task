<template>
  <input-wrapper :label="label">
    <template #input>
      <select-button
        :items="options"
        :value="selectedOption"
        @input="onSelectInput"
      >
        <template #selected="{ item }">
          <span>{{ item?.label }}</span>
          <span class="badge" :style="{ backgroundColor: item?.value }"></span>
        </template>
        <template #option="{ item }">
          <span>{{ item.label }}</span>
          <span class="badge" :style="{ backgroundColor: item?.value }"></span>
        </template>
      </select-button>
    </template>
  </input-wrapper>
  <color-picker v-model="model" mode="solid" :showColorList="false" type="HEX" :theme="theme" />
</template>

<script setup lang="ts">
import { Vue3ColorPicker as ColorPicker } from '@cyhnkckali/vue3-color-picker'

import { nextTick, ref, watch } from 'vue'
import type { Theme } from '@cyhnkckali/vue3-color-picker/dist/core/types/types'
import SelectButton from '@/components/inputs/SelectButton.vue'
import InputWrapper from '@/components/inputs/InputWrapper.vue'
import type { Item } from '@/components/inputs/interfaces.ts'

withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Цвет',
  },
)

const DEFINED_COLORS: Array<Item> = [
  { label: 'Зеленый', value: '#4bc0c0' },
  { label: 'Красный', value: '#ff6384' },
  { label: 'Желтый', value: '#ffcd56' },
]

const selectedOption = ref(DEFINED_COLORS[1])

const options = ref(DEFINED_COLORS)

const theme = ref<Theme>('dark')
if (window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches) {
  theme.value = 'light'
}

const model = defineModel<string>( {default: ''})

watch(model, v => {
  if (v.toLowerCase() === selectedOption.value.value.toLowerCase()) {
    return
  }
  const item = options.value.find((item) => item.value === v)
  if (item) {
    selectedOption.value = item
  } else {
    selectedOption.value = { label: 'Пользовательский цвет', value: v }
    options.value = [
      selectedOption.value,
      ...DEFINED_COLORS,
    ]
  }
})

function onSelectInput(item: Item) {
  selectedOption.value = item
  nextTick(() => {
    model.value = item.value
  })
}
</script>

<style lang="scss" scoped>
@use '@/assets/badge';

::v-deep(.badge){
  width: 24px;
  height: 24px;
  border-radius: 12px;
}

.ck-cp-container {
  width: 100%;
}

::v-deep(.select-button) {
  padding: 0;
}
</style>
