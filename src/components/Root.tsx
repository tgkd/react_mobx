import * as React from "react";
import { RouteComponentProps } from "react-router";

import { lazyInject } from "src/di";
import { AppStoreId, IAppStore } from "src/stores/IAppStore";
import { AuthStoreId, IAuthStore } from "src/stores/IAuthStore";
import DefaultPage from "pages/DefaultPage";

export default class Root extends React.Component<RouteComponentProps<any>> {
    @lazyInject(AppStoreId) private readonly appStore: IAppStore;
    @lazyInject(AuthStoreId) private readonly authStore: IAuthStore;

    public constructor(props: RouteComponentProps<any>) {
        super(props);
        this.appStore.init(props.location, props.history);
    }

    public async componentWillMount() {
        await this.authStore.init();
    }

    public render() {
        return null;
        return this.authStore.signedIn ? null : <DefaultPage />;
    }
}
