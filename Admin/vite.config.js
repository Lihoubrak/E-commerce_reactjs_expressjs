import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "formik-alias",
      resolveId(source) {
        if (source === "formik") {
          return { id: "formik", external: true };
        }
        return null;
      },
    },
  ],
  optimizeDeps: {
    include: ["jwt-decode"],
  },
  build: {
    optimizeDeps: {
      enable: false,
    },
  },
});
