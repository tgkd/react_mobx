import { ContainerModule, interfaces } from "inversify";
import Bind = interfaces.Bind;

import ApiStore from "src/stores/ApiStore";
import AppStore from "src/stores/AppStore";
import AuthStore from "src/stores/AuthStore";
import { ApiStoreId, IApiStore } from "src/stores/IApiStore";
import { AppStoreId, IAppStore } from "src/stores/IAppStore";
import { AuthStoreId, IAuthStore } from "src/stores/IAuthStore";

import { ISettings, SettingsId } from "src/ISettings";
import { settings } from "src/settings";

export const containerModule = new ContainerModule((bind: Bind) => {
    bind<ISettings>(SettingsId).toConstantValue(settings);
    bind<IApiStore>(ApiStoreId)
        .to(ApiStore)
        .inSingletonScope();
    bind<IAppStore>(AppStoreId)
        .to(AppStore)
        .inSingletonScope();
    bind<IAuthStore>(AuthStoreId)
        .to(AuthStore)
        .inSingletonScope();
});
