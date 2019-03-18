export const SettingsId = Symbol("Settings");

export interface ISettings {
    readonly authority: string;
    readonly clientId: string;
    readonly redirectUri: string;
    readonly scope: string;
    readonly silentRedirectUri: string;
}
