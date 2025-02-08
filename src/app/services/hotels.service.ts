import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators'
import { Hotel } from '../models/hotels.model';
import { SharedFilter } from '../models/shared-filter.model';
import { RoomsService } from './rooms.service';
import { Room } from '../models/rooms.model';

@Injectable({
    providedIn: 'root'
})
export class HotelsService {
    private apiUrl = "https://hotelbooking.stepprojects.ge/api/Hotels"

    constructor(private http: HttpClient,
        private roomsService: RoomsService
    ) { }

    getAllHotels(): Observable<Hotel[]> {
        const url = `${this.apiUrl}/GetAll`;
        return this.http.get<Hotel[]>(url);
    }

    getHotel(id: number): Observable<Hotel> {
        const url = `${this.apiUrl}/GetHotel/${id}`;
        return this.http.get<Hotel>(url);
    }

    getHotelByRoom(roomId: number): Observable<Hotel> {
        // let hotelId = 0;
        // this.roomsService.getRoom(roomId).pipe(
        //     take(1),
        //     switchMap(room: Room) => {

        //     }
        // ).subscribe(
        //     (room: Room) => {
        //         hotelId = room.hotelId;
        //         console.log(hotelId);
        //     }
        // )

        // return this.getHotel(hotelId);
        return this.roomsService.getRoom(roomId).pipe(
            take(1),
            switchMap((room: Room) => this.getHotel(room.hotelId)) // Ensures hotel is fetched only after room data arrives
        );
    }

    getAllCities(): Observable<SharedFilter[]> {
        const url = `${this.apiUrl}/GetCities`;
        return this.http.get<SharedFilter[]>(url);
    }

    getHotelsByCity(city: string): Observable<Hotel[]> {
        const url = `${this.apiUrl}/GetHotels`;

        let params = new HttpParams();
        params = params.append("city", city);

        return this.http.get<Hotel[]>(url, { params: params });
    }
}
