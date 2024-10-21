import { onBeforeUnmount } from 'vue';
export default function useBeforeUnmount() {
  const cancels: (() => void)[] = [];
  onBeforeUnmount(() => {
    while (cancels.length) {
      cancels.shift()!();
    }
  });
  return cancels;
}
