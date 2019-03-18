// import axios from "axios";
import { injectable } from "inversify";
import { createHttpLink } from "apollo-link-http";

import { IApiStore } from "src/stores/IApiStore";
import { lazyInject } from "src/di";

@injectable()
export default class ApiStore implements IApiStore {

    // TODO rm func
    public timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async request(url: string, params?: RequestInit) {
        const res = await fetch(url, params);
        return await res.json();
    }
}
