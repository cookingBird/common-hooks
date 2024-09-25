import { computed, getCurrentInstance } from 'vue';
import { useSessionStorage, useLocalStorage } from '@vueuse/core';
export function useScopedSessionStorage<T>(key: string, fallbackValue: () => T) {
  const instance = getCurrentInstance() || { vnode: { scopeId: 'default-scoped-component' } };
  const scopeId = instance.vnode.scopeId as string;
  const queryStg = useSessionStorage(scopeId, { [key]: fallbackValue() })
  const value = computed<T>({
    get() {
      return (queryStg.value[key] ?? fallbackValue()) as unknown as T;
    },
    set(val: T) {
      queryStg.value[key] = val;
    },
  });
  return {
    getItem(key: string) {
      return queryStg.value[key];
    },
    setItem(key: string, val: any) {
      queryStg.value[key] = val;
    },
    value,
  };
}
export function useScopedLocalStorage<T>(key: string, fallbackValue: () => T) {
  const instance = getCurrentInstance() || { vnode: { scopeId: 'default-scoped-component' } };
  const scopeId = instance.vnode.scopeId as string;
  const queryStg = useLocalStorage(scopeId, { [key]: fallbackValue() })
  const value = computed<T>({
    get() {
      return (queryStg.value[key] ?? fallbackValue()) as unknown as T;
    },
    set(val: T) {
      queryStg.value[key] = val;
    },
  });
  return {
    getItem(key: string) {
      return queryStg.value[key];
    },
    setItem(key: string, val: any) {
      queryStg.value[key] = val;
    },
    value,
  };
}
