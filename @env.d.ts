declare module '@env' {
  export const CLOUDINARY_CLOUD_NAME = string;
  export const CLOUDINARY_API_KEY = string;
  export const CLOUDINARY_API_SECRET = string;
  export const CLOUDINARY_UPLOAD_PRESET = string;
  export const JWT_ICOOK_SECRET: string;
}

declare module 'redux-persist/lib/storage';
