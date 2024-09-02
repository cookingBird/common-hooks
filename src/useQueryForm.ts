import { ref } from 'vue';
export default function useQueryForm<T>(_default: T) {
  const query = ref({ ..._default });
  return {
    query,
    reset() {
      // @ts-expect-error
      query.value = { ..._default };
    },
  };
}
