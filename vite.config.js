import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "./src",
  base: "",
  plugins: [react()],
  optimizeDeps: {
    include: ["zmp-sdk"],  // Ensure `zmp-sdk` is optimized correctly
  },
  resolve: {
    alias: {
      // You can add aliases if needed
    },
  },
});
