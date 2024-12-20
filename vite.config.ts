import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          404: resolve(__dirname, "public/404.html"),
        },
      },
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "masked-icon.svg",
        ],
        manifest: {
          name: "Barcode Scanner PWA",
          short_name: "Scanner",
          description: "Barcode Scanner Application",
          theme_color: "#ffffff",
          icons: [
            {
              src: "vite.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "vite.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        },
      }),
    ],
  };

  if (mode === "development") {
    config.server = {
      host: true,
      port: 5173,
    };

    config.base = "/";
  }

  if (mode === "production") {
    config.base = "/pod-project/";
  }

  return config;
});
