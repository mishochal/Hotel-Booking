import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../services/hotels.service';
import { Hotel } from '../models/hotels.model';
import { HotelComponent } from './hotel/hotel.component';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../shared/filter/filter.component';
import { SharedFilter } from '../models/shared-filter.model';

@Component({
    selector: 'app-hotels',
    imports: [CommonModule, HotelComponent, FilterComponent],
    templateUrl: './hotels.component.html',
    styleUrl: './hotels.component.scss'
})
export class HotelsComponent implements OnInit {
    hotels: Hotel[] = [];
    fetchedHotels: Hotel[] = [];
    cities: SharedFilter[] = [];
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

    filter(filter: SharedFilter): void {
        if (filter.id === 0) {
            this.hotels = this.fetchedHotels;
        } else {
            this.hotelsService.getHotelsByCity(filter.name).subscribe(
                (hotels) => {
                    this.hotels = hotels;
                }
            )
        }
    }
}
