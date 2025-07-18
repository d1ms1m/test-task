<template>
  <div ref="el" class="custom-select">
    <label v-if="label" class="label">{{label}}</label>
    <button
      id="dropdown-button"
      class="select-button"
      role="combobox"
      aria-label="select button"
      aria-haspopup="listbox"
      aria-expanded="false"
      aria-controls="select-dropdown"
      @click="onSelectButtonClick"
      @keydown="onSelectButtonKeydown"
    >
      <span class="selected-value">
        <slot name="selected" :item="selectedItem">
          {{selectedItem?.label}}
        </slot>
      </span>
      <span class="arrow"></span>
    </button>
    <ul
      class="select-dropdown hidden"
      role="listbox"
      id="select-dropdown"
      aria-labelledby="dropdown-button"
      @keydown="onDropdownKeydown"
    >
      <template v-for="(item, index) in items" :key="index">
        <li role="option"

            :data-value="item.value"
            :class="{selected: item.value === selectedItem?.value}"
            @click="handleOptionSelect(item)"
        >
          <slot name="option" :item="item">
            {{item.label}}
          </slot>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts"> // based on https://blog.logrocket.com/creating-custom-select-dropdown-css/
import { onBeforeUnmount, onMounted, type Ref, ref, watch } from 'vue'
import type { Item } from '@/components/inputs/interfaces.ts'
import useClickOutside from '@/composables/useClickOutside.ts'

const props = withDefaults(
  defineProps<{
    label?: string
    firstAutoSelect?: boolean
    items?: Array<Item>
    value?: Item
  }>(),
  {
    firstAutoSelect: true,
    items: () => [],
  },
)

const emit = defineEmits<{
  (e: 'input', item: Item): void
}>()


const el: Ref<Element | null> = ref(null)
const {isOutsideClicked} = useClickOutside(el)

const selectButton: Ref<HTMLElement | null> = ref(null)
const dropdown: Ref<HTMLElement | null> = ref(null)
const options: Ref<NodeListOf<HTMLLIElement> | null> = ref(null)

const selectedItem = ref<Item | null>(null)

const focusedIndex: Ref<number> = ref(-1)

function init() {
  selectButton.value = el.value!.querySelector('.select-button')
  dropdown.value = el.value!.querySelector('.select-dropdown')
  options.value = dropdown.value!.querySelectorAll('li')
}

function cleanup() {
  selectButton.value = null
  dropdown.value = null
  options.value = null
}

function onSelectButtonClick() {
  toggleDropdown()
}

function onSelectButtonKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    toggleDropdown(true)
  } else if (event.key === 'Escape') {
    toggleDropdown(false)
  }
}

function onDropdownKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    focusedIndex.value = (focusedIndex.value + 1) % options.value!.length
    updateFocus()
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    focusedIndex.value = (focusedIndex.value - 1 + options.value!.length) % options.value!.length
    updateFocus()
  } else if (event.key === 'Enter' || event.key === ' ' || event.key === 'Tab') {
    event.preventDefault()
    handleOptionSelect(props.items[focusedIndex.value])
    toggleDropdown(false)
  } else if (event.key === 'Escape') {
    toggleDropdown(false)
  }
}

function onClickOutside(event: Event) {
  console.log('!!!')
  const isOutsideClick = isOutsideClicked(event)

  if (isOutsideClick) {
    toggleDropdown(false)
  }
}

function toggleDropdown(expand: boolean | null = null) {
  if (!dropdown.value) return
  const isOpen = expand !== null ? expand : dropdown.value!.classList.contains('hidden')
  dropdown.value!.classList.toggle('hidden', !isOpen)
  selectButton.value!.setAttribute('aria-expanded', isOpen.toString())

  if (isOpen) {
    focusedIndex.value = [...options.value!].findIndex((option) => option.classList.contains('selected'))
    focusedIndex.value = focusedIndex.value === -1 ? 0 : focusedIndex.value
    document.addEventListener('click', onClickOutside)
    updateFocus()
  } else {
    focusedIndex.value = -1
    document.removeEventListener('click', onClickOutside)
    selectButton.value!.focus()

  }
}

function updateFocus() {
  options.value!.forEach((option, index) => {
    if (option) {
      option.setAttribute('tabindex', index === focusedIndex.value ? '0' : '-1')
      if (index === focusedIndex.value) option.focus()
    }
  })
}

function handleOptionSelect(item: Item) {
  selectedItem.value = item
  toggleDropdown(false)
  emit('input', selectedItem.value)
}

watch(() => props.items, () => {
  if (!props.value && props.firstAutoSelect) {
    handleOptionSelect(props.items[0])
  }
}, {immediate: true, deep: true})

watch(() => props.value, item => {
    handleOptionSelect(item!)
}, {immediate: true, deep: true})

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  cleanup()
})
</script>

<style lang="scss" scoped>
@use "styles.scss";

.custom-select {
  //margin-top: 3rem;
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 100%;
}

.select-button {
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.675em 1em;
  //border: 1px solid #caced1;
  border: none;
  border-radius: 0.25rem;
  color: var(--color-text);
  background-color: var(--color-background);
  cursor: pointer;

  .selected-value {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 8px;
  }
}

.arrow {
  //border-left: 5px solid transparent;
  //border-right: 5px solid transparent;
  //border-top: 6px solid var(--color-text);
  transition: transform ease-in-out 0.3s;

  display: inline-block;
  width: 6px;
  height: 6px;
  //margin: -3px 5px 3px;
  border: solid var(--color-text);
  border-width: 0 1px 1px 0;
  transform: rotate( 45deg);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  background-color: var(--color-background);
  list-style: none;
  padding: 10px;
  margin: 10px 0 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;

  li {
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    align-items: center;

    &.selected {
      background-color: var(--color-background-soft);
      border-radius: 4px;
      font-weight: bold;
    }

    &:hover,
    &:focus-visible,
    &:focus {
      background-color: var(--color-background-soft);
      border-radius: 4px;
      outline: none;
    }
  }

  &.hidden {
    display: none;
  }

  //&::-webkit-scrollbar {
  //  width: 7px;
  //}
  //&::-webkit-scrollbar-track {
  //  background: #f1f1f1;
  //  border-radius: 25px;
  //}

  //&::-webkit-scrollbar-thumb {
  //  background: #ccc;
  //  border-radius: 25px;
  //}
}

.select-button[aria-expanded='true'] .arrow {
  //transform: rotate(180deg);
  transform: rotate(225deg);
}
</style>
