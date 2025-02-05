import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomsFilter } from '../../models/rooms-filter.model';

@Component({
    selector: 'app-rooms-filter',
    imports: [FormsModule],
    templateUrl: './rooms-filter.component.html',
    styleUrl: './rooms-filter.component.scss'
})
export class RoomsFilterComponent {
    @Output() roomsFilterEvent = new EventEmitter<RoomsFilter>();
    @Output() filterResetEvent = new EventEmitter<void>();

    filterData: RoomsFilter = this.initFilterData();

    initFilterData(): RoomsFilter {
        let data = {
            roomTypeId: 0,
            priceFrom: undefined,
            priceTo: undefined,
            maximumGuests: 0,
            checkIn: "",
            checkOut: ""
        }
        return data;
    }

    filterRooms(): void {
        this.roomsFilterEvent.emit(this.filterData);
    }

    resetForm(): void {
        this.filterData = this.initFilterData();
        this.filterResetEvent.emit();
    }
}
