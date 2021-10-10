import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import WindiCSS from "vite-plugin-windicss"

export default defineConfig({
  root: "./client",
  plugins: [react(), WindiCSS()],
})
