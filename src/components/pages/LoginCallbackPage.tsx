import * as React from "react";

import { lazyInject } from "src/di";
import { AppStoreId, IAppStore } from "src/stores/IAppStore";
import { AuthStoreId, IAuthStore as IAuth } from "src/stores/IAuthStore";

export default class LoginCallbackPage extends React.Component {
    @lazyInject(AuthStoreId) private readonly authStore: IAuth;
    @lazyInject(AppStoreId) private readonly appStore: IAppStore;

    public async componentDidMount() {
        await this.authStore.handleSigninRedirectCallback();
        this.appStore.goTo("/");
    }
    
    public render() {
        return null;
    }
}
