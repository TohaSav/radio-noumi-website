import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingScreen from "@/components/LoadingScreen";

// Lazy loading страниц для ускорения первой загрузки
const Index = lazy(() => import("./pages/Index"));
const Reels = lazy(() => import("./pages/Reels"));
const DatingChat = lazy(() => import("./pages/DatingChat"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Кеширование на 5 минут для экономии трафика
      staleTime: 5 * 60 * 1000,
      retry: 1, // Меньше попыток для медленного интернета
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/dating" element={<DatingChat />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
