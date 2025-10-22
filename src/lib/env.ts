/**
 * Environment variable validation and access
 * Validates all required env vars at app startup
 */

function getEnvVar(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `Please ensure you have a .env file with all required variables.\n` +
      `See .env.example for reference.`
    );
  }
  return value;
}

function getOptionalEnvVar(key: string, defaultValue: string): string {
  return import.meta.env[key] || defaultValue;
}

export const env = {
  // Required
  graphqlEndpoint: getEnvVar('VITE_GRAPHQL_ENDPOINT'),
  graphqlApiKey: getEnvVar('VITE_GRAPHQL_API_KEY'),
  
  // Optional with defaults
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

