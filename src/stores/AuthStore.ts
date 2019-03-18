import { injectable } from "inversify";
import { computed, observable, runInAction } from "mobx";
import * as oidc from "oidc-client";

import { lazyInject } from "src/di";
import { IAuthStore, IAuthUser } from "src/stores/IAuthStore";
import { AuthUser } from "src/stores/AuthUser";
import { ISettings, SettingsId } from "src/ISettings";

@injectable()
export default class AuthStore implements IAuthStore {
    @computed
    get signedIn() {
        return !!this._user;
    }
    @computed
    get currentUser() {
        return this._user;
    }
    @computed
    get initialized() {
        return this._initialized;
    }

    @observable private _user: IAuthUser | undefined;
    @observable private _initialized = false;

    @lazyInject(SettingsId) private readonly settings: ISettings;

    private readonly userManager: oidc.UserManager;

    public constructor() {
        this.userManager = new oidc.UserManager({
            authority: this.settings.authority,
            client_id: this.settings.clientId,
            redirect_uri: this.settings.redirectUri,
            response_type: "token",
            scope: this.settings.scope,
            silent_redirect_uri: this.settings.silentRedirectUri,
        });
    }

    public async init() {
        const oidcUser = await this.userManager.getUser();
        const user = oidcUser && !oidcUser.expired ? new AuthUser(oidcUser) : undefined;
        runInAction(() => {
            this._user = user;
            this._initialized = true;
        });
    }

    public async getAndApplyUser() {
        let oidcUser: oidc.User | undefined = await this.userManager.getUser();

        if (!oidcUser || oidcUser.expired) {
            oidcUser = await this.trySilentRenew();
            if (!oidcUser || oidcUser.expired) {
                await this.userManager.signinRedirect();
                oidcUser = undefined;
            }
        }

        const user = oidcUser ? new AuthUser(oidcUser) : undefined;

        runInAction(() => {
            this._user = user;
        });

        return user;
    }

    public async handleSigninRedirectCallback() {
        await this.userManager.signinRedirectCallback();
        await this.init();
    }

    public async handleSilentRefreshCallback() {
        await this.userManager.signinSilentCallback();
        await this.init();
    }

    private async trySilentRenew() {
        try {
            return await this.userManager.signinSilent();
        } catch (e) {
            return undefined;
        }
    }
}
