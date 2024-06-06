import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import "@/index.css";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";
// import store from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from '@react-oauth/google';


import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="602409083739-jdrut30nkdv1aijs7tj272sehdakfuj0.apps.googleusercontent.com">

        <App />
        </GoogleOAuthProvider>
      </PersistGate>
      
    </Provider>
  </React.StrictMode>
);
