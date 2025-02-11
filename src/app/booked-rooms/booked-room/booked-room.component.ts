import { Component, Input, OnInit } from '@angular/core';
import { BookedRoom } from '../../models/booking.model';
import { CommonModule } from '@angular/common';
import { Hotel } from '../../models/hotels.model';
import { Room } from '../../models/rooms.model';
import { RoomsService } from '../../services/rooms.service';
import { HotelsService } from '../../services/hotels.service';
import { take } from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';

@Component({
    selector: 'app-booked-room',
    imports: [CommonModule],
    templateUrl: './booked-room.component.html',
    styleUrl: './booked-room.component.scss'
})
export class BookedRoomComponent implements OnInit {
    @Input() room!: BookedRoom

    bookedHotel: Hotel = {
        id: 0,
        name: "",
        address: "",
        city: "",
        featuredImage: "",
        rooms: [],
    };
    bookedRoom: Room | undefined

    constructor(
        private roomService: RoomsService,
        private hotelService: HotelsService,
        private bookingService: BookingService
    ) { }

    ngOnInit(): void {
        this.getRoom(this.room.roomID);
        this.getHotel(this.room.roomID);
    }

    getRoom(roomId: number): void {
        this.bookedRoom = this.roomService.rooms[roomId - 1];
    }

    getHotel(roomId: number): void {
        this.bookedHotel = this.hotelService.hotels[this.bookedRoom!.hotelId - 1];
    }

    cancelBooking(bookingId: number) {
        this.bookingService.cancelBooking(bookingId).subscribe();
    }
}
