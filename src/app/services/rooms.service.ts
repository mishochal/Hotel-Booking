import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/rooms.model';
import { Filter } from '../models/filter.model';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {

    private apiUrl = "https://hotelbooking.stepprojects.ge/api/Rooms";

    constructor(private http: HttpClient) { }

    getAllRooms(): Observable<Room[]> {
        const url = `${this.apiUrl}/GetAll`;
        return this.http.get<Room[]>(url);
    }

    getFillters(): Observable<Filter[]> {
        const url = `${this.apiUrl}/GetRoomTypes`;
        return this.http.get<Filter[]>(url);
    }
}
