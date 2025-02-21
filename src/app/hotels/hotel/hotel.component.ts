import { Component, Input } from '@angular/core';
import { Hotel } from '../../models/hotels.model';
import { HotelsService } from '../../services/hotels.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-hotel',
    imports: [],
    templateUrl: './hotel.component.html',
    styleUrl: './hotel.component.scss'
})
export class HotelComponent {
    @Input() hotel!: Hotel;

    constructor(
        private hotelsService: HotelsService,
        private router: Router
    ) { }

    viewRooms() {
        this.hotelsService.viewingHotelId = this.hotel.id;
        this.router.navigate(["/rooms"]);
    }
}
