declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: 'local' | 'development' | 'production';
      PORT: string;
      DATABASE_URL: string;
      SESSION_SECRET: string;
      REDIS_URL: string;
      CLOUDINARY_SECRET: string;
    }
  }
}

export {};
