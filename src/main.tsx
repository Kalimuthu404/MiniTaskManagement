import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import { store } from "./store";
import "./index.css";
import "@mantine/core/styles.css"; // <-- Required for styles
import "@mantine/dates/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>
);
