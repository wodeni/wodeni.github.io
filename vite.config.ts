import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import plainText from "vite-plugin-virtual-plain-text";

export default defineConfig({
  plugins: [react(), plainText()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
