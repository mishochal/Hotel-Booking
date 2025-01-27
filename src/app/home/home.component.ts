import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { FavouriteRoomsComponent } from './favourite-rooms/favourite-rooms.component';
import { UspComponent } from './usp/usp.component';

@Component({
    selector: 'app-home',
    imports: [HeroComponent, FavouriteRoomsComponent, UspComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
