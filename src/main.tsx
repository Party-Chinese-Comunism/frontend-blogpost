import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { useAuth, AuthProvider } from "./context/auth";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const theme = createTheme();

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
