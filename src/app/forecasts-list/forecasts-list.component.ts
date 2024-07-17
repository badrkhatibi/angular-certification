import {Component, computed} from '@angular/core';
import {WeatherService} from '../weather.service';
import {ActivatedRoute} from '@angular/router';
import {Forecast} from './forecast.type';

@Component({
    selector: 'app-forecasts-list',
    templateUrl: './forecasts-list.component.html',
    styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

    zipcode: string;
    forecast: Forecast;
    iconSrc = computed(() => this.weatherService.currentConditions()
        .find(condition => condition.zip === this.zipcode).iconSrc)

    constructor(protected weatherService: WeatherService, route: ActivatedRoute) {
        route.params.subscribe(params => {
            this.zipcode = params['zipcode'];
            weatherService.getForecast(this.zipcode)
                .subscribe(data => this.forecast = data);
        });
    }
}
