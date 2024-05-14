import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ParallaxProvider } from "react-scroll-parallax";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
    <Toaster />
    <ReactQueryDevtools />
  </QueryClientProvider>,
);
