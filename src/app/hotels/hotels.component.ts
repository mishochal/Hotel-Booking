import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../services/hotels.service';
import { Hotel } from '../models/hotels.model';
import { HotelComponent } from './hotel/hotel.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hotels',
    imports: [CommonModule, HotelComponent],
    templateUrl: './hotels.component.html',
    styleUrl: './hotels.component.scss'
})
export class HotelsComponent implements OnInit {
    hotels: Hotel[] = [];
    fetchedHotels: Hotel[] = [];
    cities: string[] = [];
    selectedCity: number = 0;

    constructor(private hotelsService: HotelsService) { }

    ngOnInit(): void {
        this.getCities();
        this.getHotels();
    }

    getCities(): void {
        this.hotelsService.getAllCities().subscribe(
            (cities) => {
                this.cities = cities;
            }
        )
    }

    getHotels(): void {
        this.hotelsService.getAllHotels().subscribe(
            (hotels) => {
                this.hotels = hotels;
                this.fetchedHotels = hotels;
            }
        )
    }

    fillter(id: number, city: string): void {
        this.selectedCity = id;
        if (id === 0) {
            this.hotels = this.fetchedHotels;
        } else {
            // this.hotels = this.fetchedHotels.filter((hotel) => {
            //     return hotel.city === city;
            // })
            this.hotelsService.getHotelsByCity(city).subscribe(
                (hotels) => {
                    this.hotels = hotels;
                }
            )
        }
    }
}
