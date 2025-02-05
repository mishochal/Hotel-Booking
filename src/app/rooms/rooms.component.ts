import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { Room } from '../models/rooms.model';
import { RoomComponent } from '../shared/room/room.component';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../shared/filter/filter.component';
import { SharedFilter } from '../models/shared-filter.model';
import { RoomsFilterComponent } from './rooms-filter/rooms-filter.component';
import { RoomsFilter } from '../models/rooms-filter.model';
import { filter } from 'rxjs';

@Component({
    selector: 'app-rooms',
    imports: [CommonModule, RoomComponent, FilterComponent, RoomsFilterComponent],
    templateUrl: './rooms.component.html',
    styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
    rooms: Room[] = [];
    roomTypes: SharedFilter[] = [];
    currFilterData: RoomsFilter = {};
    chosenRoomTypeId: number | undefined = 0;

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
                this.currFilterData = { ...filterData };
            }
        )
    }

    resetFilters(): void {
        this.rooms = [];
        this.currFilterData = {};
        if (this.chosenRoomTypeId === 0) {
            this.getAllRooms();
        } else {
            this.filterRooms({ ...this.currFilterData, roomTypeId: this.chosenRoomTypeId });
        }
    }

    filterByType(filterData: SharedFilter): void {
        this.currFilterData.roomTypeId = filterData.id;
        this.chosenRoomTypeId = filterData.id;
        this.filterRooms(this.currFilterData);
    }
}
