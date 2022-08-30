import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!); // in react 18 -v root need 👉 " ! " FUUUUUCK!


const client = new QueryClient();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
          <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);