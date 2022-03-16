import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
    <BrowserRouter>
        <DataProvider>
            <App />
        </DataProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
