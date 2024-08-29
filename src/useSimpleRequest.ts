import { shallowRef } from 'vue';
export default function <
  T extends (...args: any[]) => Promise<any>,
  R = T extends (...args: any[]) => Promise<infer U> ? U : never,
>(fn: T, fallback: () => NoInfer<R>) {
  const val = shallowRef<R>(fallback());
  fn().then((res) => {
    val.value = res;
  });
  return val;
}
