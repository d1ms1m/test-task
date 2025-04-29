<template>
  <div class="input__wrapper">
    <label class="label">{{label}}</label>
    <slot name="input">
      <input
        v-model="model"
        :type="type"
        class="input"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string,
  type?: string,
}>(), {
  type: 'text',
})

const model = defineModel()
</script>

<style lang="scss" scoped>
.input__wrapper {
  &:hover,
  &:has(input:focus, button:focus) {
    outline-color: var(--primary-color);
  }
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  outline: 1px solid var(--color-border);
  padding: 10px 20px;
  .label {
    font-size: 12px;
    line-height: 16px;
    //margin-bottom: 5px;
  }
  .input {
    all: unset;
    background: var(--color-background);
    color: var(--color-text);
  }
}
</style>
