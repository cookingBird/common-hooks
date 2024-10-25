import { onUnmounted } from 'vue';
export default function useUnmounted() {
  const cancels: (() => void)[] = [];
  onUnmounted(() => {
    while (cancels.length) {
      try {
        cancels.shift()!();
      } catch (error) {
        console.error('invoke unMounted hook error', error)
      }
    }
  });
  return cancels;
}
