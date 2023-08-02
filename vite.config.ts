import { defineConfig } from "vite"
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
  plugins: [react(), svgr()],
})

// export default {
//   plugins: [react(), svgr()],
// }
