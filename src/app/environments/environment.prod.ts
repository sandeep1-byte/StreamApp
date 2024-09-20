export interface Environment {
    production: boolean;
    apiUrl: string;
    apiKey?: string; // Optional if you may or may not have an apiKey
  }


export const environment : Environment = {
  production: false,
  apiUrl: 'http://localhost:3005',
};
