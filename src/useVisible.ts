import { computed, type Ref } from 'vue';

export default function useVisible<T>(state: Ref<T>) {
  return computed({
    get() {
      return Boolean(state.value)
    },
    set(val: boolean) {
      if (typeof val === 'boolean') {
        if (val === false) {
          state.value = null
        }
      } else {
        throw Error('can not set useVisible not boolean')
      }
    }
  })
}
