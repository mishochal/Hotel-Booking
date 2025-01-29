import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HotelsService {
    private apiUrl = "https://hotelbooking.stepprojects.ge/api/Hotels"

    constructor(private http: HttpClient) { }

    getAllHotels(): Observable<any> {
        const url = `${this.apiUrl}/GetAll`;
        console.log("asd")
        return this.http.get<any>(url);
    }
}
