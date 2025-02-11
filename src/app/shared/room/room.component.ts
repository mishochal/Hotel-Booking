import { Component, Input } from '@angular/core';
import { Room } from '../../models/rooms.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-room',
    imports: [CommonModule],
    templateUrl: './room.component.html',
    styleUrl: './room.component.scss'
})
export class RoomComponent {
    @Input() room!: Room;

    constructor(private router: Router) { }

    loadRoomDetails(): void {
        this.router.navigate(["/rooms", this.room.id]);
    }
}
