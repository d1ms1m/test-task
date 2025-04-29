<template>
  <main>
    <div class="title">
      <h1>Круговая диаграмма</h1>
    </div>
    <div class="content-wrapper">
      <div class="column">
        <div class="sectors">
          <sector-list
            :data="sectors"
            @add="onAddSector"
            @edit="onEditSector"
            @delete="onDeleteSector"
          />
          <modal-dialog ref="modalRef" :width="390">
            <template #header> Добавление сектора </template>
            <template #body>
              <sector-form v-model="formData" />
            </template>
            <template #footer>
              <add-button :label="`${actionName} сектор`" @click="onAddSectorSubmit" />
            </template>
          </modal-dialog>
        </div>
      </div>
      <div class="column">
        <pie-chart :data="sectors" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import SectorList from '@/components/SectorList/SectorList.vue'
import { type SectorListItemData } from '@/components/SectorList/interfaces.ts'
import PieChart from '@/components/PieChart/PieChart.vue'
import ModalDialog from '@/components/ModalDialog/ModalDialog.vue'
import { ref, useTemplateRef } from 'vue'
import AddButton from '@/components/buttons/AddButton.vue'
import SectorForm from '@/components/SectorList/SectorForm.vue'

const DEFAULT_FORM_DATA = { name: '', value: 0, color: '' }
const DEFAULT_SECTORS = [
  { name: 'Сектор-1', value: 10, color: '#41B883' },
  { name: 'Сектор-2', value: 20, color: '#E46651' },
  { name: 'Сектор-3', value: 30, color: '#00D8FF' },
]
const actionName = ref('Добавить')
const modalRef = useTemplateRef<typeof ModalDialog>('modalRef')
const formData = ref(DEFAULT_FORM_DATA)
const sectors = ref<Array<SectorListItemData>>(DEFAULT_SECTORS)

function onAddSector() {
  formData.value = { ...DEFAULT_FORM_DATA }
  actionName.value = 'Добавить'
  modalRef.value!.show()
}

function onAddSectorSubmit() {
  if (!formData.value.name) {
    modalRef.value!.show(false)
    return
  }
  const editedSector = sectors.value.find((sector) => sector.name === formData.value.name)
  if (editedSector) {
    Object.assign(editedSector, formData.value)
  } else {
    sectors.value.push(formData.value)
  }
  modalRef.value!.show(false)
}

function onEditSector(item: SectorListItemData) {
  formData.value = { ...item }
  actionName.value = 'Изменить'
  modalRef.value!.show()
}

function onDeleteSector(item: SectorListItemData) {
  sectors.value = sectors.value.filter((sector) => sector.name !== item.name)
}
</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;
}
.title {
  h1 {
    padding-left: 10px;
    padding-bottom: 30px;
    font-size: 32px;
    line-height: 39px;
  }

  margin-bottom: -1px;
  border-bottom: var(--color-border) solid 1px;
}

.content-wrapper {
  padding-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  align-items: start ;
  justify-content: center;

  .column {
    min-width: 500px;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .sectors {
    width: 100%;
  }
}
</style>
