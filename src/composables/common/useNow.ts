import { onMounted, onUnmounted, ref } from 'vue';

export const useNow = () => {
  const now = ref(new Date());

  let timeoutId: number | null = null;
  let intervalId: number | null = null;

  const syncNow = () => {
    now.value = new Date();
  };

  onMounted(() => {
    syncNow();

    const delay = 1000 - (Date.now() % 1000);

    timeoutId = window.setTimeout(() => {
      syncNow();

      intervalId = window.setInterval(() => {
        syncNow();
      }, 1000);
    }, delay);
  });

  onUnmounted(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    if (intervalId !== null) {
      clearInterval(intervalId);
    }
  });

  return { now };
};
