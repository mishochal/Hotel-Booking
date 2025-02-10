import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, take } from 'rxjs';
import { Room } from '../models/rooms.model';
import { SharedFilter } from '../models/shared-filter.model';
import { RoomsFilter } from '../models/rooms-filter.model';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {

    private apiUrl = "https://hotelbooking.stepprojects.ge/api/Rooms";

    public rooms: Room[] = [];

    constructor(private http: HttpClient) { }

    loadRooms(): void {
        this.getAllRooms().pipe(
            take(1),
        ).subscribe(
            (rooms) => {
                this.rooms = rooms;
            }
        )
    }

    getAllRooms(): Observable<Room[]> {
        const url = `${this.apiUrl}/GetAll`;
        return this.http.get<Room[]>(url);
    }

    getRoom(id: number): Observable<Room> {
        const url = `${this.apiUrl}/GetRoom/${id}`;

        return this.http.get<Room>(url);
    }

    getFillters(): Observable<SharedFilter[]> {
        const url = `${this.apiUrl}/GetRoomTypes`;
        return this.http.get<SharedFilter[]>(url);
    }

    getFilteredRooms(filterData: RoomsFilter): Observable<Room[]> {
        const url = `${this.apiUrl}/GetFiltered`;

        let apiData: RoomsFilter = {
            priceFrom: filterData.priceFrom,
            priceTo: filterData.priceTo
        };
        if (filterData.checkIn !== "") {
            apiData.checkIn = filterData.checkIn;
        }
        if (filterData.checkOut !== "") {
            apiData.checkOut = filterData.checkOut;
        }
        if (filterData.maximumGuests != 0) {
            apiData.maximumGuests = filterData.maximumGuests;
        }
        if (filterData.roomTypeId != 0) {
            apiData.roomTypeId = filterData.roomTypeId;
        }

        return this.http.post<Room[]>(url, apiData);
    }
}
