import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { Room } from '../models/rooms.model';
import { RoomComponent } from '../shared/room/room.component';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../shared/filter/filter.component';
import { SharedFilter } from '../models/shared-filter.model';
import { RoomsFilterComponent } from './rooms-filter/rooms-filter.component';
import { RoomsFilter } from '../models/rooms-filter.model';

@Component({
    selector: 'app-rooms',
    imports: [CommonModule, RoomComponent, FilterComponent, RoomsFilterComponent],
    templateUrl: './rooms.component.html',
    styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
    rooms: Room[] = [];
    roomTypes: SharedFilter[] = [];

    constructor(private roomsService: RoomsService) { }

    ngOnInit(): void {
        this.getAllRooms();
        this.getRoomTypes();
    }

    getAllRooms(): void {
        this.roomsService.getAllRooms().subscribe(
            (rooms) => {
                this.rooms = rooms;
            }
        )
    }

    getRoomTypes(): void {
        this.roomsService.getFillters().subscribe(
            (types) => {
                this.roomTypes = types;
            }
        )
    }

    filterRooms(filterData: RoomsFilter): void {
        this.rooms = [];
        this.roomsService.getFilteredRooms(filterData).subscribe(
            (filtered) => {
                this.rooms = filtered;
            }
        )
    }

    filterByType(filterData: SharedFilter): void {
        console.log(filterData);
        let typeFilterData: RoomsFilter = {
            priceFrom: 0,
            priceTo: 1000,
            roomTypeId: filterData.id
        }
        this.filterRooms(typeFilterData);
    }
}
