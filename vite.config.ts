import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import WindiCSS from "vite-plugin-windicss"
import tsconfigPaths from "vite-tsconfig-paths"
import path from "path"
const resolve = (dir) => path.resolve(__dirname, dir)

export default defineConfig({
  root: "./client",
  plugins: [react(), WindiCSS(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": resolve("./client/src"),
    },
  },
})
