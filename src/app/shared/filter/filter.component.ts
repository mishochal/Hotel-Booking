import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedFilter } from '../../models/shared-filter.model';

@Component({
    selector: 'app-filter',
    imports: [CommonModule],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss'
})
export class FilterComponent {
    @Input() filterList: SharedFilter[] = [];
    @Output() filterEvent = new EventEmitter<SharedFilter>();

    selectedFilter: number = 0;

    onFilter(id: number, filter?: any) {
        this.selectedFilter = id;
        if (filter && filter.name) {
            this.filterEvent.emit(filter);
        } else {
            let filterObject = {
                id: id,
                name: filter
            }
            this.filterEvent.emit(filterObject)
        }
    }

}
