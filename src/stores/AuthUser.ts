import * as oidc from "oidc-client";

import { IAuthUser } from "./IAuthStore";

export class AuthUser implements IAuthUser {
    get accessToken() { return this.user.access_token; }

    public constructor(private readonly user: oidc.User) {
    }
}
