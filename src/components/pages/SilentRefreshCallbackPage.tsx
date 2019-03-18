import * as React from "react";

import { lazyInject } from "src/di";
import { AuthStoreId, IAuthStore } from "src/stores/IAuthStore";

export default class SilentRefreshCallbackPage extends React.Component {
    @lazyInject(AuthStoreId) private readonly authStore: IAuthStore;

    public async componentDidMount() {
        await this.authStore.handleSilentRefreshCallback();
    }
    
    public render() {
        return null;
    }
}
