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

    public hotels: Hotel[] = [];

    public viewingHotelId: number = 0;

    constructor(private http: HttpClient,
        private roomsService: RoomsService
    ) { }

    loadHotels(): void {
        this.getAllHotels().pipe(
            take(1),
        ).subscribe(
            (hotels) => {
                this.hotels = hotels;
            }
        )
    }

    getAllHotels(): Observable<Hotel[]> {
        const url = `${this.apiUrl}/GetAll`;
        return this.http.get<Hotel[]>(url);
    }

    getHotel(id: number): Observable<Hotel> {
        const url = `${this.apiUrl}/GetHotel/${id}`;
        return this.http.get<Hotel>(url);
    }

    getHotelByRoom(roomId: number): Observable<Hotel> {
        return this.roomsService.getRoom(roomId).pipe(
            take(1),
            switchMap((room: Room) => this.getHotel(room.hotelId))
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
