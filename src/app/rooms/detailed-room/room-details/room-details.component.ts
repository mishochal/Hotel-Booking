import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-room-details',
    imports: [CommonModule],
    templateUrl: './room-details.component.html',
    styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent {

    roomFeatures: { feature: string; isAvailable: boolean }[] = [
        {
            feature: "Double Bed",
            isAvailable: true
        },
        {
            feature: "Free internet",
            isAvailable: true
        },
        {
            feature: "Breakfast included",
            isAvailable: true
        },
        {
            feature: "Private Balcony",
            isAvailable: true
        },
        {
            feature: "Jacuzzi",
            isAvailable: true
        },
        {
            feature: "Flat Screen TV",
            isAvailable: true
        }
    ]

}
