import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: "electron/main.ts",
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, "electron/preload.ts"),
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "./src/assets"),
      components: path.resolve(__dirname, "./src/components"),
      contexts: path.resolve(__dirname, "./src/contexts"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      styling: path.resolve(__dirname, "./src/styling"),
      types: path.resolve(__dirname, "./src/types"),
      utils: path.resolve(__dirname, "./src/utils"),
      screens: path.resolve(__dirname, "./src/screens"),
    },
  },
  optimizeDeps: {
    include: [
      "@editorjs/editorjs",
      "react-editor-js",
      "@react-editor-js/client",
    ],
    esbuildOptions: {
      plugins: [esbuildCommonjs(["react-editor-js"])],
      target: "ESNext",
    },
  },
  build: {
    target: "ESNext",
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  define: {
    "process.env.IS_PREACT": JSON.stringify("true"),
  },
});
