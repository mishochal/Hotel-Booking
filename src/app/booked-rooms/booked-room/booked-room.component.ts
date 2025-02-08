import { Component, Input, OnInit } from '@angular/core';
import { BookedRoom } from '../../models/booking.model';
import { CommonModule } from '@angular/common';
import { Hotel } from '../../models/hotels.model';
import { Room } from '../../models/rooms.model';
import { RoomsService } from '../../services/rooms.service';
import { HotelsService } from '../../services/hotels.service';
import { take } from 'rxjs/operators';

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
    bookedRoom: Room = {
        id: 0,
        name: "",
        hotelId: 0,
        pricePerNight: 0,
        available: false,
        maximumGuests: 0,
        roomTypeId: 0,
        bookedDates: [],
        images: [{
            id: 0,
            source: "",
            roomId: 0,
        }],
    };

    constructor(
        private roomService: RoomsService,
        private hotelService: HotelsService
    ) { }

    ngOnInit(): void {
        this.getRoom(this.room.roomID);
        this.getHotel(this.room.roomID);
    }

    getRoom(roomId: number): void {
        this.roomService.getRoom(roomId).pipe(
            take(1),
        ).subscribe(
            (room) => {
                this.bookedRoom = room;
            }
        )
    }

    getHotel(roomId: number): void {
        this.hotelService.getHotelByRoom(roomId).pipe(
            take(1),
        ).subscribe(
            (hotel) => {
                this.bookedHotel = hotel;
            }
        )
    }
}
