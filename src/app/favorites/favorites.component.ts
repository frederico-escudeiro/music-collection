import { Component } from '@angular/core';
import { Song, Album } from 'src/shared/types.interface';
import { HttpService } from '../http/http.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favorites: (Album | Song)[];

  constructor(private httpService: HttpService) {
    this.favorites = this.httpService.getFavoritesData();
  }

}
