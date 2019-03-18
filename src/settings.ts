import { ISettings } from "src/ISettings";

const localSettings = {
    authority: "",
    clientId: "admin",
    redirectUri: "",
    scope: "api",
    silentRedirectUri: "",
};

export const settings: ISettings = {
    authority: "",
    clientId: "",
    redirectUri: "",
    scope: "",
    silentRedirectUri: "",
    ...localSettings,
};
