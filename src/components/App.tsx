import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";

import { Routes } from "src/components/Routes";

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        );
    }
}

const HotApp = hot(module)(App);

export { HotApp as App };
