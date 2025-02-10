import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HotelsService } from './services/hotels.service';
import { RoomsService } from './services/rooms.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'hotel-booking';

    constructor(
        private hotelsService: HotelsService,
        private roomsService: RoomsService
    ) { }

    ngOnInit(): void {
        this.hotelsService.loadHotels();
        this.roomsService.loadRooms();
    }
}
