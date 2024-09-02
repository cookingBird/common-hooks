import { ref } from 'vue';
export default function useSimpleRequest<
  T extends (...args: any[]) => Promise<any>,
  R = T extends (...args: any[]) => Promise<infer U> ? U : never,
>(fn: T, fallback: () => NoInfer<R>) {
  const val = ref<R>(fallback());
  fn().then((res) => {
    val.value = res;
  });
  return val;
}
