import { observer } from "mobx-react";
import * as React from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";

import HomePage from "pages/HomePage";

import Root from "components/Root";
import { lazyInject } from "src/di";
import { AuthStoreId, IAuthStore } from "src/stores/IAuthStore";
import PrivateRoute from "components/PrivateRoute";

class RoutesImpl extends React.Component<RouteComponentProps> {
    @lazyInject(AuthStoreId) private readonly authStore: IAuthStore;

    public render() {
        const { initialized } = this.authStore;
        return (
            <>
                <Route path={"/"} component={Root} />
                {initialized ? (
                    <Switch>
                        <Route exact={true} path={"/"} component={HomePage} />
                        <PrivateRoute exact={true} path={"/home_private"} component={HomePage} />
                    </Switch>
                ) : null}
            </>
        );
    }
}

const Wrapped = withRouter(observer(RoutesImpl));

export { Wrapped as Routes };
