import { Component } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favorites: any[];
  songFavorites:any[];
  albumFavorites:any[];

  constructor(private httpService: HttpService, private router: Router) {
    this.favorites = this.httpService.getFavoritesData.getValue();
    this.songFavorites = this.favorites.filter(fav => fav.song !== undefined);
    this.albumFavorites = this.favorites.filter(fav => fav.song === undefined);
  }

  onNavigateToFavorite(item: any) {
    this.router.navigate([
      '/'
      + GlobalConstants.MY_ALBUMS_STRING
      + '/'
      + item.album.title
      + (item.song !== undefined ? '/' + item.song.title : '')
      + '/'
      + GlobalConstants.FAVORITE_STRING])
  }
}
