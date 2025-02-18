import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../models/rooms.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { BookingForm } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { MessageComponent } from '../../shared/message/message.component';

@Component({
    selector: 'app-detailed-room',
    imports: [CommonModule, FormsModule, LoadingSpinnerComponent, MessageComponent],
    templateUrl: './detailed-room.component.html',
    styleUrl: './detailed-room.component.scss'
})
export class DetailedRoomComponent implements OnInit {

    room: Room | undefined;
    bookingData: BookingForm = {
        roomID: 0,
        checkInDate: "",
        checkOutDate: "",
        customerName: "",
        customerId: "",
        customerPhone: ""
    }

    isLoaded: boolean = false;
    currImgIndex: number = 0;
    interval: any;

    alertMsg: string = "";
    alertMsgType!: "success" | "error";
    alertShown: boolean = false;

    constructor(
        private roomService: RoomsService,
        private bookingService: BookingService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.roomService.getRoom(params["id"]).subscribe(
                (room) => {
                    this.room = room;
                    this.isLoaded = true;
                    this.bookingData.roomID = room.id;
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
        if (form.valid) {
            this.bookingService.addBookedRoom(this.bookingData).subscribe(
                () => {
                    this.alertMsg = "You have successfully booked the room";
                    this.alertMsgType = "success";
                    console.log("booked");
                    this.alertShown = true;
                },
                (error) => {
                    this.alertMsg = error.error;
                    this.alertMsgType = "error";
                    this.alertShown = true;
                }
            );
        }
    }

    closeAlert() {
        this.alertShown = false;
    }

    getCurrDate(): string {
        let currDate = new Date();

        let year = currDate.getFullYear()
        let month = (currDate.getMonth() + 1) < 10 ? "0" + (currDate.getMonth() + 1) : currDate.getMonth() + 1;
        let day = currDate.getDate() < 10 ? "0" + currDate.getDate() : currDate.getDate();

        return `${year}-${month}-${day}`;
    }

    getCheckinMax(): string {
        if (this.bookingData.checkOutDate === "") {
            return "2027-01-01";
        }
        let checkOutDate = new Date(this.bookingData.checkOutDate);
        let previousDate = new Date(checkOutDate);
        previousDate.setDate(previousDate.getDate() - 1);

        let year = previousDate.getFullYear();
        let month = (previousDate.getMonth() + 1) < 10 ? "0" + (previousDate.getMonth() + 1) : previousDate.getMonth() + 1;
        let day = previousDate.getDate() < 10 ? "0" + previousDate.getDate() : previousDate.getDate();

        return `${year}-${month}-${day}`;
    }

    getCheckoutMin(): string {
        let checkInString = this.bookingData.checkInDate ? this.bookingData.checkInDate : this.getCurrDate();

        let checkInDate = new Date(checkInString);
        let nextDate = new Date(checkInDate);
        nextDate.setDate(checkInDate.getDate() + 1);

        let year = nextDate.getFullYear()
        let month = (nextDate.getMonth() + 1) < 10 ? "0" + (nextDate.getMonth() + 1) : nextDate.getMonth() + 1;
        let day = nextDate.getDate() < 10 ? "0" + nextDate.getDate() : nextDate.getDate();

        return `${year}-${month}-${day}`;
    }

    checkinValidity() {
        let minDateString = this.getCurrDate();
        let minDate = new Date(minDateString);

        let maxDateString = this.getCheckinMax();
        let maxDate = new Date(maxDateString);

        let enteredDate = new Date(this.bookingData.checkInDate);
        if (!isNaN(enteredDate.getTime())) {
            if (enteredDate < minDate) {
                this.bookingData.checkInDate = minDateString;
            } else if (enteredDate > maxDate) {
                this.bookingData.checkInDate = maxDateString;
            }
        }
    }

    checkoutValidity() {
        let minDateString = this.getCheckoutMin();
        let minDate = new Date(minDateString);

        let enteredDate = new Date(this.bookingData.checkOutDate);

        if (!isNaN(enteredDate.getTime())) {
            if (enteredDate < minDate) {
                this.bookingData.checkOutDate = minDateString;
            }
        }
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
