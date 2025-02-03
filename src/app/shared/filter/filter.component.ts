import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from '../../models/filter.model';

@Component({
    selector: 'app-filter',
    imports: [CommonModule],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss'
})
export class FilterComponent {
    @Input() filterList: Filter[] = [];
    @Output() filterEvent = new EventEmitter<Filter>();

    selectedFilter: number = 0;

    onFilter(id: number, filter?: any) {
        this.selectedFilter = id;
        if (filter && filter.name) {
            this.filterEvent.emit(filter);
        } else if (filter && !filter.name) {
            let filterObject = {
                id: id,
                name: filter
            }
            this.filterEvent.emit(filterObject)
        }
    }

}
