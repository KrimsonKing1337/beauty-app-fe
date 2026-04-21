import { onMounted, onUnmounted, ref } from 'vue';

export const useSyncedNow = () => {
  const now = ref(new Date());

  let syncTimeoutId: number | null = null;
  let syncIntervalId: number | null = null;

  const syncNow = () => {
    now.value = new Date();
  };

  onMounted(() => {
    syncNow();

    const current = new Date();
    const msUntilNextMinute = (60 - current.getSeconds()) * 1000 - current.getMilliseconds();

    syncTimeoutId = window.setTimeout(() => {
      syncNow();

      syncIntervalId = window.setInterval(() => {
        syncNow();
      }, 60_000);
    }, msUntilNextMinute);
  });

  onUnmounted(() => {
    if (syncTimeoutId !== null) {
      clearTimeout(syncTimeoutId);
    }

    if (syncIntervalId !== null) {
      clearInterval(syncIntervalId);
    }
  });

  return {
    now,
  };
};

