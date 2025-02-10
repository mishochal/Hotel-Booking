import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { BookedRoom } from '../models/booking.model';
import { CommonModule } from '@angular/common';
import { BookedRoomComponent } from './booked-room/booked-room.component';
import { HotelsService } from '../services/hotels.service';
import { RoomsService } from '../services/rooms.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-booked-rooms',
    imports: [CommonModule, BookedRoomComponent, LoadingSpinnerComponent],
    templateUrl: './booked-rooms.component.html',
    styleUrl: './booked-rooms.component.scss'
})
export class BookedRoomsComponent implements OnInit {
    bookedRooms: BookedRoom[] = [];
    isLoaded: boolean = false;

    constructor(
        private bookingService: BookingService,
        private hotelsService: HotelsService,
        private roomsService: RoomsService
    ) { }

    ngOnInit(): void {
        this.isLoaded = false;
        this.getAllBookedRooms();
        this.hotelsService.loadHotels();
        this.roomsService.loadRooms();
        setTimeout(() => {
            this.isLoaded = true;
        }, 1000)
    }

    getAllBookedRooms(): void {
        this.bookingService.getBookedRooms().subscribe(
            (rooms) => {
                this.bookedRooms = rooms;
                console.log(this.bookedRooms);
            }
        )
    }
}
