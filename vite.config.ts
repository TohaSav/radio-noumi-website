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
    // Максимальное сжатие для медленного интернета
    minify: "esbuild",
    target: "es2015", // Поддержка старых браузеров
    cssMinify: true,
    // Агрессивное разделение кода
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-toast"],
          utils: ["clsx", "tailwind-merge"],
          icons: ["lucide-react"],
        },
        // Оптимизация имен файлов для кеширования
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    // Уменьшение лимита для предупреждений
    chunkSizeWarningLimit: 500,
    // Включение сжатия
    reportCompressedSize: false, // Ускоряет сборку
  },
  // Предварительная загрузка критичных модулей
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@radix-ui/react-toast",
      "lucide-react",
    ],
  },
}));
