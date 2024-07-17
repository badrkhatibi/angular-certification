import {Component, inject} from '@angular/core';
import {WeatherService} from '../weather.service';
import {LocationService} from '../location.service';
import {Router} from '@angular/router';
import {ConditionsAndZip} from '../conditions-and-zip.type';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

    protected weatherService = inject(WeatherService);
    protected router = inject(Router);
    protected locationService = inject(LocationService);
    protected selectedCondition: ConditionsAndZip;
}
