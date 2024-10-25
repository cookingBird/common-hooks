import { onBeforeUnmount } from 'vue';
export default function useBeforeUnmount() {
  const cancels: (() => void)[] = [];
  onBeforeUnmount(() => {
    while (cancels.length) {
      try {
        cancels.shift()!();
      } catch (error) {
        console.error('invoke beforeUnmount hook error', error)
      }
    }
  });
  return cancels;
}
