import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
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

    config.base = "/scan";
  }

  if (mode === "production") {
    config.base = "/pod-project/scan";
  }

  return config;
});
