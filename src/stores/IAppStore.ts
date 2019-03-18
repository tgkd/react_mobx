import { History, Location } from "history";

export const AppStoreId = Symbol("AppStore");

export interface IAppStore {
    readonly location: Location;
    readonly history: History;

    init(location: Location, history: History): void;
    goTo(path: string, data?: any): void;
}
