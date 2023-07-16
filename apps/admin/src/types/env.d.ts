declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_URL: string;
      NEXT_PUBLIC_PULSE_API_URL: string;
    }
  }
}

export {};
