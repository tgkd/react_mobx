import React from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom";

import { lazyInject } from "src/di";
import { AuthStoreId, IAuthStore } from "src/stores/IAuthStore";

interface IPrivateRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

export default class PrivateRoute extends React.Component<IPrivateRouteProps> {
    @lazyInject(AuthStoreId) private readonly authStore: IAuthStore;

    public render() {
        const { component: Component, ...rest }: IPrivateRouteProps = this.props;
        const renderComponent: RenderComponent = props =>
            this.authStore.signedIn ? <Component {...props} /> : <Redirect to="/" />;

        return <Route {...rest} render={renderComponent} />;
    }
}
