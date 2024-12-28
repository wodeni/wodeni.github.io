import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import plainText from "vite-plugin-virtual-plain-text";
import markdownToHtmlPlugin from "./plugins/vite-remark.mjs";

export default defineConfig({
  plugins: [
    react(),
    plainText(),
    markdownToHtmlPlugin({
      publicDir: "public", // defaults to 'public'
      imagesDir: "images", // defaults to 'images'
      hash: true, // defaults to true, adds a short hash to filenames
    }),
  ],
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
