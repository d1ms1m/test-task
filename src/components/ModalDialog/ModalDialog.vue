<template>
  <transition name="modal">
    <div v-if="shown" class="modal-mask">
      <div class="modal-wrapper" @click.self="onClickOutside">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer" >
              default footer
              <button class="modal-default-button" @click="submit">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  width?: number,
  closeOnClickOutside?: boolean
}>(), {
  width: 300,
  closeOnClickOutside: true
})

const shown = ref(false)

function show(show: boolean = true) {
  shown.value = show
  if (show) {
    emit('show')
  } else {
    emit('close')
  }
}

function submit() {
  show(false)
}

const emit = defineEmits(['show', 'close'])

function onClickOutside() {
  if (props.closeOnClickOutside) {
    show(false)
  }
}

defineExpose({
  show,
})
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: calc(v-bind(width) * 1px);
  margin: 0 auto;
  padding: 20px;
  background-color: var(--color-background);
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  font-size: 20px;
  line-height: 24px;
  h3 {
    margin-top: 0;
    color: var(--primary-color);
  }
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
