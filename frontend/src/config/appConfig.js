export const appConfig = {
  name: import.meta.env.VITE_APP_NAME,
  version: import.meta.env.VITE_APP_VERSION,
  baseUrl: import.meta.env.API_BASE_URL,
};

export const FEATURES = {
  PAYMENTS_ENABLED: false,
};
