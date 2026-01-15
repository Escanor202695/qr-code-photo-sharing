/**
 * Cloudinary Upload Service
 * 
 * FREE TIER: 25GB storage, 25GB bandwidth/month
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create free account at https://cloudinary.com
 * 2. Go to Settings → Upload → Add upload preset
 * 3. Create an UNSIGNED preset (for browser uploads)
 * 4. Update CLOUD_NAME and UPLOAD_PRESET below
 */

// Your Cloudinary credentials
const CLOUD_NAME = 'ddrwtuais'; // Your cloud name
const UPLOAD_PRESET = 'moments_unsigned'; // Create this preset in Cloudinary dashboard (see instructions below)

// Cloudinary upload URL
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  resource_type: 'image' | 'video';
  format: string;
  width: number;
  height: number;
  bytes: number;
}

/**
 * Upload a file directly to Cloudinary from the browser
 * No backend required - uses unsigned upload preset
 */
export const uploadToCloudinary = async (
  file: File,
  onProgress?: (percent: number) => void
): Promise<CloudinaryResponse> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'moments-events'); // Organize uploads in a folder

    const xhr = new XMLHttpRequest();
    
    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log('✅ Cloudinary upload success:', response.secure_url);
        resolve({
          secure_url: response.secure_url,
          public_id: response.public_id,
          resource_type: response.resource_type,
          format: response.format,
          width: response.width,
          height: response.height,
          bytes: response.bytes,
        });
      } else {
        console.error('❌ Cloudinary upload failed:', xhr.status, xhr.responseText);
        reject(new Error(`Upload failed: ${xhr.status} - ${xhr.responseText}`));
      }
    };

    xhr.onerror = () => reject(new Error('Upload failed'));
    
    xhr.open('POST', UPLOAD_URL);
    xhr.send(formData);
  });
};

/**
 * Check if Cloudinary is configured
 */
export const isCloudinaryConfigured = (): boolean => {
  return CLOUD_NAME !== 'demo' && UPLOAD_PRESET !== 'docs_upload_example_us_preset';
};

/**
 * Get optimized image URL with transformations
 */
export const getOptimizedUrl = (url: string, width: number = 800): string => {
  // Cloudinary auto-optimization
  return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`);
};
