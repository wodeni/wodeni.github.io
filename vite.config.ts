import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import plainText from "vite-plugin-virtual-plain-text";
import markdown, { Mode } from "vite-plugin-markdown";

export default defineConfig({
  plugins: [react(), plainText(), markdown({ mode: [Mode.HTML] })],
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
