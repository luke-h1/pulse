declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      REDIS_URL: string;
      SESSION_SECRET: string;
      ENVIRONMENT: 'local' | 'development' | 'production';
    }
  }
}

export {};
