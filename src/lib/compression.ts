/**
 * Media Compression System
 * Handles image conversion to WebP 70% 
 * and provides hooks for PDF compression via Ghostscript/External API
 */

export const compressImageToWebP = async (file: File, quality: number = 0.7): Promise<File> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Balanced scaling for performance
        const MAX_DIMENSION = 2048;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height *= MAX_DIMENSION / width;
            width = MAX_DIMENSION;
          } else {
            width *= MAX_DIMENSION / height;
            height = MAX_DIMENSION;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Failed to get canvas context'));
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                type: 'image/webp',
                lastModified: Date.now(),
              });
              resolve(newFile);
            } else {
              resolve(file);
            }
          },
          'image/webp',
          quality
        );
      };
    };
  });
};

/**
 * PDF Compression Utility
 * NOTE: Full Ghostscript compression requires server-side processing.
 * This function acts as a gateway to the compression system.
 */
export const compressPDF = async (file: File): Promise<File> => {
  console.log('PDF Compression requested for:', file.name, 'Profile: /ebook');
  
  // In a full implementation, this would call a Supabase Edge Function
  // that runs Ghostscript: gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook
  
  // For now, we return the file as is or notify the system
  return file;
};

export const compressMedia = async (file: File): Promise<File> => {
  if (file.type.startsWith('image/')) {
    return compressImageToWebP(file, 0.7);
  } else if (file.type === 'application/pdf') {
    return compressPDF(file);
  }
  return file;
};
