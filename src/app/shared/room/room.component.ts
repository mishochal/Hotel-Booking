import { Component, Input } from '@angular/core';
import { Room } from '../../models/rooms.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-room',
    imports: [CommonModule],
    templateUrl: './room.component.html',
    styleUrl: './room.component.scss'
})
export class RoomComponent {
    @Input() room!: Room;
}
