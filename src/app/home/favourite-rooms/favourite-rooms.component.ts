import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/rooms.model';
import { RoomsService } from '../../services/rooms.service';
import { take } from 'rxjs';
import { RoomComponent } from '../../shared/room/room.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-favourite-rooms',
    imports: [CommonModule, RoomComponent, LoadingSpinnerComponent],
    templateUrl: './favourite-rooms.component.html',
    styleUrl: './favourite-rooms.component.scss'
})
export class FavouriteRoomsComponent implements OnInit {
    rooms: Room[] = [];
    isLoaded: boolean = false;

    constructor(private roomsService: RoomsService) { }

    ngOnInit(): void {
        this.loadFavouriteRooms();
    }

    loadFavouriteRooms(): void {
        this.roomsService.getAllRooms().pipe(
            take(1),
        ).
            subscribe(
                (rooms) => {
                    this.rooms = rooms.splice(0, 6);
                    this.isLoaded = true;
                }
            )
    }

}
