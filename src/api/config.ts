import { Capacitor } from '@capacitor/core';

const WEB_API_ORIGIN = '';
const NATIVE_ANDROID_API_ORIGIN = 'http://192.168.1.12:3000';
const NATIVE_DEFAULT_API_ORIGIN = import.meta.env.VITE_API_ORIGIN;

export const getApiOrigin = (): string => {
  if (!Capacitor.isNativePlatform()) {
    return WEB_API_ORIGIN;
  }

  if (Capacitor.getPlatform() === 'android') {
    return NATIVE_ANDROID_API_ORIGIN;
  }

  return NATIVE_DEFAULT_API_ORIGIN;
};

export const getApiUrl = (path: string): string => {
  return `${getApiOrigin()}/api${path}`;
};

export const getUploadsUrl = (path: string): string => {
  return `${getApiOrigin()}/uploads${path}`;
};
