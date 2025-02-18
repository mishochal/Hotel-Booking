import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookedRoom, BookingForm } from '../models/booking.model';

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    private apirUrl = "https://hotelbooking.stepprojects.ge/api/Booking";

    constructor(private http: HttpClient) { }

    getBookedRooms(): Observable<BookedRoom[]> {
        const url = this.apirUrl;

        return this.http.get<BookedRoom[]>(url);
    }

    addBookedRoom(bookingData: BookingForm): Observable<void> {
        const url = this.apirUrl;

        return this.http.post<void>(url, bookingData);
    }

    cancelBooking(bookingId: number): Observable<void> {
        const url = `${this.apirUrl}/${bookingId}`;

        return this.http.delete<void>(url);
    }
}
