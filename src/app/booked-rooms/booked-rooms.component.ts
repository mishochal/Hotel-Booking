import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { BookedRoom } from '../models/booking.model';
import { CommonModule } from '@angular/common';
import { BookedRoomComponent } from './booked-room/booked-room.component';

@Component({
    selector: 'app-booked-rooms',
    imports: [CommonModule, BookedRoomComponent],
    templateUrl: './booked-rooms.component.html',
    styleUrl: './booked-rooms.component.scss'
})
export class BookedRoomsComponent implements OnInit {
    bookedRooms: BookedRoom[] = [];

    constructor(private bookingService: BookingService) { }

    ngOnInit(): void {
        this.getAllBookedRooms();
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
