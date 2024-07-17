import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    getLocalStorage<T>(key: string): T {
        return JSON.parse(localStorage.getItem(key)) as T;
    }

    setLocalStorage<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
