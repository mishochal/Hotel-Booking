import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { Room } from '../models/rooms.model';
import { RoomComponent } from '../shared/room/room.component';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../shared/filter/filter.component';
import { Filter } from '../models/filter.model';

@Component({
    selector: 'app-rooms',
    imports: [CommonModule, RoomComponent, FilterComponent],
    templateUrl: './rooms.component.html',
    styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
    rooms: Room[] = [];
    roomTypes: Filter[] = [];

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
}
