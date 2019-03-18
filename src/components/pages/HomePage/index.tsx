import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import DefaultPage from "src/components/pages/DefaultPage";
import { Title } from "src/components/pages/HomePage/styled";
import { lazyInject } from "src/di";
import { AuthStoreId, IAuthStore } from "src/stores/IAuthStore";

@observer
export default class HomePage extends React.Component {
    @lazyInject(AuthStoreId) private readonly authStore: IAuthStore;

    @observable private progressText = "";

    public render() {
        const { signedIn } = this.authStore;
        const { progressText } = this;

        return (
            <DefaultPage>
                <Title>User is {signedIn ? "" : "not"} signed in</Title>
                <button onClick={this.handleApiTestClick}>Do fake API call</button>
                {progressText}
            </DefaultPage>
        );
    }

    @action
    private readonly handleApiTestClick = async () => {
        this.progressText = "working...";
        await this.authStore.getAndApplyUser();

        runInAction(() => {
            this.progressText = "done";
        });
    };
}
