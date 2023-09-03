declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: 'local' | 'development' | 'production';
      PORT: string;
      DATABASE_URL: string;
      SESSION_SECRET: string;
      REDIS_URL: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_BUCKET_REGION: string;
      AWS_BUCKET_NAME: string;
    }
  }
}

export {};
