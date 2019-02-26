import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Footer from "./components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <App />
      <Footer />
    </React.Fragment>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
