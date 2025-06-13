import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Регистрация Service Worker для офлайн работы
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch(() => console.log("SW registration failed"));
  });
}

// Предзагрузка критичных ресурсов
const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.as = "style";
preloadLink.href = "/src/index.css";
document.head.appendChild(preloadLink);

createRoot(document.getElementById("root")!).render(<App />);
