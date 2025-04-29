import type { Ref } from 'vue'

export default function useClickOutside(el: Ref<Element | null>) {

  const isOutsideClicked = (event: Event) => el.value && !el.value.contains(event.target as Node)

  return { isOutsideClicked }
}
