import * as mobx from "mobx";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "src/components/App";
import { container } from "src/di";
import { containerModule } from "src/di/config";

container.load(containerModule);

mobx.configure({
    enforceActions: "observed",
});
declare const module: any;

function renderApp(AppComponent: any) {
    ReactDOM.render(<AppComponent />, document.getElementById("root"));
}

renderApp(App);

if (module.hot) {
    module.hot.accept("src/components/App", () => renderApp(App));
}
