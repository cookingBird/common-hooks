import { type MaybeRefOrGetter, watch, toValue, ref } from 'vue';
export default function useInnerProps<T>(propValue: MaybeRefOrGetter<T>) {
  const innerValue = ref<T>(toValue(propValue));
  watch(
    () => toValue(propValue),
    (val) => {
      innerValue.value = val;
    },
  );
  return innerValue;
}
