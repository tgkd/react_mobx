export const AuthStoreId = Symbol("AuthStore");

export interface IAuthUser {}

export interface IAuthStore {
    readonly signedIn: boolean;
    readonly initialized: boolean;
    readonly currentUser: IAuthUser | undefined;

    init(): Promise<any>;
    getAndApplyUser(): Promise<IAuthUser | undefined>;
    handleSigninRedirectCallback(): Promise<any>;
    handleSilentRefreshCallback(): Promise<any>;
}
