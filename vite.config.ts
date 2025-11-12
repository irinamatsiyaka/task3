import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), TanStackRouterVite(), tailwindcss()],
   test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/setupTests.ts",
   },
});
