import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import svgr from "vite-plugin-svgr"
import react from "@vitejs/plugin-react"

// svgr({
//   exportAsDefault: true,
//   svgrOptions: {
//     icon: true,
//   },
// })

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3005,
  },
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        icons: [
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        background_color: "#121212",
        theme_color: "#121212",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/api")
            },
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
})

// export default {
//   plugins: [react(), svgr()],
// }
