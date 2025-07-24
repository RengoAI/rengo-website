/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-pwa/info" />

interface ImportMetaEnv {
  readonly VITE_STYTCH_PUBLIC_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
