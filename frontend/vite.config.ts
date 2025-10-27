import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: "dist", // Vercel will automatically detect
  },
  server: {
    port: 5173,     // local dev port
  },
  base: "/",         // ensures correct routing in production
});
