import { Component } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/shared/global-constants.enum';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favorites: any[];
  readonly songTypeConstant: string = GlobalConstants.SONG_TYPE_STRING;

  constructor(private httpService: HttpService, private router: Router) {
    this.favorites = this.httpService.getFavoritesData();
  }

  onRemoveFavorite(item: any) {
    if (item.type === 'song') {
      this.router.navigate([
        '/'
        + GlobalConstants.MY_ALBUMS_STRING
        + '/'
        + item.albumTitle
        + '/'
        + item.songTitle
        + '/'
        + GlobalConstants.FAVORITE_STRING]) //Assume que na aba dos favorites tudo é favorito.
    } else {
      this.router.navigate([
        '/'
        + GlobalConstants.MY_ALBUMS_STRING
        + '/'
        + item.albumTitle
        + '/'
        + GlobalConstants.FAVORITE_STRING])
    }
  }
}
