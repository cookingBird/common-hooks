import { ref, watch, unref, type Ref, type MaybeRef } from 'vue';
import { merge } from 'lodash'

export default function useDefaultRef<T extends object>(origin: T, val: MaybeRef<T>, _merge: (origin: T, val: T) => T = merge) {
  const res = ref({
    ...origin
  });
  watch(() => unref(val), (val: T) => {
    res.value = _merge(origin, val)
  }, { immediate: true })
  return res;
}
