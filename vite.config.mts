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
      imageDir: "pool-notes-images", // defaults to 'images'
      mdGlob: "pool-notes/public/**/*.md", // defaults to '**/*.md'
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
