import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../models/rooms.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-detailed-room',
    imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
    templateUrl: './detailed-room.component.html',
    styleUrl: './detailed-room.component.scss'
})
export class DetailedRoomComponent implements OnInit {
    room: Room | undefined;
    isLoaded: boolean = false;
    currImgIndex: number = 0;
    interval: any;

    constructor(
        private roomService: RoomsService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.roomService.getRoom(params["id"]).subscribe(
                (room) => {
                    this.room = room;
                    console.log(this.room)
                    this.isLoaded = true;
                    this.startSlider();
                }
            )
        })
    }

    startSlider() {
        this.interval = setInterval(() => {
            this.selectImage(this.currImgIndex + 1);
        }, 2500)
    }

    bookRoom(form: NgForm) {

    }

    selectImage(index: number) {
        if (index < 0) {
            index = this.room!.images.length - 1;
        }
        index = index % this.room!.images.length;

        clearInterval(this.interval);
        this.interval = null;

        this.startSlider();
        this.currImgIndex = index;
    }
}
