declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_URL: string;
      PUBLIC_PULSE_API_URL: string;
      PUBLIC_CLOUDINARY_KEY: string;
      PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    }
  }
}

export {};
