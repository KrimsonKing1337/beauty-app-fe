import { onMounted, onUnmounted, ref } from 'vue';

import type { Ref } from 'vue';

type UseNowByMinuteReturn = {
  now: Ref<Date>;
};

const ONE_MINUTE_MS = 60_000;

export const useNowByMinute = (): UseNowByMinuteReturn => {
  const now = ref(new Date());

  let syncTimeoutId: number | null = null;
  let syncIntervalId: number | null = null;

  const syncNow = () => {
    now.value = new Date();
  };

  onMounted(() => {
    syncNow();

    const delayToNextMinute = ONE_MINUTE_MS - (Date.now() % ONE_MINUTE_MS);

    syncTimeoutId = window.setTimeout(() => {
      syncNow();

      syncIntervalId = window.setInterval(() => {
        syncNow();
      }, ONE_MINUTE_MS);
    }, delayToNextMinute);
  });

  onUnmounted(() => {
    if (syncTimeoutId !== null) {
      window.clearTimeout(syncTimeoutId);
    }

    if (syncIntervalId !== null) {
      window.clearInterval(syncIntervalId);
    }
  });

  return {
    now,
  };
};
