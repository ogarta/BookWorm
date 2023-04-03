import React from "react";
import ReactDOM from "react-dom";
import Index from "./pages/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from "./reducers/store";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById("root")
);
