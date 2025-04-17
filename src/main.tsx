import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";

import { NuqsAdapter } from "nuqs/adapters/react";

import { ReactLenis } from "lenis/react";

import { store } from "./redux/store.ts";

import SystemMessagesProvider from "./shared/components/system/SystemMessagesProvider.tsx";

import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      <Provider store={store}>
        <SystemMessagesProvider>
          <ReactLenis
            root
            options={{
              lerp: 0.1,
              duration: undefined,
              smoothWheel: true,
              wheelMultiplier: 0.8,
              touchMultiplier: 1.5,
              syncTouch: true,
              syncTouchLerp: 0.075,
              touchInertiaMultiplier: 25,
              infinite: false,
              gestureOrientation: "vertical",
              autoResize: true,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            }}
          >
            <App />
          </ReactLenis>
        </SystemMessagesProvider>
      </Provider>
    </NuqsAdapter>
  </StrictMode>,
);
