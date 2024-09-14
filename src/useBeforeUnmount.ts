import { onBeforeUnmount } from 'vue';
/**@deprecated please use onBeforeUnmount directly */
export default function useBeforeUnmount() {
  const cancels: (() => void)[] = [];
  onBeforeUnmount(() => {
    while (cancels.length) {
      cancels.shift()!();
    }
  });
  return cancels;
}
