import { History, Location } from "history";
import { injectable } from "inversify";
import { action, computed, observable } from "mobx";

import { IAppStore } from "src/stores/IAppStore";

@injectable()
export default class AppStore implements IAppStore {
    @computed
    get location() {
        return this._location;
    }
    @computed
    get history() {
        return this._history;
    }

    @observable public _location: Location;
    @observable public _history: History;

    @action
    public init(location: Location, history: History) {
        this._location = location;
        this._history = history;
    }

    public goTo(path: string, data?: any) {
        this._history.push(path, data);
    }
}
