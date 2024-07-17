import {Component, computed, effect, input, OnInit, output, signal} from '@angular/core';
import {ConditionsAndZip} from '../../conditions-and-zip.type';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit {

    conditions = input<ConditionsAndZip[]>();
    closeTab = output<string>()
    selectedCondition = output<ConditionsAndZip>();

    private _selectedConditionPosition = signal<number>(0)
    protected _selectedCondition = computed(() => this.conditions()[this._selectedConditionPosition()])

    constructor() {
        effect(() => {
            this.selectedCondition.emit(this._selectedCondition())
        });
    }

    close(zip: string, event: MouseEvent) {
        event.stopPropagation()
        this.closeTab.emit(zip)
        this._selectedConditionPosition.set(0)
    }


    ngOnInit(): void {
        this._selectedConditionPosition.set(0)
    }

    switchSelectedTab(index: number) {
        this._selectedConditionPosition.set(index)
    }

    trackByZip = (index: number, condition: ConditionsAndZip) => condition.zip
}
