import { ref, watch, toValue, type MaybeRef } from 'vue';
import { merge, mergeWith } from 'lodash';
function customizer<T = any>(objValue: T, srcValue: T) {
  return srcValue || objValue
}

export default function useDefaultRef<T extends object>(origin: T, val: MaybeRef<T>, _merge: (origin: T, val: T) => T = merge) {
  const res = ref({
    ...origin
  });
  watch(() => toValue(val), (val: T) => {
    res.value = {
      ...mergeWith(origin, val, customizer)
    };
  }, { immediate: true, deep: true })
  return res;
}
