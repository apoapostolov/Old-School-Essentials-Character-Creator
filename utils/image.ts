
export const cropImage = (imageBase64: string, box: { x: number, y: number, width: number, height: number }): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Could not get canvas context'));
      }

      const pixelSize = box.width * img.naturalWidth;
      const centerX = (box.x + box.width / 2) * img.naturalWidth;
      const centerY = (box.y + box.height / 2) * img.naturalHeight;
      const sx = centerX - pixelSize / 2;
      const sy = centerY - pixelSize / 2;

      canvas.width = pixelSize;
      canvas.height = pixelSize;

      ctx.drawImage(img, sx, sy, pixelSize, pixelSize, 0, 0, pixelSize, pixelSize);

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = (err) => {
      reject(new Error('Image failed to load for cropping.'));
    };
    img.src = imageBase64;
  });
};
