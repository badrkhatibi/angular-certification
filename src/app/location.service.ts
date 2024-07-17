import {effect, Injectable, signal} from '@angular/core';
import {LocalStorageService} from './local-storage.service';

export const LOCATIONS: string = 'locations';

@Injectable()
export class LocationService {

    private _locations
        = signal<string[]>(this.localStorageService.getLocalStorage(LOCATIONS) ?? []);
    readonly locations = this._locations.asReadonly();

    constructor(private localStorageService: LocalStorageService) {
        effect(() => {
            this.localStorageService.setLocalStorage<string[]>(LOCATIONS, this.locations())
        });
    }

    addLocation(zipcode: string) {
        if (zipcode && !this._locations().includes(zipcode)) {
            this._locations.update(locations => [...locations, zipcode])
        }
    }

    removeLocation(zipcode: string) {
        let index = this.locations().indexOf(zipcode);
        if (index !== -1) {
            this._locations.update(locations => {
                locations.splice(index, 1);
                return [...locations];
            });
        }
    }
}
