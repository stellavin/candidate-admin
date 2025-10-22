/**
 * Retrieves and validates an environment variable.
 * @param {string} key - The environment variable key to retrieve
 * @returns {string} The environment variable value
 * @throws {Error} If the environment variable is not defined
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

/**
 * Application environment configuration.
 * Contains validated environment variables and runtime environment flags.
 */
export const env = {
  graphqlEndpoint: getEnvVar('VITE_GRAPHQL_ENDPOINT'),
  graphqlApiKey: getEnvVar('VITE_GRAPHQL_API_KEY'),
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

