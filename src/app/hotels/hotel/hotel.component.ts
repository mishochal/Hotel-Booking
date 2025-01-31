import { Component, Input } from '@angular/core';
import { Hotel } from '../../models/hotels.model';

@Component({
    selector: 'app-hotel',
    imports: [],
    templateUrl: './hotel.component.html',
    styleUrl: './hotel.component.scss'
})
export class HotelComponent {
    @Input() hotel!: Hotel;


}
