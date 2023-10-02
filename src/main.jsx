import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import ErrorBoundary from "./components/Error.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <UserProvider> */}{" "}
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>{" "}
    </ErrorBoundary>
    {/* </UserProvider> */}
  </Provider>
);
