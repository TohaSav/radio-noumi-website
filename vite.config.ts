import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "pp-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
  },
  build: {
    // Разделение кода на чанки для ускорения загрузки
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-toast"],
          utils: ["clsx", "tailwind-merge"],
        },
      },
    },
    // Сжатие для уменьшения размера файлов
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Оптимизация чанков
    chunkSizeWarningLimit: 1000,
  },
  // Предварительная загрузка модулей
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
}));
