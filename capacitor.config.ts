import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ru.kk1337.beautyapp',
  appName: 'Beauty App',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
  },
};

export default config;
