import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [vue(), tailwindcss(), svgLoader()],
  server: {
    host: "0.0.0.0",
    port: 3005,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
