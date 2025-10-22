/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_ENDPOINT: string;
  readonly VITE_GRAPHQL_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// CSS Modules type declaration
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
