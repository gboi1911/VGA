import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(async () => {
  const tsconfigPaths = (await import("vite-tsconfig-paths")).default;

  return {
    root: "./src",
    base: "",
    plugins: [
      tsconfigPaths(),
      react(),
      {
        name: "override-config",
        config: () => ({
          build: {
            target: "esnext",
          },
        }),
      },
    ],
  };
});
