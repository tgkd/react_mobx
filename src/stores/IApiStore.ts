import { SelectValue } from "antd/lib/select";

export const ApiStoreId = Symbol("ApiStore");

export interface IApiStore {
    timeout(ms: number): Promise<any>;
    request(url: string, params: RequestInit | undefined): Promise<any>;
}
