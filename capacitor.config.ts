import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ru.beautyappp.app',
  appName: 'Beauty App',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
  },
};

export default config;
