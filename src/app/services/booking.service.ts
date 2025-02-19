import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    addBookedRoom(bookingData: BookingForm): Observable<string> {
        const url = this.apirUrl;
        return this.http.post(url, bookingData, { responseType: "text" });
    }

    cancelBooking(bookingId: number): Observable<string> {
        const url = `${this.apirUrl}/${bookingId}`;

        return this.http.delete(url, { responseType: "text" });
    }
}
