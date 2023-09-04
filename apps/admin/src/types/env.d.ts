declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_URL: string;
      PUBLIC_PULSE_API_URL: string;
    }
  }
}

export {};
