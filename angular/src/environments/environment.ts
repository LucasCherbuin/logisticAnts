export const environment = {
  production: false,
  apiUrl: (window as any).__env?.API_BACKEND_URL ?? 'http://localhost:8080'
};