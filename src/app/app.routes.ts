import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BookedRoomsComponent } from './booked-rooms/booked-rooms.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "hotels", component: HotelsComponent },
    { path: "rooms", component: RoomsComponent },
    { path: "booked-rooms", component: BookedRoomsComponent }
];
