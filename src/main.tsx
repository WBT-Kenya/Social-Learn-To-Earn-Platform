import * as React from "react";
import * as ReactDOM from "react-dom/client";
import store from './redux/Store';
import App from "./App";
import "./index.css";
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
       <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
);
