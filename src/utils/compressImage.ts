import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File): Promise<File> => {
  return imageCompression(file, {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.85,
    fileType: 'image/jpeg',
  });
};
