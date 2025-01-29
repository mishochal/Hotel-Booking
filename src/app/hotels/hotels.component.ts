import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../services/hotels.service';

@Component({
    selector: 'app-hotels',
    imports: [],
    templateUrl: './hotels.component.html',
    styleUrl: './hotels.component.scss'
})
export class HotelsComponent implements OnInit {

    constructor(private hotelsService: HotelsService) { }

    ngOnInit(): void {
        this.hotelsService.getAllHotels().subscribe(
            (hotels) => {
                console.log(hotels);
            }
        );
    }
}
