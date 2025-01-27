import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-favourite-rooms',
    imports: [CommonModule],
    templateUrl: './favourite-rooms.component.html',
    styleUrl: './favourite-rooms.component.scss'
})
export class FavouriteRoomsComponent {
    rooms: any[] = new Array(6);
}
