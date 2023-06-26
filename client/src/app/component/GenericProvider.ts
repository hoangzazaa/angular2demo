/**
 * Created by Teddy on 7/11/2017.
 */
import {Injectable} from "@angular/core";

@Injectable()
export class GenericProvider<T> {
    private _provider: T;

    get provider(): T {
        return this._provider
    }

    set provider(provider: T) {
        this._provider = provider;
    }
}