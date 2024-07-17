import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConditionsAndZip} from '../../conditions-and-zip.type';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit {

    @Input() conditions: ConditionsAndZip[];
    @Output() closeTab = new EventEmitter<string>()
    @Output() navigateToForecast = new EventEmitter<string>()
    selectedCondition: ConditionsAndZip;

    showForecast(zipcode: string) {
        this.navigateToForecast.emit(zipcode)
    }

    close(zip: string, event: MouseEvent) {
        event.stopPropagation()
        this.closeTab.emit(zip)
        this.selectedCondition = this.conditions[0]
    }


    ngOnInit(): void {
        this.selectedCondition = this.conditions[0];
    }

    switchSelectedTab(index: number) {
        this.selectedCondition = this.conditions[index];
    }

    trackByZip = (index: number, condition: ConditionsAndZip) => condition.zip
}
