import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotels.model';

@Injectable({
    providedIn: 'root'
})
export class HotelsService {
    private apiUrl = "https://hotelbooking.stepprojects.ge/api/Hotels"

    constructor(private http: HttpClient) { }

    getAllHotels(): Observable<Hotel[]> {
        const url = `${this.apiUrl}/GetAll`;
        return this.http.get<Hotel[]>(url);
    }

    getAllCities(): Observable<string[]> {
        const url = `${this.apiUrl}/GetCities`;
        return this.http.get<string[]>(url);
    }

    getHotelsByCity(city: string): Observable<Hotel[]> {
        const url = `${this.apiUrl}/GetHotels`;

        let params = new HttpParams();
        params = params.append("city", city);

        return this.http.get<Hotel[]>(url, { params: params });
    }
}
